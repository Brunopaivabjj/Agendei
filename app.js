function salvarDados(){

localStorage.setItem("servicos",JSON.stringify(servicos))
localStorage.setItem("profissionais",JSON.stringify(profissionais))
localStorage.setItem("agendamentos",JSON.stringify(agendamentos))

}

function carregarDados(){

servicos = JSON.parse(localStorage.getItem("servicos")) || []
profissionais = JSON.parse(localStorage.getItem("profissionais")) || []
agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || []

}

const app = document.getElementById("app")

function abrirAgendar(){

app.innerHTML = `

<h2>Agendar</h2>

<p>Aqui iremos criar um novo agendamento.</p>

`

}

function abrirAgendamentos(){

app.innerHTML = `

<h2>Agendei</h2>

<p>Aqui aparecerão os agendamentos feitos.</p>

`

}

function abrirConfiguracoes(){

app.innerHTML = `

<h2>Configurações</h2>

<p>Aqui você irá cadastrar serviços e profissionais.</p>

`

}

window.abrirAgendar = abrirAgendar
window.abrirAgendamentos = abrirAgendamentos
window.abrirConfiguracoes = abrirConfiguracoes
