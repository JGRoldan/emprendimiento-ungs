import notificationHandler from './alerts/SwalAlerts.js'
import dataCard from './helper/card-data.js'

const dynamicUpdateDisabled = () => {
    const disabledContainer = document.querySelector('.disabled-card-container')
    let pendingDisabledUser = JSON.parse(localStorage.getItem('disabledUser')) || undefined
    
    if(disabledContainer !== null){
        if (pendingDisabledUser === undefined || pendingDisabledUser.length === 0) {
            disabledContainer.innerHTML = 'No hay emprendimientos por habilitar'
            return
        }
        disabledContainer.innerHTML = ''
    }

    pendingDisabledUser.map(({mail, emprendimiento, direccion, direccionVisible, nombre, telefono, detalle}) => {
        const pendingCard = generateHTML(mail, emprendimiento, direccion, direccionVisible, nombre, telefono, detalle)
        disabledContainer.innerHTML += pendingCard
    })
    
    const aceptarButtons = document.querySelectorAll('.btn-disabled')

    // enabledMiembro(aceptarButtons, pendingDisabledUser) implementar
}

const dynamicUpdatePendiente = () => {
    const pendienteContainer = document.querySelector('.pendiente-card-container')
    let pendingUsers = JSON.parse(localStorage.getItem('users')) || undefined
    
    if(pendienteContainer !== null){
        if (pendingUsers === undefined || pendingUsers.length === 0) {
            pendienteContainer.innerHTML = 'No hay emprendimientos por aceptar'
            return
        }
        pendienteContainer.innerHTML = ''
    }


    
    pendingUsers.map(({mail, emprendimiento, direccion, direccionVisible, nombre, telefono, detalle}) => {
        const pendingCard = generateHTML(mail, emprendimiento, direccion, direccionVisible, nombre, telefono, detalle)
        pendienteContainer.innerHTML += pendingCard
    })
    
    const aceptarButtons = document.querySelectorAll('.aceptar-btn')
    const rechazarButtons = document.querySelectorAll('.rechazar-btn')

    acceptButtonHandler(aceptarButtons, pendingUsers)
    rejectButtonHandler(rechazarButtons, pendingUsers)

}

const generateHTML = (mail, emprendimiento, direccion, direccionVisible, nombre, telefono, detalle) =>{
    return `
        <div class="pendiente-card" data-user=${mail}>
            <div class="pendiente-data">
                <h4>${emprendimiento}</h4>
                <p>${nombre}</p>
                <p>${direccion}</p>
                <p>${telefono}</p>
                <p>${detalle}</p>
                <button class="btn-pendientes aceptar-btn">ACEPTAR</button>
                <button class="btn-pendientes rechazar-btn">RECHAZAR</button>
            </div>
            <div class="pendiente-mapa">
                <h4>${direccionVisible ? 'Llamar API MAPA' : 'La dirección no esta visible'}</h4>
            </div>
        </div> 
    `
}

const acceptButtonHandler = (aceptarButtons, pendingUsers) =>{
    aceptarButtons.forEach(button => {
        button.addEventListener('click', () =>{
            const userEmail = button.parentElement.parentElement.dataset.user
            button.parentElement.parentElement.remove()

            const updatedUsers = pendingUsers.map(user => {
                if (user.email === userEmail) {
                    user.isAcepted = true
                }
                return user
            })

            const acceptedUsers = JSON.parse(localStorage.getItem('usersAccepted')) || []
            
            updatedUsers.forEach(user => {
                if (user.isAcepted) {
                    acceptedUsers.push(user)
                }
            })

            localStorage.setItem('usersAccepted', JSON.stringify(acceptedUsers))

            const remainingUsers = updatedUsers.filter(user => !user.isAcepted)
            localStorage.setItem('users', JSON.stringify(remainingUsers))

            notificationHandler(
                "Nuevo miembro aceptado",
                "Se enviara un mail al miembro",
                "success",
            )

            dynamicUpdatePendiente()
        })
    })
}

const rejectButtonHandler = (rechazarButtons, pendingUsers) =>{
    rechazarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userEmail = button.parentElement.parentElement.dataset.user
            
            button.parentElement.parentElement.remove()
            
            const updatedUsers = pendingUsers.filter(user => user.email !== userEmail)
            localStorage.setItem('users', JSON.stringify(updatedUsers))
            console.log(updatedUsers)

            notificationHandler(
                "Aspirante a miembro borrado",
                "Se enviara un mail al aspirante",
                "success"
            )

            dynamicUpdatePendiente()
        })
    })
    
}

// Este codigo se repite en getCardData.js
const getCard = (mailToFilter) =>{
    const data = dataCard.filter(card => card.mail === mailToFilter)[0]
    
    let disabledUser = JSON.parse(localStorage.getItem('disabledUser')) || []
    disabledUser.push(data)
    
    localStorage.setItem('disabledUser', JSON.stringify(disabledUser))
}

const getCardOnClick = (buttons) =>{
    buttons.forEach( btn => {
        btn.addEventListener('click', e =>{
            getCard(e.target.getAttribute("data-email"))
        })
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    dynamicUpdatePendiente()
    dynamicUpdateDisabled()
})

export default getCardOnClick