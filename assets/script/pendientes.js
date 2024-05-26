import notificationHandler from './alerts/SwalAlerts.js'
import dataCard from './helper/card-data.js'

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

    
    pendingUsers.map(({email, nombreEmprendimiento, direccion, direccionVisible, rubro, inicioTrabajo, finTrabajo}) => {
        const pendingCard = generateHTML(email, nombreEmprendimiento, direccion, direccionVisible, rubro, inicioTrabajo, finTrabajo)
        pendienteContainer.innerHTML += pendingCard
    })
    
    const aceptarButtons = document.querySelectorAll('.aceptar-btn')
    const rechazarButtons = document.querySelectorAll('.rechazar-btn')

    acceptButtonHandler(aceptarButtons, pendingUsers)
    rejectButtonHandler(rechazarButtons, pendingUsers)

}

const generateHTML = (email, nombreEmprendimiento, direccion, direccionVisible, rubro, inicioTrabajo, finTrabajo) =>{
    return `
        <div class="pendiente-card" data-user=${email}>
            <div class="pendiente-data">
                <h4>${nombreEmprendimiento}</h4>
                <p>FALTA PEDIR NOMBRE DE USR EN EL REGISTRO</p>
                <p>${direccion}</p>
                <p>FALTA PEDIR CONTACTO DE USR EN EL REGISTRO</p>
                <p>Desde ${inicioTrabajo} hasta ${finTrabajo} </p>
                <p>FALTA PEDIR RESUMEN DE EMPRENDIMIENTO EN EL REGISTRO</p>
                <p>FALTA PEDIR REDES DE EMPRENDIMIENTO EN EL REGISTRO</p>
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

/*Este codigo se repite en getCardData.js
Solo devuelve el emprendimiento despues de filtrarlo por el mail
*/
const getCard = (mailToFilter) =>{
    const data = dataCard.filter(card => card.mail === mailToFilter)[0]
    console.log(data)
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
})

export default getCardOnClick