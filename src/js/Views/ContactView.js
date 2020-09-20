import gsap, {Power1, Power3, Expo} from 'gsap';
import ContactController from '../Controllers/ContactController';

export default class ContactView {
    constructor() {
        this.timelines = {
            loaderTl: undefined,
            submittedTl: undefined
        };
        this.elements = {
            fields: {
                email: document.getElementById('emailField'),
                message: document.getElementById('messageField')
            },
            containers: {
                email: document.querySelector('.contactContainer__emailField'),
                message: document.querySelector('.contactContainer__messageField')
            },
            submitButton: document.getElementById('submitButton')
        };
        this.elements.fields.email.value = 'kacperkuzniak@gmail.com';
        this.elements.fields.message.value = 'Wiadomość testowa';
        this.setupTimelines();
        this.addEvents();
    }

    addEvents() {
        this.elements.submitButton.addEventListener('click', () => {
            if (this.isEmailValidated(this.elements.fields.email.value) && this.isMessageValidated(this.elements.fields.message.value)) {
                this.setButtonType('loader');
                (new ContactController()).sendEmail(this.elements.fields.email.value, this.elements.fields.message.value).then(res => {
                    console.log(res);
                });
            } else {
                !this.isEmailValidated(this.elements.fields.email.value) ? this.showEmailFail() : '';
                !this.isMessageValidated(this.elements.fields.message.value) ? this.showMessageFail() : '';
            }
        });
        this.elements.fields.email.addEventListener('input', () => this.hideEmailFail());
        this.elements.fields.message.addEventListener('input', () => this.hideMessageFail());
    }

    isEmailValidated(inputText) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputText);
    }

    showEmailFail() {
        this.elements.containers.email.classList.remove('field--default');
        this.elements.containers.email.classList.add('field--wrong');
    }

    hideEmailFail() {
        this.elements.containers.email.classList.remove('field--wrong');
        this.elements.containers.email.classList.add('field--default');
    }

    isMessageValidated(inputText) {
        return inputText !== '';
    }

    showMessageFail() {
        this.elements.containers.message.classList.remove('field--default');
        this.elements.containers.message.classList.add('field--wrong');
    }

    hideMessageFail() {
        this.elements.containers.message.classList.remove('field--wrong');
        this.elements.containers.message.classList.add('field--default');
    }

    setButtonType(type = 'default') {
        if (type == 'loader') {
            this.elements.submitButton.classList.remove(`contactContainer__submitButton--default`);
            this.elements.submitButton.classList.add(`contactContainer__submitButton--loader`);
            this.timelines.loaderTl.play('start');
        } else {

        }
    }

    setupTimelines() {
        this.timelines.loaderTl = new gsap.timeline({repeat: -1});
        const rectangles = document.querySelectorAll('.loaderIcon .rect');
        this.timelines.loaderTl.addLabel('start')
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
        // this.timelines.loaderTl.pause();
        const envelopeOpened = document.querySelector('.envelopeIconOpened');
        const front = document.querySelector('.envelopeIconOpened__front');
        const envelopeClosed = document.querySelector('.envelopeIconClosed');
        const sentBg = document.querySelector('.sentBg');
        const fields = [this.elements.fields.email, this.elements.fields.message];
        const submitButton = {
            loader: document.querySelector('.contactContainer__submitButton .loaderIcon')
        }
        this.timelines.submittedTl = new gsap.timeline();
        this.timelines.submittedTl.set(sentBg, {scaleX: 0, transformOrigin: 'center left'});
        this.timelines.submittedTl.addLabel('start')
            .set(this.elements.submitButton, {pointerEvents: 'none'})
            .addLabel('slideFieldsUp')
            .to(fields[0], 0.6, {ease: Expo.easeOut, y: -160, scale: 0.8, transformOrigin: 'top center'}, 'slideFieldsUp')
            .to(fields[1], 0.6, {ease: Expo.easeOut, y: -210, scale: 0.8, transformOrigin: 'top center'}, 'slideFieldsUp')
            .addLabel('showPaper')
            .to(envelopeOpened, 0.6, {ease: Expo.easeOut, visibility: 'visible', opacity: 1}, 'showPaper')
            .to(envelopeClosed, 0.6, {ease: Expo.easeOut, visibility: 'visible', opacity: 1}, 'showPaper')
            .addLabel('slideFieldsDown')
            .to(fields[0], 0.6, {ease: Expo.easeOut, y: -100, opacity: 0}, 'slideFieldsDown')
            .to(fields[1], 0.6, {ease: Expo.easeOut, y: -150, opacity: 0}, 'slideFieldsDown')
            .to(envelopeOpened, 0.2, {ease: Expo.easeOut, visibility: 'hidden', opacity: 0})
            .to(envelopeClosed, 0.6, {ease: Expo.easeOut, scale: 0.5, transformOrigin: 'center center', rotate: 30, x: '-50px'})
            .addLabel('sendMessage')    
            .to(envelopeClosed, 0.8, {ease: Expo.easeOut, x: '150%', opacity: 0, visibility: 0}, 'sendMessage')
            .to(sentBg, 0.8, {ease: Expo.easeOut, scaleX: 1}, 'sendMessage')
            .set(fields, {y: 0, scale: 1})
            .to(fields, 0.6, {ease: Expo.easeOut, y: 0, opacity: 1});
    }
}