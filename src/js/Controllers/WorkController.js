import Work from '../Models/Work';

export default class WorkController {
    constructor() {}

    async getNextWork(link) {
        return await fetch(`${link}`).then(res => res.text()).then(body => body);
    }

    parseNextWork(parsedRoot) {
        return new Work(
            parsedRoot.querySelector('#mainContainer').getAttribute('data-proj-index'),
            {
                first: {
                    value: parsedRoot.querySelector('#mainTitleFirst').innerHTML,
                    posClass: parsedRoot.querySelector('#mainContainer').getAttribute('data-headers-class')
                },
                sec: parsedRoot.querySelector('#mainTitleSec').innerHTML
            },
            {
                first: {
                    value: parsedRoot.querySelector('#firstSubtitle').innerHTML,
                    color: parsedRoot.querySelector('#firstSubtitle').getAttribute('data-color'),
                    posClass: parsedRoot.querySelector('#mainContainer').getAttribute('data-headers-class')
                },
                sec: parsedRoot.querySelector('#secSubtitle').innerHTML
            },
            parsedRoot.querySelector('#image').getAttribute('src'),
            parsedRoot.querySelector('#dragInput').getAttribute('data-work-url'),
            parsedRoot.querySelector('#showPreview').getAttribute('href')
        );
    }
}