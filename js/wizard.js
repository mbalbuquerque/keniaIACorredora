/*
=========================================
KÊNIA AI
Wizard da Avaliação
=========================================
*/

class Wizard {

    constructor() {

        this.steps = document.querySelectorAll(".step");

        this.current = 0;

        this.progressBar = document.getElementById("progressBar");

        this.stepText = document.getElementById("stepText");

        this.total = this.steps.length;

        this.bindEvents();

        this.update();

        this.restore();

    }

    bindEvents() {

        document.querySelectorAll(".next").forEach(button => {

            button.addEventListener("click", () => {

                if (this.validate()) {

                    this.save();

                    this.next();

                }

            });

        });

        document.querySelectorAll(".back").forEach(button => {

            button.addEventListener("click", () => {

                this.previous();

            });

        });

        this.selectGoal();

    }

    next() {

        if (this.current < this.total - 1) {

            this.steps[this.current].classList.remove("active");

            this.current++;

            this.steps[this.current].classList.add("active");

            this.update();

        }

    }

    previous() {

        if (this.current > 0) {

            this.steps[this.current].classList.remove("active");

            this.current--;

            this.steps[this.current].classList.add("active");

            this.update();

        }

    }

    update() {

        const percent = ((this.current + 1) / this.total) * 100;

        this.progressBar.style.width = percent + "%";

        this.stepText.innerHTML = `Etapa ${this.current + 1} de ${this.total}`;

    }

    validate() {

        const step = this.steps[this.current];

        const required = step.querySelectorAll("input[required],select[required]");

        for (const field of required) {

            if (field.value.trim() === "") {

                alert("Preencha todos os campos obrigatórios.");

                field.focus();

                return false;

            }

        }

        return true;

    }

    selectGoal() {

        const cards = document.querySelectorAll(".goal-card");

        cards.forEach(card => {

            card.addEventListener("click", () => {

                cards.forEach(c => c.classList.remove("selected"));

                card.classList.add("selected");

                localStorage.setItem("objetivo", card.dataset.value);

            });

        });

    }

    save() {

        const dados = {};

        document.querySelectorAll("input,select,textarea").forEach(campo => {

            if (campo.type === "checkbox") {

                dados[campo.id] = campo.checked;

            }

            else {

                dados[campo.id] = campo.value;

            }

        });

        localStorage.setItem(

            "kenia-avaliacao",

            JSON.stringify(dados)

        );

    }

    restore() {

        const dados = localStorage.getItem("kenia-avaliacao");

        if (!dados) {

            return;

        }

        const json = JSON.parse(dados);

        document.querySelectorAll("input,select,textarea").forEach(campo => {

            if (json[campo.id] === undefined) {

                return;

            }

            if (campo.type === "checkbox") {

                campo.checked = json[campo.id];

            }

            else {

                campo.value = json[campo.id];

            }

        });

    }



}

document
    .getElementById("finishButton")
    .addEventListener("click", () => {

        wizard.save();

        location.href = "resultado.html";

    });

const wizard = new Wizard();