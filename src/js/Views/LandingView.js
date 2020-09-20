export default class LandingView {
    constructor() {
        this.drag = {
            isDraggin: false,
            startPoint: 0,
            currentPoint: 0
        }
        this.elements = {
            nextButton: document.querySelector('#showNextWorkButton'),
            prevButton: document.querySelector('#showPrevWorkButton'),
            nav: document.querySelector('.nav'),
            socials: document.querySelector('.noSocials')
        };
        this.events();
    }

    events() {
        [this.elements.prevButton, this.elements.nextButton].forEach(el => el ? el.addEventListener('mousedown', e => {
            this.drag.startPoint = e.clientX;
            this.elements.nav.style.transition = 'none';
        }) : '');

        if (this.elements.prevButton) {
            this.elements.prevButton.addEventListener('mousemove', e => {
                if (e.clientX > this.drag.startPoint) {
                    this.drag.currentPoint = e.clientX;
                    if (this.drag.startPoint != 0) {
                        let distance = this.drag.currentPoint - this.drag.startPoint;
                        this.elements.prevButton.style.flex = (0.0004 * distance) + 0.18;
                        this.toggleContentOnDrag(distance);
                        if (distance > this.elements.prevButton.offsetWidth * 0.58) {
                            window.open(`${this.elements.prevButton.dataset.prevUrl}`, '_self');
                        }
                    }
                }
            }); 
        }

        if (this.elements.nextButton) {
            this.elements.nextButton.addEventListener('mousemove', e => {
                if (e.clientX < this.drag.startPoint) {
                    this.drag.currentPoint = e.clientX; 
                    if (this.drag.startPoint != 0) {
                        let distance = this.drag.startPoint - this.drag.currentPoint;
                        this.elements.nextButton.style.flex = (0.0004 * distance) + 0.18;
                        this.toggleContentOnDrag(distance);
                        if (distance > this.elements.nextButton.offsetWidth * 0.58) {
                            window.open(`${this.elements.nextButton.dataset.nextUrl}`, '_self');
                        }
                    }
                }
            }); 
            this.elements.nextButton.addEventListener('mouseleave', () => this.cancelDraggin());
        }

        document.addEventListener('mouseup', () => {
            this.cancelDraggin();
        });
    }

    toggleContentOnDrag(distance) {
        this.elements.nav.style.opacity = -(0.0035 * distance) + 1;
    }
    
    cancelDraggin() {
        this.drag.startPoint = 0;
        this.drag.isDraggin = false;
        this.elements.nav.style.transition = '';
        this.elements.nav.style.opacity = '1';
        [this.elements.prevButton, this.elements.nextButton].forEach(el => el ? el.style.flex = '' : '');
        [this.elements.prevButton, this.elements.nextButton].forEach(el => el ? el.style.transition = 'flex 300ms ease' : '');
        setTimeout(() => [this.elements.prevButton, this.elements.nextButton].forEach(el => el ? el.style.transition = '' : ''), 300);
    }
}