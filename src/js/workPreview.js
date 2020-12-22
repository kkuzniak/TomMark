// import Navbar from './Views/WorkPage/Navbar';
import MainNavView from './Views/MainNavView';
import SliderView from './Views/WorkPage/SliderView';
import anim from './anim';

document.addEventListener('DOMContentLoaded', () => {
    // new Navbar();
    new SliderView();
    new MainNavView({withScrollEvents: true});
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