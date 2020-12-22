import gsap, {Power3} from 'gsap';

export default class MainNav {
    constructor(params = {withScrollEvents: false, withFixedBtn: false}) {
        this.scrollTimeouts = {
            show: null,
            hide: null
        };
        this.sideMenuShown = false;
        this.withFixedBtn = params.withFixedBtn;
        this.elements = {
            logo: document.querySelector('.mainNav__logo'),
            btn: document.querySelector('.mainNav__btn'),
            menu: document.getElementById('mainNavMenu'),
            sideMenu: {
                container: document.querySelector('#sideMenuContainer'),
                items: document.querySelectorAll('#sideMenuItems')
            },
            self: document.querySelector('.mainNav'),
            navs: Array.from(document.querySelectorAll('.mainNav > *'))
        };
        if (params.withScrollEvents) {
            this.scrollEvents();
        }
        this.anims = {
            btn: {
                toClose: this.btnToCloseTl(),
                toOpen: this.btnToOpenTl()
            },
            nav: {
                open: this.openNavTl(),
                close: this.closeNavTl()
            }
        };
        this.events();
    }

    setButtonState(state = {clickable: true}) {
        state.clickable ? this.elements.btn.classList.remove('mainNav__btn--unclickable') : 
                this.elements.btn.classList.add('mainNav__btn--unclickable');
    }   
    
    events() {
        this.elements.btn.addEventListener('touchstart', () => {
            this.sideMenuShown = !this.sideMenuShown;
            this.update();
        });
        this.elements.btn.addEventListener('mouseenter', () => {
            if (!this.sideMenuShown) {
                this.sideMenuShown = true;
                this.update();
                this.setButtonState({clickable: false});
            }
        });
        this.elements.sideMenu.container.addEventListener('mouseleave', () => {
            if (this.sideMenuShown) {
                this.sideMenuShown = false;
                this.update();
            }
        });
    }

    scrollEvents() {
        window.addEventListener('scroll', () => {
            if (this.getScrollY() == 0) {
                this.clearHideTimeout();
                this.clearShowTimeout();
                this.show();
            } else if (this.sideMenuShown) {
                this.sideMenuShown = false;
                this.update();
            }
        });
        this.elements.navs.forEach(el => {
            el.addEventListener('mouseover', () => this.clearHideTimeout());
            el.addEventListener('mouseout', () => {
                if (!this.scrollTimeouts.hide && this.getScrollY() !== 0) {
                    this.scrollTimeouts.hide = setTimeout(() => {
                        this.hide();
                        this.clearHideTimeout();
                        if (this.sideMenuShown) {
                            this.sideMenuShown = false;
                            this.update();
                        }
                    }, 1200);
                }
            });
        });
        this.scrollStop(() => {
            if (this.isShown()) {
                if (this.getScrollY() !== 0) {
                    this.scrollTimeouts.hide = setTimeout(() => {
                        this.hide();
                        this.clearHideTimeout();
                        if (this.sideMenuShown) {
                            this.sideMenuShown = false;
                            this.update();
                        }
                    }, 1200);
                }
            } else if (this.scrollTimeouts.show) {
                this.clearShowTimeout();
            }
        });
        this.scrollUp(() => {
            !this.scrollTimeouts.show ?
                this.scrollTimeouts.show = setTimeout(() => {
                    this.show();
                    this.clearShowTimeout();
                }, 800) : '';
            this.scrollTimeouts.hide ? this.clearHideTimeout() : '';
        });
        this.scrollDown(() => {
            this.clearShowTimeout();
            this.clearHideTimeout();
            this.hide();
            if (this.sideMenuShown) {
                this.sideMenuShown = false;
                this.update();
            }
        });
    }

    update() {
        if (this.sideMenuShown) {
            this.anims.btn.toOpen.pause();
            this.anims.btn.toClose.play('start');
            this.anims.nav.close.pause();
            this.anims.nav.open.play('start');
            if (this.withFixedBtn) {
                this.elements.btn.classList.remove('mainNav__btn--default');
                this.elements.btn.classList.add('mainNav__btn--fixed');
            }
        } else {
            this.anims.btn.toClose.pause();
            this.anims.btn.toOpen.play('start');
            this.anims.nav.open.pause();
            this.anims.nav.close.play('start');
            if (this.withFixedBtn) {
                this.elements.btn.classList.remove('mainNav__btn--fixed');
                this.elements.btn.classList.add('mainNav__btn--default');
            }
            this.setButtonState({clickable: true});
        }
    }

