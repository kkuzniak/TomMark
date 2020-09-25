import gsap, {Power1, Power3} from 'gsap';

export default class Anim {
    constructor() {}

    loaderTl() {
        const tl = new gsap.timeline({repeat: -1});
        const rectangles = document.querySelectorAll('.loaderIcon .rect');
        tl.addLabel('start')
            .to(rectangles[0], 0.4, {ease: Power3.easeOut, rotation: 180, transformOrigin: 'right top'})
            .to(rectangles[0], 0.4, {ease: Power3.easeOut, rotation: 270, transformOrigin: 'left top'})
            .to(rectangles[0], 0.4, {ease: Power3.easeOut,rotation: 360, transformOrigin: 'left bottom'})
            .to(rectangles[0], 0.4, {ease: Power3.easeOut, rotation: 540, transformOrigin: 'right bottom'})
            .addLabel('slideLeft')
            .to(rectangles[0], 0.3, {ease: Power1.easeOut, x: -11}, 'slideLeft-=0.3')
            .to(rectangles[1], 0.3, {ease: Power1.easeOut, x: 0}, 'slideLeft-=0.3')
            .to(rectangles[2], 0.3, {ease: Power1.easeOut, x: 11}, 'slideLeft-=0.3')
            .to(rectangles[3], 0.3, {ease: Power1.easeOut, x: 22}, 'slideLeft-=0.3')
            .to(rectangles[1], 0.4, {ease: Power3.easeOut, rotation: 180, transformOrigin: 'right top'})
            .to(rectangles[1], 0.4, {ease: Power3.easeOut, rotation: 270, transformOrigin: 'left top'})
            .to(rectangles[1], 0.4, {ease: Power3.easeOut,rotation: 360, transformOrigin: 'left bottom'})
            .to(rectangles[1], 0.4, {ease: Power3.easeOut, rotation: 540, transformOrigin: 'right bottom'})
            .addLabel('slideLeft')
            .to(rectangles[0], 0.3, {ease: Power1.easeOut, x: -22}, 'slideLeft-=0.3')
            .to(rectangles[1], 0.3, {ease: Power1.easeOut, x: -11}, 'slideLeft-=0.3')
            .to(rectangles[2], 0.3, {ease: Power1.easeOut, x: 0}, 'slideLeft-=0.3')
            .to(rectangles[3], 0.3, {ease: Power1.easeOut, x: 11}, 'slideLeft-=0.3')
            .to(rectangles[2], 0.4, {ease: Power3.easeOut, rotation: 180, transformOrigin: 'right top'})
            .to(rectangles[2], 0.4, {ease: Power3.easeOut, rotation: 270, transformOrigin: 'left top'})
            .to(rectangles[2], 0.4, {ease: Power3.easeOut,rotation: 360, transformOrigin: 'left bottom'})
            .to(rectangles[2], 0.4, {ease: Power3.easeOut, rotation: 540, transformOrigin: 'right bottom'})
            .addLabel('slideLeft')
            .to(rectangles[0], 0.3, {ease: Power1.easeOut, x: -33}, 'slideLeft-=0.3')
            .to(rectangles[1], 0.3, {ease: Power1.easeOut, x: -22}, 'slideLeft-=0.3')
            .to(rectangles[2], 0.3, {ease: Power1.easeOut, x: -11}, 'slideLeft-=0.3')
            .to(rectangles[3], 0.3, {ease: Power1.easeOut, x: 0}, 'slideLeft-=0.3')
            .to(rectangles[3], 0.4, {ease: Power3.easeOut, rotation: 180, transformOrigin: 'right top'})
            .to(rectangles[3], 0.4, {ease: Power3.easeOut, rotation: 270, transformOrigin: 'left top'})
            .to(rectangles[3], 0.4, {ease: Power3.easeOut,rotation: 360, transformOrigin: 'left bottom'})
            .to(rectangles[3], 0.4, {ease: Power3.easeOut, rotation: 540, transformOrigin: 'right bottom'})
            .addLabel('slideLeft')
            .to(rectangles[0], 0.3, {ease: Power1.easeOut, x: -44}, 'slideLeft-=0.3')
            .to(rectangles[1], 0.3, {ease: Power1.easeOut, x: -33}, 'slideLeft-=0.3')
            .to(rectangles[2], 0.3, {ease: Power1.easeOut, x: -22}, 'slideLeft-=0.3')
            .to(rectangles[3], 0.3, {ease: Power1.easeOut, x: -11}, 'slideLeft-=0.3');
        tl.pause();
        return tl;
    }
}