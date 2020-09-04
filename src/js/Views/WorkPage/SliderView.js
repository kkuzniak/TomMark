export default class SliderView {
    constructor() {
        this.elements = {
            _self: document.querySelector('#dragSlider'),
            sliderInput: document.querySelector('#sliderInput')
        }
        this.events();
    }

    events() {
        this.elements.sliderInput.addEventListener('mousedown', () => {
            if (this.elements._self.classList.contains('dragSlider--firstColor')) {
                this.elements._self.classList.add('dragSlider--firstColor--ready');
            } else {
                this.elements._self.classList.add('dragSlider--secondColor--ready');
            }
        });
        this.elements.sliderInput.addEventListener('mouseup', () => {
            if (this.elements._self.classList.contains('dragSlider--firstColor')) {
                this.elements._self.classList.remove('dragSlider--firstColor--ready');
            } else {
                this.elements._self.classList.remove('dragSlider--secondColor--ready');
            }
            this.elements.sliderInput.value >= 50 ? this.elements.sliderInput.value = 100 : this.elements.sliderInput.value = 0;
        });
        this.elements.sliderInput.addEventListener('input', () => {
            if (this.elements.sliderInput.value >= 50) {
                this.elements._self.classList.remove('dragSlider--firstColor');
                this.elements._self.classList.remove('dragSlider--firstColor--ready');
                this.elements._self.classList.add('dragSlider--secondColor');
            } else {
                this.elements._self.classList.remove('dragSlider--secondColor');
                this.elements._self.classList.remove('dragSlider--secondColor--ready');
                this.elements._self.classList.add('dragSlider--firstColor');
            }
        }); 
    }
}