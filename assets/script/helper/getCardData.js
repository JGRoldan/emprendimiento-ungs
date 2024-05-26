import dataCard from '../helper/card-data.js'
import mostrarMapa from '../api/mapa.js'

const getCard = (mailToFilter) =>{
    const {latitud, longitud} = dataCard.filter(card => card.mail === mailToFilter)[0]
    mostrarMapa(latitud, longitud)
}

const getCardData = (buttons) =>{
    buttons.forEach( btn => {
        btn.addEventListener('click', e =>{
            getCard(e.target.getAttribute("data-email"))
        })
    })
}

export default getCardData
