import gsap from 'gsap';
import CustomEase from './CustomEase.min';

gsap.registerPlugin(CustomEase);
CustomEase.create('ease', '0.25,0.1,0.25,1');