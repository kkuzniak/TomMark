import Navbar from './Views/WorkPage/Navbar';
import SliderView from './Views/WorkPage/SliderView';
import anim from './anim';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
    const sliderView = new SliderView();
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