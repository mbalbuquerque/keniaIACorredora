/*
=========================================
KÊNIA AI
AVALIAÇÃO
=========================================
*/

const steps = document.querySelectorAll(".step");
const indicators = document.querySelectorAll(".steps span");

const progressBar = document.getElementById("progressBar");

const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const btnFinish = document.getElementById("finish");

const form = document.getElementById("assessmentForm");

let currentStep = 0;

/* ============================
INICIALIZA
============================ */

updateWizard();

/* ============================
BOTÕES
============================ */

btnNext.addEventListener("click", () => {

    if (!validateStep()) return;

    currentStep++;

    updateWizard();

});

btnPrev.addEventListener("click", () => {

    currentStep--;

    updateWizard();

});

/* ============================
ATUALIZA WIZARD
============================ */

function updateWizard() {

    steps.forEach((step, index) => {

        step.classList.toggle(
            "active",
            index === currentStep
        );

    });

    indicators.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index <= currentStep
        );

    });

    const percent =
        ((currentStep + 1) / steps.length) * 100;

    progressBar.style.width = percent + "%";

    btnPrev.style.display =
        currentStep === 0
            ? "none"
            : "inline-block";

    btnNext.style.display =
        currentStep === steps.length - 1
            ? "none"
            : "inline-block";

    btnFinish.style.display =
        currentStep === steps.length - 1
            ? "inline-block"
            : "none";

}
/* ============================
VALIDAÇÃO
============================ */

function validateStep() {

    if (currentStep === 0) {

        const nome = document.getElementById("nome");

        if (nome.value.trim() === "") {

            alert("Informe seu nome.");

            nome.focus();

            return false;

        }

    }

    return true;

}
/* ============================
SALVAR
============================ */

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const dados = {

        nome: document.getElementById("nome").value,

        idade: document.getElementById("idade").value,

        peso: document.getElementById("peso").value,

        altura: document.getElementById("altura").value,

        cidade: document.getElementById("cidade").value,

        nivel: document.getElementById("nivel").value,

        objetivo: document.getElementById("objetivo").value,

        pace: document.getElementById("pace").value,

        distancia: document.getElementById("distancia").value,

        lesoes: document.getElementById("lesoes").value,

        alimentacao: document.getElementById("alimentacao").value,

        observacoes: document.getElementById("observacoes").value,

        dataCadastro: new Date().toLocaleString()

    };

    localStorage.setItem(

        "kenia-avaliacao",

        JSON.stringify(dados)

    );

    window.location.href = "resultado.html";

});