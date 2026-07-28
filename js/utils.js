/**
 * ===================================
 * UTILIDADES
 * ===================================
 */

const Utils = {

    id(id) {

        return document.getElementById(id);

    },

    scrollBottom() {

        const chat = Utils.id("chatMessages");

        chat.scrollTop = chat.scrollHeight;

    },

    now() {

        return new Date().toLocaleTimeString("pt-BR", {

            hour: "2-digit",

            minute: "2-digit"

        });

    },

    escape(text) {

        const div = document.createElement("div");

        div.innerText = text;

        return div.innerHTML;

    },

    loading(show = true) {

        const el = Utils.id("typing");

        el.style.display = show ? "flex" : "none";

        Utils.scrollBottom();

    }

}