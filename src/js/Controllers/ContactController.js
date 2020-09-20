export default class ContactController {
    constructor() {}

    async sendEmail(email = '', message = '') {
        return await fetch(`sendMail.php?email=${email}&message=${message}`).then(el => el.json());
    }
}