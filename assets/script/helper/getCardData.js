import mostrarMapa from '../api/mapa.js'

const getLatitudLongitud = (mailToFilter) =>{
    const storedData = JSON.parse(localStorage.getItem('dataCard'))
    const {latitud, longitud} = storedData.filter(card => card.mail === mailToFilter)[0]

    mostrarMapa(latitud, longitud)
}

const getCardData = (buttons) =>{
    buttons.forEach( btn => {
        btn.addEventListener('click', e =>{
            getLatitudLongitud(e.target.getAttribute("data-email"))
        })
    })
}

export default getCardData

