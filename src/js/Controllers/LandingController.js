export default class LandingController {
    constructor() {}

    async getNextWork(link) {
        const body = await fetch(`${link}`).then(res => res.text()).then(body => body);
        return body;
    }
}