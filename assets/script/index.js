import {handlerDOM} from './helper/menu.js';
import rubrosENUM from './helper/rubros.js';
import dataCard from './helper/card-data.js';

const dynamicUpdateCard = () =>{
    const cardContainer = document.querySelector('.card-container')

    dataCard.map( ({emprendimiento, nombre, telefono, mail, direccion, redes}) => {
        let redesHTML = redesValidation(redes)
        const cardHTML = generateCardHTML(redesHTML, {emprendimiento, nombre, telefono, mail, direccion})

        cardContainer.innerHTML += cardHTML
    })
}

const redesValidation = (redes) =>{
    if (redes) {
        return `
            <p style="color:#626567">Redes Sociales</p>
            <ul style="color:#626567">
                ${redes.instagram ? `<li>Instagram: ${redes.instagram}</li>` : '<li style="color:white"> - </li>'}
                ${redes.facebook ? `<li>Facebook: ${redes.facebook}</li>` : '<li style="color:white"> -</li>'}
                <!-- Agrega más redes sociales aquí si es necesario -->
            </ul>
        `;
    }
}

const generateCardHTML = (redesHTML, {emprendimiento, nombre, telefono, mail, direccion}) => {
    return `
    <div class="card">
        <h3>${emprendimiento}</h3>
        <p style="color:#626567 "> <b>Nombre:</b> ${nombre}</p>
        <p style="color:#626567 "> <b>Whatsapp:</b> ${telefono}</p>
        <p style="color:#626567 "> <b>Mail:</b> ${mail}</p>
        <p style="color:#626567 "> <b>Dirección:</b> ${direccion}</p>
        ${redesHTML}
    </div>
    `
}

const dynamicUpdateRubros = () =>{

    const selectRubros = document.getElementById("rubros");

    for (const rubro in rubrosENUM) {
        if (rubrosENUM.hasOwnProperty(rubro)) {
            const opcion = document.createElement("option");
            opcion.value = rubro;
            opcion.textContent = rubrosENUM[rubro];
            selectRubros.appendChild(opcion);
        }
    }

}

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('adminLogin') == "true"){
        handlerDOM()
    }

    dynamicUpdateCard()
    dynamicUpdateRubros()
})