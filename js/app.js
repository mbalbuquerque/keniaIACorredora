/**
 * ================================
 * APP
 * ================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("prompt");

    const button = document.getElementById("sendButton");

    async function sendMessage() {

        const message = input.value.trim();

        if (message === "") {

            return;

        }

        chat.addUserMessage(message);

        chat.clearInput();

        const answer = await gemini.send(message);

        chat.addAIMessage(answer);

    }

    button.addEventListener("click", sendMessage);

    input.addEventListener("keypress", (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

});