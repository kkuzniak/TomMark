import '../scss/pages/about.scss';
import MainNavView from './Views/MainNavView';

document.addEventListener('DOMContentLoaded', () =>{
    new MainNavView({withFixedBtn: true});
});