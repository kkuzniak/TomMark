export default class Navbar {
    constructor() {
        this.scrollTimeout = null;
        this.elements = {
            self: document.querySelector('#workPageNavbar')
        };
        this.events();
        this.show();
    }   

    events() {
        window.addEventListener('scroll', () => {  
            if (this.scrollTimeout) window.clearTimeout(this.scrollTimeout);
            this.hide();
            this.scrollTimeout = setTimeout(() => {
                this.show();
                if (this.scrollTimeout) window.clearTimeout(this.scrollTimeout);
            }, 200);
        });
    }

    hide() {
        this.elements.self.classList.add('navbar--hidden');
    }

    show() {
        this.elements.self.classList.remove('navbar--hidden');
    }
}