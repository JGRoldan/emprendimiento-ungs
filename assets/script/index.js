import {handlerDOM} from './helper/menu.js';

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('adminLogin') == "true"){
        handlerDOM()
    }
})