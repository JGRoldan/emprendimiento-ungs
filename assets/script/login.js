import adminCredentials from './helper/admin.js';
import {handlerDOM} from './helper/menu.js';

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

    if(email == adminCredentials.USER && password == adminCredentials.PASSWORD){
        localStorage.setItem('adminLogin', true)
        handlerDOM()
        Swal.fire({
            title: "Credenciales Validas",
            text: "Redirigiendo a página principal",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
                window.location.href = '../../index.html';
            }
        })
        resetFields()
        return
    }
    Swal.fire({
        title: "Credenciales Invalidas",
        text: "Vuelve a intentar",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    })
    resetFields()
    return
}

const resetFields = () =>{
    document.getElementById('email').value = '';
    document.getElementById('psw').value = '';
}

document.addEventListener('DOMContentLoaded', login)
