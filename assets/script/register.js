import pendingNotifications from './notificaciones/pendingMember.js'

const handlerData = () =>{
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const nombreEmprendimiento = document.getElementById('nombre-emprendimiento').value
    const direccion = document.getElementById('direccion').value
    const direccionVisible = document.getElementById('direccion-checkbox').checked
    const rubro = document.getElementById('rubro-opt').value
    const inicioTrabajo = document.getElementById('inicio-trabajo').value
    const finTrabajo = document.getElementById('fin-trabajo').value
    const logoEmprendimiento = document.getElementById('logo-emprendimiento').files[0] 
    //Si no se ingresa logo es undefined
    
    const userData = {
        email: email,
        password: password,
        nombreEmprendimiento: nombreEmprendimiento,
        direccion: direccion,
        direccionVisible: direccionVisible,
        rubro: rubro,
        inicioTrabajo: inicioTrabajo,
        finTrabajo: finTrabajo,
        logoEmprendimiento:logoEmprendimiento,
        isAcepted: false
    }

    let users = JSON.parse(localStorage.getItem('users')) || []
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
    
    pendingNotifications(userData)

    Swal.fire({
        title: "Usuario registrado",
        text: "Cuando seas aceptado se te notificara via mail",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        didClose: () => {
            window.location.href = '../../index.html';
        }
    })

}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        handlerData()
        form.reset()
    });
});