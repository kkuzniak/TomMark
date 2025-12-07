import '../scss/pages/work.scss';
import WorkView from './Views/WorkView';
import MainNavView from './Views/MainNavView';  

document.addEventListener('DOMContentLoaded', () => {
    new MainNavView();
    new WorkView();
});