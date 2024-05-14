import adminCredentials from './helper/admin.js'
import {handlerDOM} from './helper/menu.js'

const login = () =>{
    localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials))
    localStorage.setItem('adminLogin', false)

    document.getElementById('login-form').addEventListener('submit', (e)=>{
        e.preventDefault()
        handlerSubmit()
    })
}


const handlerSubmit = () => {
    const adminCredentials = JSON.parse(localStorage.getItem('adminCredentials'))
    const email = document.getElementById('email').value
    const password = document.getElementById('psw').value

    console.log(password)

    if (email === adminCredentials.USER && password === adminCredentials.PASSWORD) {
        localStorage.setItem('adminLogin', true)
        handleSuccessfulLogin('ADMIN')
        return;
    }

    const acceptedUsers = JSON.parse(localStorage.getItem('usersAccepted')) || []

    const user = acceptedUsers.find(user => user.email === email && user.password === password)

    if (user) {
        handleSuccessfulLogin('USER')
        updateUserLogin(email, password, true)
        return
    }

    handleInvalidCredentials()
}

const handleSuccessfulLogin = (name) => {
    handlerDOM(name);
    Swal.fire({
        title: "Credenciales Válidas",
        text: "Redirigiendo a la página principal",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
            window.location.href = '../../index.html';
        }
    })
    resetFields()
}

const handleInvalidCredentials = () => {
    Swal.fire({
        title: "Credenciales Inválidas",
        text: "Vuelve a intentar",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    });
    resetFields()
}

const updateUserLogin = (email, password, isLogged) => {
    const userLogin = {
        email,
        password,
        isLogged
    };
    localStorage.setItem('userLogin', JSON.stringify(userLogin))
}

const resetFields = () =>{
    document.getElementById('email').value = ''
    document.getElementById('psw').value = ''
}

document.addEventListener('DOMContentLoaded', login)
