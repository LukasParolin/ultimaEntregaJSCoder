

const tiposDeRostro = ["cuadrado", "redondo", "ovalado", "triangular"]
const cortesRecomendados = [
    ["Rapado", "Texturizado", "Volumen arriba"],
    ["Capas", "Flequillo de lado", "Laterales cortos, largo arriba"],
    ["Clásico", "Peinado hacia atrás", "Degradado alto"],
    ["Volumen en los lados", "Flequillo", "Despeinado"]
]

document.getElementById('verCortes').addEventListener('click', function() {
    const select = document.getElementById('tipoRostro')
    const indice = parseInt(select.value)
    const cortes = obtenerCortesRecomendados(indice)
    mostrarCortes(cortes)
})

function obtenerCortesRecomendados(indice) {
    return cortesRecomendados[indice] || []
}

function mostrarCortes(cortes) {
    const listaCortes = document.getElementById('listaCortes')
    listaCortes.innerHTML = '' 
    if (cortes) {
        cortes.forEach(corte => {
            const li = document.createElement('li')
            li.textContent = corte
            listaCortes.appendChild(li)
        })
        document.getElementById('formularioTurno').style.display = 'block' 
    }
}