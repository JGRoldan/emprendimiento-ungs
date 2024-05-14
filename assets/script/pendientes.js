const dynamicUpdatePendiente = () => {
    const pendienteContainer = document.querySelector('.pendiente-card-container')
    let pendingUsers = JSON.parse(localStorage.getItem('users')) || undefined
    
    if (pendingUsers === undefined || pendingUsers.length === 0) {
        pendienteContainer.innerHTML = 'No hay emprendimientos por aceptar'
        return
    }
    pendienteContainer.innerHTML = '';
    
    pendingUsers.map(({email, nombreEmprendimiento, direccion, direccionVisible, rubro, inicioTrabajo, finTrabajo}) => {
        const pendingCard = generateHTML(email, nombreEmprendimiento, direccion, direccionVisible, rubro, inicioTrabajo, finTrabajo)
        pendienteContainer.innerHTML += pendingCard
    })
    
    const aceptarButtons = document.querySelectorAll('.aceptar-btn')
    const rechazarButtons = document.querySelectorAll('.rechazar-btn')

    handlerAceptarButton(aceptarButtons, pendingUsers)
    handlerRechazarButton(rechazarButtons, pendingUsers)

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

const handlerAceptarButton = (aceptarButtons, pendingUsers) =>{
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


            Swal.fire({
                title: "Nuevo miembro aceptado",
                text: "Se enviara un mail al miembro",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            })

            dynamicUpdatePendiente()
        })
    })
}

const handlerRechazarButton = (rechazarButtons, pendingUsers) =>{
    rechazarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userEmail = button.parentElement.parentElement.dataset.user
            
            button.parentElement.parentElement.remove()
            
            const updatedUsers = pendingUsers.filter(user => user.email !== userEmail)
            localStorage.setItem('users', JSON.stringify(updatedUsers))
            console.log(updatedUsers)

            Swal.fire({
                title: "Aspirante a miembro borrado",
                text: "Se enviara un mail al aspirante",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            })
            
            dynamicUpdatePendiente()
        })
    })
    
}

document.addEventListener('DOMContentLoaded', ()=>{
    dynamicUpdatePendiente()
})