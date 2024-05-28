const btnCuentaPago = document.querySelector('.btn-cuenta-pago')
const btnPagoNet = document.querySelector('.btn-pago-net')
const modalCuentaPago = document.getElementById('modal-cuenta-pago')
const modalPagoNet = document.getElementById('modal-pago-net')

btnCuentaPago.addEventListener('click', () => {
    modalCuentaPago.style.display = 'block'
})

btnPagoNet.addEventListener('click', () => {
    const sucursal = document.getElementById('random-sucursal')
    sucursal.innerHTML = Math.floor(Math. random()*100) + 1 
    modalPagoNet.style.display = 'block'

})

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        modalCuentaPago.style.display = 'none'
        modalPagoNet.style.display = 'none'
    })
})