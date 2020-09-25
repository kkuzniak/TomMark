import gsap from 'gsap';
import CustomEase from '../Plugins/CustomEase.min';
import Anim from '../anim';
import ContactController from '../Controllers/ContactController';

export default class ContactView {
    constructor() {
        gsap.registerPlugin(CustomEase);
        CustomEase.create('cubic-bezier', '0.16, 1, 0.3, 1');
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
        this.timelines = {
            loaderTl: (new Anim()).loaderTl(),
            submittedTl: this.submittedTl(),
            switchToLoaderTl: this.switchToLoaderTl()
        };
        this.addEvents();
    }

    addEvents() {
        this.elements.submitButton.addEventListener('click', () => {
            if (this.isEmailValidated(this.elements.fields.email.value) && this.isMessageValidated(this.elements.fields.message.value)) {
                this.timelines.switchToLoaderTl.play('start');
                this.timelines.loaderTl.play('start');
                (new ContactController()).sendEmail(this.elements.fields.email.value, this.elements.fields.message.value).then(res => {
                    if (res == 1) {
                        this.timelines.switchToLoaderTl.play('start');
                        this.timelines.submittedTl.play('start');
                        setTimeout(() => {
                            this.elements.fields.email.value = '';
                            this.elements.fields.message.value = '';
                        }, 3600);
                    } else {
                        console.log('There was a problem with sending your message');
                    }
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

    switchToLoaderTl() {
        const tl = new gsap.timeline();
        const elements = {
            loaderIcon: document.getElementById('submitLoaderIcon'),
            text: document.getElementById('submitText')
        };

        tl.addLabel('start')
            .to(elements.text, 0.8, {ease: 'cubic-bezier', opacity: 0}, 'start')
            .set(elements.text, {y: '300%', opacity: 1})
            .to(elements.loaderIcon, 0.5, {ease: 'cubic-bezier', opacity: 1}, 'start');
        tl.pause();
        return tl;
    }

    submittedTl() {
        const envelopeOpened = document.querySelector('.envelopeIconOpened');
        const envelopeOpenedFront = document.querySelector('.envelopeOpenedFrontIcon');
        const envelopeClosed = document.querySelector('.envelopeIconClosed');
        const sentBg = document.querySelector('.sentBg');
        const fields = [this.elements.fields.email, this.elements.fields.message];
        const submitButton = {
            self: document.getElementById('submitButton'),
            text: document.getElementById('submitText'),
            sentText: document.getElementById('submitSentText'),
            loaderIcon: document.getElementById('submitLoaderIcon'),
        }

        const tl = new gsap.timeline();
        tl.set(sentBg, {scaleX: 0, transformOrigin: 'center left', visibility: 'visible', opacity: 1});
        tl.addLabel('start')
            .set(submitButton.self, {pointerEvents: 'none'})
            .set(submitButton.text, {y: '300%'})
            .addLabel('slideFieldsUp')
            .to(fields[0], 0.4, {ease: 'cubic-bezier', y: '-200%', scale: 0.8, transformOrigin: 'top center'}, 'slideFieldsUp') // -160
            .to(fields[1], 0.4, {ease: 'cubic-bezier', y: '-60%', scale: 0.8, transformOrigin: 'top center'}, 'slideFieldsUp') // -210
            .to(envelopeOpened, 0.6, {ease: 'cubic-bezier', visibility: 'visible', opacity: 1}, 'slideFieldsUp+=0.9')
            .to(envelopeOpenedFront, 0.6, {ease: 'cubic-bezier', visibility: 'visible', opacity: 1}, 'slideFieldsUp+=0.9')
            .addLabel('slideFieldsDown')
            .set(envelopeClosed, {ease: 'cubic-bezier', visibility: 'visible', opacity: 1})
            .to(fields[0], 0.6, {ease: 'cubic-bezier', y: '130%'}, 'slideFieldsDown') // 120
            .to(fields[1], 0.6, {ease: 'cubic-bezier', y: '20%'}, 'slideFieldsDown') // 70
            .addLabel('closeEnvelope')
            .to(fields, 0.4, {ease: 'cubic-bezier', opacity: 0}, 'closeEnvelope')
            .to(envelopeOpened, 0.5, {ease: 'cubic-bezier', opacity: 0}, 'closeEnvelope+=0.2')
            .to(envelopeOpenedFront, 0.5, {ease: 'cubic-bezier', opacity: 0}, 'closeEnvelope+=0.2')
            .to(envelopeClosed, 0.6, {ease: 'cubic-bezier', scale: 0.3, transformOrigin: 'center center', rotate: 15})
            .set(fields, {y: 0, scale: 1})
            .addLabel('sendMessage')    
            .to(envelopeClosed, 0.6, {ease: 'cubic-bezier', x: '120%', opacity: 0, visibility: 0}, 'sendMessage')
            .to(sentBg, 0.8, {ease: 'cubic-bezier', scaleX: 1}, 'sendMessage')
            .to(submitButton.loaderIcon, 0.8, {ease: 'cubic-bezier', opacity: 0}, 'sendMessage-=0.2')
            .to(submitButton.sentText, 0.5, {ease: 'cubic-bezier', y: 0}, 'sendMessage+=0.2')
            .to(fields, 0.6, {opacity: 1}, 'sendMessage+=0.2')
            .addLabel('end')
            .to(sentBg, 0.8, {ease: 'cubic-bezier', scaleX: 0, transformOrigin: 'center right'}, 'end+=0.5')
            .to(submitButton.sentText, 0.5, {ease: 'cubic-bezier', opacity: 0}, 'end+=0.4')
            .to(submitButton.text, 0.8, {ease: 'cubic-bezier', y: 0}, 'end+=0.4')
            .set(submitButton.self, {pointerEvents: ''});
        tl.pause();
        return tl;
    }
}