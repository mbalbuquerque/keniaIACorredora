/*
=========================================
Validações
=========================================
*/

const Validation = {

    email(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    },

    idade(valor) {

        return valor >= 10 && valor <= 100;

    },

    peso(valor) {

        return valor > 20 && valor < 250;

    },

    altura(valor) {

        return valor > 0.80 && valor < 2.50;

    }

}