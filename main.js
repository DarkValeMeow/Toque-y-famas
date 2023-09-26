// Generar el número secreto de 4 cifras no repetidas
function generarNumeroSecreto() {
    const numerosPosibles = "0123456789".split('');
    const numeroSecreto = [];
    
    while (numeroSecreto.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * numerosPosibles.length);
        const cifra = numerosPosibles.splice(indiceAleatorio, 1)[0];
        numeroSecreto.push(cifra);
    }
    
    return numeroSecreto.join('');
}

// Comprobar si un número tiene cifras repetidas
function tieneCifrasRepetidas(numero) {
    return new Set(numero).size !== numero.length;
}

// Variable para almacenar el número secreto
let numeroSecreto = generarNumeroSecreto();
let intentos = 0;
const intentosMaximos = 5; 

// Función para reiniciar el juego
function reiniciarJuego() {
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    document.getElementById("guess").disabled = false;
    document.getElementById("result").textContent = '';
    document.getElementById("attempts-remaining").textContent = `Intentos restantes: ${intentosMaximos}`;
    document.getElementById("attempts-list").innerHTML = '';
    document.getElementById("restart-button").style.display = "none";
}

// Función para comprobar el intento del jugador
function comprobarIntento() {
    const inputGuess = document.getElementById("guess");
    const resultadoElement = document.getElementById("result");
    const intentosRestantesElement = document.getElementById("attempts-remaining");
    const restartButton = document.getElementById("restart-button");

    if (intentos >= intentosMaximos) {
        resultadoElement.textContent = `¡Lo siento! Has agotado todas tus oportunidades. El número secreto era ${numeroSecreto}.`;
        inputGuess.disabled = true;
        restartButton.style.display = "block";
        return;
    }

    const intento = inputGuess.value;

    if (intento.length !== 4 || tieneCifrasRepetidas(intento)) {
        resultadoElement.textContent = "Por favor, ingresa un número válido de 4 cifras no repetidas.";
        return;
    }

    let toques = 0;
    let famas = 0;

    for (let i = 0; i < 4; i++) {
        if (intento[i] === numeroSecreto[i]) {
            famas++;
        } else if (numeroSecreto.includes(intento[i])) {
            toques++;
        }
    }

    const resultado = `${toques} Toques - ${famas} Famas`;
    resultadoElement.textContent = resultado;

    if (famas === 4) {
        resultadoElement.textContent = `¡Felicitaciones! Has adivinado el número secreto ${numeroSecreto} en ${intentos + 1} intentos.`;
        inputGuess.disabled = true;
    }

    intentos++;

    // Actualizar la cantidad de intentos restantes en pantalla
    const intentosRestantes = intentosMaximos - intentos;
    intentosRestantesElement.textContent = `Intentos restantes: ${intentosRestantes}`;

    // Mostrar el intento actual en la lista de intentos anteriores
    const intentoActual = inputGuess.value;
    const listItem = document.createElement("li");
    listItem.textContent = `Intento ${intentos}: ${intentoActual}`;
    document.getElementById("attempts-list").appendChild(listItem);

    // Limpiar el input después de cada intento
    inputGuess.value = '';
}