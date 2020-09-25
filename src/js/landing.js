import LandingView from './Views/LandingView';
import anim from './anim';

document.addEventListener('DOMContentLoaded', () => {
    const landingView = new LandingView();
    const loader = document.querySelector('.pageLoader');
    const loaderTl = (new anim()).loaderTl();
    loaderTl.play('start');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.remove('pageLoader--shown');
            loader.classList.add('pageLoader--hidden');
        }, 1000);
    });
});