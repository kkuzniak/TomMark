class WorksMenu {
    constructor() {
        this.elements = {
            self: document.querySelector('.worksMenu')
        };
        this.setupHeightOfContainer();
    }   

    setupHeightOfContainer() {
        this.elements.self.style.height = window.innerHeight;
    }
}