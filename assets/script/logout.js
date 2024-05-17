const logoutBtn = document.getElementById('logoutLink')

logoutBtn.addEventListener('click', ()=>{
    /*Despues de iniciar sesión tengo que borrar userLogin del localstorage
    A modo de prueba solo cambio el isLogged
    */
    const userLogin = JSON.parse(localStorage.getItem('userLogin')) || []
    userLogin.isLogged = false
    localStorage.setItem('userLogin', JSON.stringify(userLogin))

    localStorage.setItem('adminLogin', false)

    Swal.fire({
        title: "Cerrando sesión",
        text: "Hasta la próxima",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        // didClose: () => {
        //     window.location.href = 'https://jgroldan.github.io/emprendimiento-ungs/index.html';
        // }
    })
})
