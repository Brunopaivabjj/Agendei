let servicos = []
let profissionais = []
let agendamentos = []

function mostrarTela(id){

document.querySelectorAll(".tela").forEach(t=>{

t.style.display="none"

})

document.getElementById(id).style.display="block"

}

function salvarDados(){

localStorage.setItem("servicos",JSON.stringify(servicos))
localStorage.setItem("profissionais",JSON.stringify(profissionais))
localStorage.setItem("agendamentos",JSON.stringify(agendamentos))

}

function carregarDados(){

servicos = JSON.parse(localStorage.getItem("servicos")) || []
profissionais = JSON.parse(localStorage.getItem("profissionais")) || []
agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || []

listarServicos()
listarProfissionais()
listarAgendamentos()
atualizarSelects()
gerarHorarios()

}

function atualizarSelects(){

let s = document.getElementById("servico")
let p = document.getElementById("profissional")

s.innerHTML=""
p.innerHTML=""

servicos.forEach((serv,i)=>{

s.innerHTML += `<option value="${i}">${serv.nome}</option>`

})

profissionais.forEach((prof,i)=>{

p.innerHTML += `<option value="${i}">${prof.nome}</option>`

})

}

function gerarHorarios(){

let select = document.getElementById("hora")

select.innerHTML=""

let inicio = 9
let fim = 18

for(let h=inicio;h<fim;h++){

for(let m of ["00","30"]){

let hora = h.toString().padStart(2,"0")+":"+m

let ocupado = agendamentos.find(a=>a.hora==hora)

if(!ocupado){

select.innerHTML += `<option>${hora}</option>`

}

}

}

}

function agendar(){

let cliente = document.getElementById("cliente").value
let whatsapp = document.getElementById("whatsapp").value
let data = document.getElementById("data").value
let hora = document.getElementById("hora").value

let servico = servicos[document.getElementById("servico").value]
let profissional = profissionais[document.getElementById("profissional").value]

let agendamento = {

cliente,
whatsapp,
data,
hora,
servico:servico.nome,
profissional:profissional.nome

}

agendamentos.push(agendamento)

salvarDados()

listarAgendamentos()

gerarHorarios()

alert("Agendado com sucesso")

}

function listarAgendamentos(){

let lista = document.getElementById("listaAgendamentos")

lista.innerHTML=""

agendamentos.forEach(a=>{

lista.innerHTML +=

`<div class="card">

<b>${a.cliente}</b><br>

${a.servico}<br>

${a.profissional}<br>

${a.data} ${a.hora}

</div>`

})

}

function adicionarServico(){

let nome = document.getElementById("novoServico").value
let duracao = document.getElementById("duracaoServico").value

servicos.push({nome,duracao})

salvarDados()

listarServicos()

atualizarSelects()

}

function listarServicos(){

let lista = document.getElementById("listaServicos")

lista.innerHTML=""

servicos.forEach((s,i)=>{

lista.innerHTML +=

`<div class="card">

${s.nome} (${s.duracao}min)

<button onclick="removerServico(${i})">Excluir</button>

</div>`

})

}

function removerServico(i){

servicos.splice(i,1)

salvarDados()

listarServicos()

atualizarSelects()

}

function adicionarProfissional(){

let nome = document.getElementById("novoProfissional").value

profissionais.push({nome})

salvarDados()

listarProfissionais()

atualizarSelects()

}

function listarProfissionais(){

let lista = document.getElementById("listaProfissionais")

lista.innerHTML=""

profissionais.forEach((p,i)=>{

lista.innerHTML +=

`<div class="card">

${p.nome}

<button onclick="removerProfissional(${i})">Excluir</button>

</div>`

})

}

function removerProfissional(i){

profissionais.splice(i,1)

salvarDados()

listarProfissionais()

atualizarSelects()

}

window.onload = carregarDados
