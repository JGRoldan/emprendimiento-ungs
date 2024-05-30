import notificationHandler from './alerts/SwalAlerts.js'
import dynamicUpdateCard from '../script/index.js'

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
    
    const aceptarButtons = document.querySelectorAll('.aceptar-btn')
    const rechazarButtons = document.querySelectorAll('.rechazar-btn')
    enabledMiembro(aceptarButtons, pendingDisabledUser)
    disabledMiembro(rechazarButtons, pendingDisabledUser)
}

const enabledMiembro = (aceptarButtons, pendingDisabledUser) =>{
    let dataCard = JSON.parse(localStorage.getItem('dataCard')) || []

    aceptarButtons.forEach(button => {
        button.addEventListener('click', () =>{
            const userEmail = button.parentElement.parentElement.dataset.user
            button.parentElement.parentElement.remove()

            const userIndex = pendingDisabledUser.findIndex(user => user.mail === userEmail)
            
            if (userIndex !== -1) {
                const user = pendingDisabledUser.splice(userIndex, 1)[0]
                dataCard.push(user)

                localStorage.setItem('disabledUser', JSON.stringify(pendingDisabledUser))
                localStorage.setItem('dataCard', JSON.stringify(dataCard))

                dynamicUpdateDisabled()
                dynamicUpdateCard(dataCard)
            }
        })
    })
}

const disabledMiembro = (rechazarButtons, pendingDisabledUser) => {
    
    rechazarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userEmail = button.parentElement.parentElement.dataset.user
            button.parentElement.parentElement.remove()
            
            const userIndex = pendingDisabledUser.findIndex(user => user.mail === userEmail)
            
            if (userIndex !== -1) {
                pendingDisabledUser.splice(userIndex, 1)
                localStorage.setItem('disabledUser', JSON.stringify(pendingDisabledUser));
            }
            
            dynamicUpdateDisabled()
        })
    })
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
                <p>${mail}</p>
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
            const acceptedUsers = JSON.parse(localStorage.getItem('usersAccepted')) || []
            const dataCard = JSON.parse(localStorage.getItem('dataCard'))
            
            button.parentElement.parentElement.remove()
            
            const updatedUsers = pendingUsers.map(user => {
                if (user.mail === userEmail) {
                    user.isAcepted = true
                }
                return user
            })
            const remainingUsers = updatedUsers.filter(user => !user.isAcepted)

            updatedUsers.forEach(user => {
                if (user.isAcepted) {
                    acceptedUsers.push(user)
                    dataCard.push(user)
                }
            })

            localStorage.setItem('usersAccepted', JSON.stringify(acceptedUsers))
            localStorage.setItem('dataCard', JSON.stringify(dataCard))
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

const getCard = (mailToFilter) =>{
    let dataCard = JSON.parse(localStorage.getItem('dataCard'));
    let data = dataCard.filter(card => card.mail === mailToFilter)[0]
    let disabledUser = JSON.parse(localStorage.getItem('disabledUser')) || []
    
    dataCard = dataCard.filter(card => card.mail !== mailToFilter)
    localStorage.setItem('dataCard', JSON.stringify(dataCard))

    disabledUser.push(data)
    localStorage.setItem('disabledUser', JSON.stringify(disabledUser))

    dynamicUpdateCard(dataCard)
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