export default class Navbar {
    constructor() {
        this.scrollTimeouts = {
            show: null,
            hide: null
        };
        this.elements = {
            self: document.querySelector('#workPageNavbar'),
            navs: Array.from(document.querySelectorAll('#workPageNavbar > *'))
        };
        this.events();
    }   

    events() {
        window.addEventListener('scroll', () => {
            if (this.getScrollY() == 0) {
                this.clearHideTimeout();
                this.clearShowTimeout();
                this.show();
            }
        });
        this.elements.navs.forEach(el => {
            el.addEventListener('mouseover', () => this.clearHideTimeout());
            el.addEventListener('mouseout', () => {
                if (!this.scrollTimeouts.hide && this.getScrollY() !== 0) {
                    this.scrollTimeouts.hide = setTimeout(() => {
                        this.hide();
                        this.clearHideTimeout();
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
        });
    }

    hide() {
        this.elements.self.classList.remove('navbar--shown');
        this.elements.self.classList.add('navbar--hidden');
    }

    show() {
        this.elements.self.classList.remove('navbar--hidden');
        this.elements.self.classList.add('navbar--shown');
    }

    isShown() {
        return !this.elements.self.classList.contains('navbar--hidden');
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