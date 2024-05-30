import notificationHandler from './alerts/SwalAlerts.js'

const btnCuentaPago = document.querySelector('.btn-cuenta-pago')
const btnPagoNet = document.querySelector('.btn-pago-net')
const modalCuentaPago = document.getElementById('modal-cuenta-pago')
const modalPagoNet = document.getElementById('modal-pago-net')
const btnDonacionPagoNet = document.querySelector('.btn-donacion-pago-net')
const btnDonacionCuentaPago = document.querySelector('.btn-donacion-cuenta-pago')
let numeroSucursal

btnCuentaPago.addEventListener('click', () => {
    modalCuentaPago.style.display = 'block'
})

btnPagoNet.addEventListener('click', () => {
    const sucursal = document.getElementById('random-sucursal')
    numeroSucursal = Math.floor(Math. random()*100) + 1 
    sucursal.innerHTML = numeroSucursal 
    modalPagoNet.style.display = 'block'

})

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        modalCuentaPago.style.display = 'none'
        modalPagoNet.style.display = 'none'
    })
})

if(btnDonacionPagoNet){
    btnDonacionPagoNet.addEventListener('click', (e) => {
            const pagoNet = document.getElementById('pago-net-monto')
            const monto = pagoNet.value

            if (monto) {
                const donacion = {
                    monto: parseFloat(monto).toLocaleString("es-AR", {style:"currency", currency:"ARG"}),
                    fecha: new Date().toLocaleString(),
                    metodo: 'Pago Net',
                    numeroSucursal
                }
    
                let reporteDonacion = JSON.parse(localStorage.getItem('reporteDonacion')) || []
                reporteDonacion.push(donacion)
                localStorage.setItem('reporteDonacion', JSON.stringify(reporteDonacion))
                notificationHandler(
                    "Donación realizada",
                    "Gracias por su donación",
                    "success"
                )

                pagoNet.value =''
            }
            else{
                notificationHandler(
                    "Donación rechazada",
                    "Ingresa un monto",
                    "error"
                )
            }
    })
}

if (btnDonacionCuentaPago){
    btnDonacionCuentaPago.addEventListener('click', (e) => {
        const cuentaPago = document.getElementById('cuenta-pago-monto')
        const monto = cuentaPago.value
        
        if (monto) {
            const donacion = {
                monto: parseFloat(monto).toLocaleString("es-AR", {style:"currency", currency:"ARG"}),
                fecha: new Date().toLocaleString(),
                metodo: 'Cuenta Pago',
            }

            let reporteDonacion = JSON.parse(localStorage.getItem('reporteDonacion')) || []
            reporteDonacion.push(donacion)
            localStorage.setItem('reporteDonacion', JSON.stringify(reporteDonacion))
            notificationHandler(
                "Donación realizada",
                "Gracias por su donación",
                "success"
            )
            cuentaPago.value=''
        }
        else{
            notificationHandler(
                "Donación rechazada",
                "Ingresa un monto",
                "error"
            )
        }
    
        
    })
}



