import dataCard from '../helper/card-data.js'

const getCard = (mailToFilter) =>{
    const {latitud, longitud} = dataCard.filter(card => card.mail === mailToFilter)[0]
    alert(`Latitud: ${latitud}, Longitud: ${longitud}`)
}

const getMailOnClick = (buttons) =>{
    buttons.forEach( btn => {
        btn.addEventListener('click', e =>{
            getCard(e.target.getAttribute("data-email"))
        })
    })
}

// document.addEventListener('DOMContentLoaded', (e) => {
//     const checkElement = () => {
//         const verButtons = document.querySelectorAll("#onVerClick")
//         if (verButtons) {
//             clearInterval(intervalId)
//             getMailOnClick(verButtons)
//         }
//     }

//     /*
//     Problema = El DOM carga antes de este archivo.js, entonces al leer verMapa da null.
//     La solucion fue crear un intervalo para que pregunte constantemente si el archivo existe.
//     Si existe para ese proceso y devuelve el verMapa.
//     */ 
//     const intervalId = setInterval(checkElement, 100)
// })

export default getMailOnClick
