export default class Work {
    constructor(projIndex = '', mainTitles = {}, subTitles = {}, imageSrc = '', dragUrls = '', previewUrl = '') {
        this.projIndex = projIndex;
        this.mainTitles = mainTitles;
        this.subTitles = subTitles;
        this.imageSrc = imageSrc;
        this.dragUrls = dragUrls;
        this.previewUrl = previewUrl;
    }

    setupDefaultWork() {
        this.projIndex = '1';
        this.mainTitles = {
            first: 'w.',
            sec: '_surdacka'
        };
        this.subTitles = {
            first: {
                value: 'fashion<br>designer',
                color: '#111111',
            },
            sec: 'based:<br>warsaw,<br>poland'
        };
        this.imageSrc = '/videos/land-1.mp4';
        this.dragUrls = '["self","/TomMark/work_2","/TomMark/work_3","/TomMark/work_4"]';
        this.previewUrl = '/work/preview/weronika-surdacka';
    }
}