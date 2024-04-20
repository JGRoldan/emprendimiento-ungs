const logoutBtn = document.getElementById('logoutLink')

logoutBtn.addEventListener('click', ()=>{
    localStorage.setItem('adminLogin', false)

    Swal.fire({
        title: "Cerrando sesión",
        text: "Hasta la próxima",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
            window.location.href = 'https://jgroldan.github.io/emprendimiento-ungs/index.html';
        }
    })
})
