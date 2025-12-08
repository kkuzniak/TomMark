import '../scss/pages/contact.scss';
import ContactView from './Views/ContactView';
import MainNavView from './Views/MainNavView';

document.addEventListener('DOMContentLoaded', () => {
    new ContactView();
    new MainNavView();
});