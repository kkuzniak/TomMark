import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import Work from '../Models/Work';
import WorkController from '../Controllers/WorkController';
import Animation from '../animation';

export default class WorkView {
    constructor() {
        gsap.registerPlugin(CustomEase);
        CustomEase.create('cubic-bezier', '0.22, 1, 0.36, 1');
        this.elements = {
            mainContainer: document.getElementById('mainContainer'),
            projNumber: document.getElementById('projNumber'),
            projIndex: document.getElementById('projIndex'),
            imageWrapper: document.getElementById('imageWrapper'),
            image: document.getElementById('image'),
            nav: document.querySelector('.nav'),
            socials: document.querySelector('.noSocials'),
            dragInput: document.getElementById('dragInput'),
            mainTitles: {
                container: document.querySelector('.content__menuSection__mainHeader'),
                first: document.getElementById('mainTitleFirst'),
                second: document.getElementById('mainTitleSec'),
            },
            subTitles: {
                first: document.getElementById('firstSubtitle'),
                second: document.getElementById('secSubtitle'),
            },
            showPreviewButton: document.getElementById('showPreview')
        };
        this.timelines = {
            starterTl: this.starterTl(),
            readyTl: this.readyTl(),
            defaultTl: this.defaultTl(),
        };
        this.workController = new WorkController();
        this.events();
        const loader = document.querySelector('.pageLoader');
        const loaderTl = (new Animation()).loaderTl();
        loaderTl.play('start');
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.remove('pageLoader--shown');
                loader.classList.add('pageLoader--hidden');
            }, 1000);
        });
    }

    events() {
        ['mousedown', 'touchstart'].forEach(event => {
            this.elements.dragInput.addEventListener(event, () => {
                this.timelines.starterTl.pause();
                this.timelines.defaultTl.pause();
                this.timelines.readyTl.play('start');
            });
        });
        ['mouseup', 'touchend'].forEach(event => {
            this.elements.dragInput.addEventListener(event, () => {
                const links = JSON.parse(this.elements.dragInput.dataset.workUrl);
                const currentLink = links[this.elements.dragInput.value];

                if (currentLink == 'self') {
                    this.timelines.readyTl.pause();
                    this.timelines.defaultTl.play('start');
                } else {
                    this.workController.getNextWork(currentLink).then(body => {
                        const parser = new DOMParser();
                        const parsedBody = parser.parseFromString(body, 'text/html');
                        const nextWork = this.workController.parseNextWork(parsedBody);

                        history.pushState(JSON.stringify(nextWork), null, currentLink);
                        this.update(nextWork);
                        this.timelines.readyTl.pause();
                        this.timelines.starterTl.play('start');
                    });
                }
            });
        });
        window.addEventListener('popstate', e => {
            const work = JSON.parse(e.state);
          
            if (work == null) {
                const defaultWork = new Work();
                defaultWork.setupDefaultWork();
                this.update(defaultWork);
            } else {
                this.update(work);
                this.timelines.readyTl.pause();
                this.timelines.starterTl.play('start');
            }
        });
    }

    starterTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .fromTo(this.elements.image, 1.6, {scaleY: 1.176, opacity: 0}, {ease: 'cubic-bezier', scaleY: 1, opacity: 1}, 'start')
            .fromTo(this.elements.imageWrapper, 1.6, {scaleY: 0.85}, {ease: 'cubic-bezier', scaleY: 1}, 'start')
            .fromTo([this.elements.socials, this.elements.nav, this.elements.projIndex], 1.6, {opacity: 0}, {ease: 'cubic-bezier', opacity: 1}, 'start')
            .fromTo(this.elements.mainTitles.first, 1.6, {x: -200, opacity: 0}, {ease: 'cubic-bezier', x: -35, opacity: 1}, 'start')
            .fromTo(this.elements.mainTitles.second, 1.6, {x: 200, opacity: 0}, {ease: 'cubic-bezier', x: 35, opacity: 1}, 'start')
            .fromTo(this.elements.subTitles.first, 1.6, {opacity: 0}, {opacity: 1}, 'start+=0.2')
            .fromTo(this.elements.subTitles.second, 1.6, {opacity: 0}, {opacity: 1}, 'start+=0.7')
            .fromTo(this.elements.projNumber, 1.6, {y: 100, opacity: 0}, {ease: 'cubic-bezier', y: 0, opacity: 1}, 'start');
        return tl;
    }

    defaultTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .to(this.elements.image, 1.2, {ease: 'cubic-bezier', scaleY: 1}, 'start')
            .to(this.elements.imageWrapper, 1.2, {ease: 'cubic-bezier', scaleY: 1}, 'start')
            .to(this.elements.projNumber, 1.2, {ease: 'cubic-bezier', y: 0, opacity: 1}, 'start')
            .to(this.elements.mainTitles.first, 1.2, {ease: 'cubic-bezier', x: -35, opacity: 1}, 'start')
            .to(this.elements.mainTitles.second, 1.2, {ease: 'cubic-bezier', x: 35, opacity: 1}, 'start')
            .to('.fadingElement', 0.3, {opacity: 1}, 'start');
        return tl.pause();
    }

    readyTl() {
        const tl = new gsap.timeline();
        tl.addLabel('start')
            .to(this.elements.image, 1.2, {ease: 'cubic-bezier', scaleY: 1.176}, 'start')
            .to(this.elements.imageWrapper, 1.2, {ease: 'cubic-bezier', scaleY: 0.85}, 'start')
            .to(this.elements.projNumber, 1.2, {ease: 'cubic-bezier', y: 100, opacity: 0}, 'start')
            .to(this.elements.mainTitles.first, 0.8, {ease: 'cubic-bezier', x: -200, opacity: 0}, 'start')
            .to(this.elements.mainTitles.second, 0.8, {ease: 'cubic-bezier', x: 200, opacity: 0}, 'start')
            .to('.fadingElement', 0.3, {opacity: 0}, 'start');
        tl.pause();
        return tl;
    }

    update(work) {
        const currentPosClass = this.elements.mainContainer.getAttribute('data-headers-class');
        this.elements.mainContainer.dataset.headersClass = work.mainTitles.first.posClass;
        
        this.elements.projIndex.innerHTML = `${work.projIndex}/4`;
        this.elements.projNumber.innerHTML = `project no. ${work.projIndex}`;
        this.elements.image.src = work.imageSrc;
        this.elements.mainTitles.first.innerHTML = work.mainTitles.first.value;
        this.elements.mainTitles.container.classList.remove(`content__menuSection__mainHeader--${currentPosClass}`);
        this.elements.mainTitles.container.classList.add(`content__menuSection__mainHeader--${work.mainTitles.first.posClass}`);
        this.elements.mainTitles.second.innerHTML = work.mainTitles.sec;
        this.elements.subTitles.first.innerHTML = work.subTitles.first.value;
        this.elements.subTitles.first.classList.remove(`content__menuSection__subHeader--${currentPosClass}`);
        this.elements.subTitles.first.classList.add(`content__menuSection__subHeader--${work.subTitles.first.posClass}`);
        this.elements.subTitles.first.style.color = work.subTitles.first.color;
        this.elements.subTitles.second.innerHTML = work.subTitles.sec;
        this.elements.dragInput.dataset.workUrl = work.dragUrls;
        this.elements.showPreviewButton.href = work.previewUrl;
    }
}