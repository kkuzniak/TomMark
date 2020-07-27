import WorkPageProject from './Model/WorkPageProject';
import {getURLParameter} from './main';

export default class WorkPage {
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
            nextButton: document.querySelector('#nextProjButton')
        };
        this.works = [
            new WorkPageProject(1, 'weronika-surdacka', ['weronika', 'surdacka'], {title: 'fashion<br>designer', color: '#111111'}, 'based:<br>warsaw,<br>poland', 'images/Landing/4.jpg', 'royal-star'),
            new WorkPageProject(2, 'royal-star', ['royal', 'star'], {title: 'no. 1 aviation training center<br>in poland', color: '#8FD0EA'}, 'based:<br>mielec,<br>poland', 'images/Landing/1.jpg', 'frontline-club'),
            new WorkPageProject(3, 'frontline-club', ['frontline', 'club'], {title: 'media club supporting<br>independent journalism', color: '#003A00'}, 'based:<br>london,<br>united kingdom', 'images/Landing/2.jpg', 'pina-colada'),
            new WorkPageProject(4, 'pina-colada', ['piña', 'colada'], {title: 'clothing<br>brand', color: '#2EBBAC'}, 'based:<br>lodz,<br>poland', 'images/Landing/3.jpg', 'weronika-surdacka'),
        ];
        const linkProjName = getURLParameter('proj');
        if (!linkProjName) {
            window.open('index.html?proj=weronika-surdacka', '_self');
        }
        const work = linkProjName ? this.works.find(el => el.linkName == linkProjName) : this.works[0];
        this.updateView(work);
    }

    updateView(work) {
        this.elements.projIndex.innerHTML = `${work.id}/${this.works.length}`;
        this.elements.projNumber.innerHTML = `Project no. ${work.id}`;
        this.elements.image.src = `${work.imageSrc}`;
        this.elements.header.firstPart.innerHTML = `${work.mainHeader[0]}`;
        this.elements.header.secondPart.innerHTML = `${work.mainHeader[1]}`;
        this.elements.subheader.first.innerHTML = `${work.firstSubheader.title}`;
        this.elements.subheader.first.style.color = `${work.firstSubheader.color}`;
        this.elements.subheader.second.innerHTML = `${work.secondSubheader}`;
        const nextProjLink = work.id < this.works.length ? this.works[work.id].linkName : this.works[0].linkName;
        this.elements.nextButton.setAttribute('href', `index.html?proj=${nextProjLink}`);
    }
}