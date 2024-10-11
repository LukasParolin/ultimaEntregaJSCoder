

document.getElementById('agendarTurno').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const fecha = document.getElementById('fecha').value
    const hora = document.getElementById('hora').value

    if (nombre && email && fecha && hora) {
        
        const turno = { nombre, email, fecha, hora }
        guardarTurno(turno)
        mostrarConfirmacion(turno)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Completa todos los campos antes de agendar tu turno'
        })
    }
})

function guardarTurno(turno) {
    let turnos = JSON.parse(localStorage.getItem('turnos')) || []
    turnos.push(turno)
    localStorage.setItem('turnos', JSON.stringify(turnos))
}

function mostrarConfirmacion(turno) {
    Swal.fire({
        icon: 'success',
        title: 'Turno reservado!',
        text: `Tu turno ha sido agendado para el ${turno.fecha} a las ${turno.hora}. ¡Nos vemos pronto, ${turno.nombre}!`
    })

    document.getElementById('formularioTurno').style.display = 'none'
    document.getElementById('mensajeConfirmacion').style.display = 'block'
    document.getElementById('detalleTurno').textContent = `Turno confirmado para ${turno.nombre} el ${turno.fecha} a las ${turno.hora}.`
}

document.getElementById('verHistorial').addEventListener('click', function() {
    const turnos = JSON.parse(localStorage.getItem('turnos')) || []
    const listaHistorial = document.getElementById('listaHistorial')
    listaHistorial.innerHTML = ''
    turnos.forEach(turno => {
        const li = document.createElement('li')
        li.textContent = `${turno.nombre} - ${turno.fecha} a las ${turno.hora}`
        listaHistorial.appendChild(li)
    })
    document.getElementById('mensajeConfirmacion').style.display = 'none'
    document.getElementById('historialTurnos').style.display = 'block'
})


fetch('/data/turnos.json')
    .then(response => response.json())
    .then(data => {
        const selectFecha = document.getElementById('fecha')
        data.forEach(turno => {
            const option = document.createElement('option')
            option.value = turno.fecha
            option.textContent = turno.fecha
            selectFecha.appendChild(option)
        })
        
        selectFecha.addEventListener('change', function() {
            const fechaSeleccionada = selectFecha.value
            const horariosDisponibles = data.find(turno => turno.fecha === fechaSeleccionada).horarios
            const selectHora = document.getElementById('hora')
            selectHora.innerHTML = ''
            horariosDisponibles.forEach(hora => {
                const option = document.createElement('option')
                option.value = hora
                option.textContent = hora
                selectHora.appendChild(option)
            })
        })
    })
    .catch(error => console.error('No pudimos cargar los turnos:', error))