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
function addServico(){

let nome = document.getElementById("novoServico").value
let duracao = document.getElementById("duracaoServico").value

servicos.push({

nome:nome,
duracao:Number(duracao)

})

  function addProf(){

let nome = document.getElementById("novoProf").value

profissionais.push({

nome:nome

})

salvarDados()
atualizarConfig()

}
function addProf(){

let nome = document.getElementById("novoProf").value

profissionais.push({

nome:nome

})

salvarDados()
atualizarConfig()

}
  function gerarHorarios(){

let select = document.getElementById("hora")

select.innerHTML=""

let inicio = 9
let fim = 19

for(let h=inicio;h<fim;h++){

for(let m of ["00","30"]){

let hora = h.toString().padStart(2,"0")+":"+m

let ocupado = agendamentos.find(a=>a.hora==hora)

if(!ocupado){

select.innerHTML+=`<option>${hora}</option>`

}

}

}

}
  function agendar(){

let cliente = document.getElementById("cliente").value
let servico = document.getElementById("servico").value
let profissional = document.getElementById("profissional").value
let data = document.getElementById("data").value
let hora = document.getElementById("hora").value

agendamentos.push({

cliente,
servico,
profissional,
data,
hora

})

salvarDados()

alert("Agendamento criado")

}
  function atualizarAgendamentos(){

let lista = document.getElementById("listaAgendamentos")

lista.innerHTML=""

agendamentos.forEach(a=>{

lista.innerHTML+=`

<div class="card">

<strong>${a.hora}</strong><br>

${a.cliente}<br>

${a.servico} - ${a.profissional}

</div>

`

})

}
window.abrirAgendar = abrirAgendar
window.abrirAgendamentos = abrirAgendamentos
window.abrirConfiguracoes = abrirConfiguracoes
