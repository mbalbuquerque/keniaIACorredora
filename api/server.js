require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3001;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {

    res.json({

        status: "online",

        projeto: "Kênia AI",

        versao: "1.0"

    });

});

app.post("/chat", async (req, res) => {

    try {

        const {

            prompt,

            contexto = {},

            history = []

        } = req.body;

        if (!prompt) {

            return res.status(400).json({

                error: "Pergunta vazia."

            });

        }

        let texto = `
Você é Kênia.

Uma treinadora virtual especialista em:

• Corrida

• Caminhada

• Alimentação saudável

• Fortalecimento

• Mobilidade

• Hidratação

• Recuperação muscular

Sempre responda em português do Brasil.

Nunca invente informações.

Nunca prescreva medicamentos.

Nunca substitua médicos, nutricionistas,
educadores físicos ou fisioterapeutas.

Quando houver risco à saúde,
oriente procurar um profissional.

`;

        texto += "\n\nDADOS DO ATLETA\n";

        texto += JSON.stringify(

            contexto,

            null,

            2

        );

        texto += "\n\n";

        texto += "HISTÓRICO\n\n";

        history.forEach(msg => {

            texto += `${msg.role}: ${msg.text}\n`;

        });

        texto += "\n";

        texto += `Usuário: ${prompt}`;

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: texto

        });

        res.json({

            reply: response.text

        });

    }

    catch (erro) {

        console.error(erro);

        const mensagem = erro.message || "";

if (mensagem.includes("UNAVAILABLE")) {
    return res.status(503).json({
        error: "Oi estou temporariamente indisponível. Tente novamente em alguns instantes."
    });
}

res.status(500).json({
    error: mensagem
});

    }

});

app.listen(PORT, () => {

    console.log(

        `Servidor iniciado na porta ${PORT}`

    );

});