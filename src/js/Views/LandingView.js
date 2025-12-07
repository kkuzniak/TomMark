import gsap, {Power3} from 'gsap';
import MainNav from './MainNavView';

export default class LandingView {
    constructor() {
        this.elements = {
            videoContainer: document.querySelector('.videoContainer'),
            videoWrapper: document.querySelector('#videoWrapper'),
            teaserVideo: document.querySelector('#teaser-video'),
            skipBtn: document.querySelector('.videoContainer__skipBtn'),
            fullVideo: document.querySelector('#full-video'),
            fullVideoWrapper: document.querySelector('#fVideoWrapper'),
            pointer: {
                line: document.querySelector('#pointerLine'),
                text: document.querySelector('#pointerText')
            },
            mainNav: new MainNav()
        };
        this.anim = {
            showFullVideoTl: this.showFullVideoTl(),
            pointerTl: this.pointerTl()
        };
        this.events();
        this.setup();
    }

    events() {
        this.elements.teaserVideo.addEventListener('click', () => {
            this.anim.pointerTl.pause();
            this.anim.showFullVideoTl.play('start');
        });
        document.addEventListener('resize', () => {
            this.elements.videoContainer.style.transform = `scale(${this.getTargetScale()})`;
        });
    }

    setup() {
        this.anim.pointerTl.play('start');
    }

    pointerTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .set(this.elements.pointer.text, {opacity: 0, y: '8px'})
            .set(this.elements.pointer.line, {transformOrigin: 'right center'})
            .fromTo(this.elements.pointer.line, {scaleX: 0}, {ease: Power3.easeOut, scaleX: 1, duration: 0.7}, 'start+=0.3')
            .to(this.elements.pointer.text, {ease: Power3.easeOut, opacity: 1, y: '0', duration: 0.4}, 'start+=0.8');
        tl.pause();
        return tl;
    }

    showFullVideoTl() {
        const tl = new gsap.timeline();
        const scale = 4;
        tl.addLabel('start')
            .set([this.elements.teaserVideo, this.elements.mainNav.elements.logo, this.elements.mainNav.elements.btn], {pointerEvents: 'none'})
            .addLabel('menuHiding')
            .to(this.elements.pointer.text, 0.2, {ease: Power3.easeOut, opacity: 0, y: '8px'}, 'menuHiding')
            .fromTo(this.elements.pointer.line, 0.6, {scaleX: 1}, {ease: Power3.easeOut, scaleX: 0})
            .to([this.elements.mainNav.elements.logo, this.elements.mainNav.elements.btn], 1.2, {ease: Power3.easeOut, opacity: 0}, 'menuHiding')
            .to(this.elements.videoContainer, 0.6, {ease: 'ease', scale: scale}, 'menuHiding+=0.8')
            .to([this.elements.fullVideoWrapper, this.elements.teaserVideo], 0.55, {ease: 'ease', scale: (1 / scale) + 0.005}, 'menuHiding+=0.8')
            .to(this.elements.teaserVideo, 0.55, {ease: 'ease', opacity: 0}, 'menuHiding+=0.8')
            .addLabel('playVideo')
            .add(() => this.elements.fullVideo.play())
            .to(this.elements.skipBtn, 0.4, {ease: Power3.easeOut, y: 0}, 'playVideo+=0.4');
        tl.pause();
        return tl;
    }
}