    btnToCloseTl() {
        const lines = document.querySelectorAll('.mainNav__btn svg path');
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .addLabel('first')
            .set(lines, {transformOrigin: 'center center'})
            .to(lines[0], 0.4, {ease: Power3.easeOut, y: '12px'}, 'first')
            .to(lines[2], 0.4, {ease: Power3.easeOut, y: '-12px'}, 'first')
            .to(lines, 0.4, {fill: 'black'}, 'first')
            .addLabel('sec')
            .to(lines[1], 0, {opacity: 0}, 'sec')
            .to(lines[0], 0.4, {ease: Power3.easeOut, rotate: 45}, 'sec')
            .to(lines[2], 0.4, {ease: Power3.easeOut, rotate: -45}, 'sec');
        tl.pause();
        return tl;
    }

    btnToOpenTl() {
        const lines = document.querySelectorAll('.mainNav__btn svg path');
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .addLabel('first')
            .set(lines, {transformOrigin: 'center center'})
            .to(lines[0], 0.35, {ease: Power3.easeOut, rotate: 0}, 'first')
            .to(lines[2], 0.35, {ease: Power3.easeOut, rotate: 0}, 'first')
            .addLabel('sec')
            .to(lines[1], 0, {opacity: 1}, 'sec')
            .to(lines[0], 0.35, {ease: Power3.easeOut, y: 0}, 'sec')
            .to(lines[2], 0.35, {ease: Power3.easeOut, y: 0}, 'sec')
            .to(lines, 0.4, {fill: ''}, 'sec');
        tl.pause();
        return tl;
    }

    openNavTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .addLabel('first')
            .set(this.elements.sideMenu.items, {opacity: 0})
            .to(this.elements.sideMenu.container, 0.35, {ease: Power3.easeOut, scaleX: 1}, 'first')
            .to(this.elements.sideMenu.items, 0.35, {ease: Power3.easeOut, opacity: 1});
        tl.pause();
        return tl;    
    }

    closeNavTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .addLabel('first')
            .to(this.elements.sideMenu.items, 0.35, {ease: Power3.easeOut, opacity: 0}, 'first')
            .to(this.elements.sideMenu.container, 0.35, {ease: Power3.easeOut, scaleX: 0});
        tl.pause();
        return tl;    
    }

    hide() {
        this.elements.self.classList.remove('mainNav--shown');
        this.elements.self.classList.add('mainNav--hidden');
    }

    show() {
        this.elements.self.classList.remove('mainNav--hidden');
        this.elements.self.classList.add('mainNav--shown');
    }

    isShown() {
        return !this.elements.self.classList.contains('mainNav--hidden');
    }

    getScrollY() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    scrollUp(callback) {
        if (!callback || typeof callback !== 'function') return;
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            let stPos = window.pageYOffset || document.documentElement.scrollTop;

            if (stPos < lastScrollTop) {
                callback();
            } 
            lastScrollTop = stPos <= 0 ? 0 : stPos;
        });
    }

    clearShowTimeout() {
        clearTimeout(this.scrollTimeouts.show);
        this.scrollTimeouts.show = null;
    }

    clearHideTimeout() {
        clearTimeout(this.scrollTimeouts.hide);
        this.scrollTimeouts.hide = null;
    }

    scrollDown(callback) {
        if (!callback || typeof callback !== 'function') return;
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            let stPos = window.pageYOffset || document.documentElement.scrollTop;

            if (stPos > lastScrollTop) {
                callback();
            } 
            lastScrollTop = stPos <= 0 ? 0 : stPos;
        });
    }

    scrollStop(callback) {
        if (!callback || typeof callback !== 'function') return;
        let isScrolling;
    
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => callback(), 66);
        }, false);
    }
}