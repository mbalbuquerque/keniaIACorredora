const dados = JSON.parse(

    localStorage.getItem("kenia-avaliacao")

);

if(!dados){

    window.location="avaliacao.html";

}

document.getElementById("nome").textContent =
dados.nome || "-";

document.getElementById("nivel").textContent =
dados.nivel || "-";

document.getElementById("objetivo").textContent =
dados.objetivo || "-";

document.getElementById("pace").textContent =
dados.pace || "-";

document.getElementById("distancia").textContent =
dados.distancia || "-";

document.getElementById("chatButton")

.addEventListener("click",()=>{

window.location="chat.html";

}); 