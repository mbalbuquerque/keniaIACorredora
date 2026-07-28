/*
=========================================
KÊNIA AI
CHAT.JS
Versão 1.0
=========================================
*/

class Chat {

    constructor() {

    this.messages = document.getElementById("chatMessages");
    this.prompt = document.getElementById("prompt");
    this.send = document.getElementById("send");
    this.typing = document.getElementById("typing");

    

    this.history = [];

    this.init();

}

    init() {

        this.loadUser();

        this.loadHistory();

        this.bindEvents();

        this.scrollBottom();

        this.prompt.focus();

    }

    bindEvents() {

    if (this.send) {

        this.send.addEventListener("click", () => {

            this.sendMessage();

        });

        const home = document.getElementById("btnHome");

if(home){

    home.addEventListener("click",()=>{

        window.location.href="index.html";

    });

}

    }

    if (this.prompt) {

        this.prompt.addEventListener("keydown", (e) => {

            if (e.key === "Enter" && !e.shiftKey) {

                e.preventDefault();

                this.sendMessage();

            }

        });

    }

    const clear = document.getElementById("clearChat");

    if (clear) {

        clear.addEventListener("click", () => {

            this.clearChat();

        });

    }

    document.querySelectorAll(".quick").forEach(botao => {

        botao.addEventListener("click", () => {

            this.prompt.value = botao.innerText;

            this.sendMessage();

        });

    });

}

    loadUser() {

        const dados = Storage.get("kenia-avaliacao");

        if (!dados) return;

        const nome = document.getElementById("nomeUsuario");

        if (nome) {

            nome.innerHTML = `Olá, <strong>${dados.nome}</strong> 👋`;

        }

    }

    async sendMessage() {

        const texto = this.prompt.value.trim();

        if (texto === "") return;

        this.prompt.value = "";

        this.addUserMessage(texto);

        this.showTyping();

        this.send.disabled = true;

        try {

           const contexto = Storage.get("kenia-avaliacao") || {};

const resposta = await Gemini.ask(

    texto,

    this.history.slice(-CONFIG.MAX_HISTORY),

    contexto

);

            this.hideTyping();

            this.addAIMessage(resposta);

            this.saveHistory();

        }

        catch (erro) {

            console.error(erro);

            this.hideTyping();

            this.addAIMessage(

                "😥 Desculpe. Ocorreu um erro ao comunicar com a IA."

            );

        }

        this.send.disabled = false;

        this.prompt.focus();

        this.scrollBottom();

    }

    renderMessage(msg) {

        const agora = new Date();

        const hora = agora.toLocaleTimeString("pt-BR", {

            hour: "2-digit",

            minute: "2-digit"

        });

        const div = document.createElement("div");

        div.className = `message ${msg.role === "user" ? "user" : "ai"}`;

        div.innerHTML = `

            <div class="message-avatar">

                <img src="${msg.role === "user"
                    ? "imagens/logo.jpg"
                    : "imagens/kenia2.png"
                }">

            </div>

            <div class="bubble">

                <div class="bubble-header">

                    <h4>

                        ${msg.role === "user"
                            ? "Você"
                            : CONFIG.AI_NAME}

                    </h4>

                    <span class="time">

                        ${hora}

                    </span>

                </div>

                <p>

                    ${this.escapeHTML(msg.text).replace(/\n/g,"<br>")}

                </p>

            </div>

        `;

        this.messages.appendChild(div);

        this.scrollBottom();

    }

    addUserMessage(texto) {

        const msg = {

            role: "user",

            text: texto

        };

        this.history.push(msg);

        this.renderMessage(msg);

    }

    addAIMessage(texto) {

        const msg = {

            role: "assistant",

            text: texto

        };

        this.history.push(msg);

        this.renderMessage(msg);

    }

        showTyping() {

        if (this.typing) {

            this.typing.style.display = "flex";

            this.scrollBottom();

        }

    }

    hideTyping() {

        if (this.typing) {

            this.typing.style.display = "none";

        }

    }

    saveHistory() {

        Storage.save(

            "kenia-chat",

            this.history

        );

    }

    loadHistory() {

        const history = Storage.get("kenia-chat");

        if (!history) return;

        this.history = history;

        this.messages.innerHTML = "";

        history.forEach(msg => {

            this.renderMessage(msg);

        });

    }

    clearChat() {

        if (!confirm("Deseja apagar toda a conversa?"))

            return;

        this.history = [];

        Storage.remove("kenia-chat");

        this.messages.innerHTML = "";

        this.addAIMessage(

            "Olá! 👋\n\nSou a Kênia.\nComo posso ajudar você hoje?"

        );

    }

    scrollBottom() {

        if (!this.messages) return;

        this.messages.scrollTop =

            this.messages.scrollHeight;

    }

    escapeHTML(texto) {

        const div = document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;

    }


}
const chat = new Chat();