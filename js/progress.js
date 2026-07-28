/*
=========================================
Barra de progresso
=========================================
*/

function updateProgress(current, total) {

    const bar = document.getElementById("progressBar");

    const text = document.getElementById("stepText");

    const percent = ((current + 1) / total) * 100;

    bar.style.width = percent + "%";

    text.innerHTML = `Etapa ${current + 1} de ${total}`;

}