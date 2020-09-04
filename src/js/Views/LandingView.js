import LandingWork from '../Models/LandingWork';
import {getURLParameter} from '../main';

export default class LandingView {
    constructor() {
        this.elements = {
            projIndex: document.querySelector('#projIndex'),
            projNumber: document.querySelector('#projectNumber'),
            image: document.querySelector('#projectImage'),
            header: {
                firstPart: document.querySelector('#projectHeader__firstPart'),
                secondPart: document.querySelector('#projectHeader__secondPart'),
            },
            subheader: {
                first: document.querySelector('#projectSubheader__first'),
                second: document.querySelector('#projectSubheader__second')
            },
            nextButton: document.querySelector('#nextProjButton'),
            showMoreButton: document.querySelector('#showMoreButton')
        };
        this.worksIndex = 0;
        this.works = [
            new LandingWork(1, 'weronika-surdacka', ['w.', '_surdacka'], {title: 'fashion<br>designer', color: '#111111'}, 'based:<br>warsaw,<br>poland', 'videos/Landing/1.mp4', 'royal-star', 'weronika_surdacka.html'),
            new LandingWork(2, 'royal-star', ['royal', '_star'], {title: 'no. 1 aviation training center<br>in poland', color: '#8FD0EA'}, 'based:<br>mielec,<br>poland', 'videos/Landing/2.mp4', 'frontline-club', 'royal_star.html'),
            new LandingWork(3, 'frontline-club', ['frontline', '_club'], {title: 'media club supporting<br>independent journalism', color: '#003A00'}, 'based:<br>london,<br>united kingdom', 'videos/Landing/3.mp4', 'pina-colada', 'frontline_club.html'),
            new LandingWork(4, 'pina-colada', ['piña', '_colada'], {title: 'clothing<br>brand', color: '#2EBBAC'}, 'based:<br>lodz,<br>poland', 'videos/Landing/4.mp4', 'weronika-surdacka', 'pina_colada.html'),
        ];
        // const linkProjName = getURLParameter('proj');
        // if (!linkProjName) {
        //     window.open('index.html?proj=weronika-surdacka', '_self');
        // }
        // const work = linkProjName ? this.works.find(el => el.linkName == linkProjName) : this.works[0];
        this.updateView(this.works[this.worksIndex]);
        this.events();
    }

    events() {
        this.elements.nextButton.addEventListener('click', () => {
            this.worksIndex = this.worksIndex > this.works.length - 2 ? 0 : this.worksIndex + 1;
            this.updateView(this.works[this.worksIndex]);
        });
    }

    updateView(work) {
        this.elements.projIndex.innerHTML = `${work.id}/${this.works.length}`;
        this.elements.projNumber.innerHTML = `Project no. ${work.id}`;
        this.elements.projNumber.style.webkitAnimationName = 'slideInUp';
        this.elements.image.src = `${work.imageSrc}`;
        this.elements.header.firstPart.innerHTML = `${work.mainHeader[0]}`;
        this.elements.header.secondPart.innerHTML = `${work.mainHeader[1]}`;
        this.elements.subheader.first.innerHTML = `${work.firstSubheader.title}`;
        this.elements.subheader.first.style.color = `${work.firstSubheader.color}`;
        this.elements.subheader.second.innerHTML = `${work.secondSubheader}`;
        // const nextProjLink = work.id < this.works.length ? this.works[work.id].linkName : this.works[0].linkName;
        // this.elements.nextButton.setAttribute('href', `index.html?proj=${nextProjLink}`);
        this.elements.showMoreButton.setAttribute('href', `${work.linkToMore}`);
    }
}