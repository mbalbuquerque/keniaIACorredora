/*
=========================================
KÊNIA AI
GEMINI
Versão 3.0
=========================================
*/

class Gemini {

    static async ask(prompt, history = [], contexto = {}) {

        const response = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                prompt,

                history,

                contexto

            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.error ||

                "Erro ao comunicar com o servidor."

            );

        }

        return data.reply;

    }

}