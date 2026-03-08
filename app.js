let servicos = [];
let profissionais = [];
let agendamentos = [];

function mostrarTela(tela) {

  document.getElementById("tela-agendar").style.display = "none";
  document.getElementById("tela-agendamentos").style.display = "none";
  document.getElementById("tela-config").style.display = "none";

  document.getElementById("tela-" + tela).style.display = "block";

}

function carregarDados(){

  servicos = JSON.parse(localStorage.getItem("servicos")) || [];
  profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
  agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  atualizarSelects();
  listarAgendamentos();
  listarServicos();
  listarProfissionais();

}

function salvarDados(){

  localStorage.setItem("servicos", JSON.stringify(servicos));
  localStorage.setItem("profissionais", JSON.stringify(profissionais));
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

}

function atualizarSelects(){

  const selectServico = document.getElementById("servico");
  const selectProf = document.getElementById("profissional");

  if(!selectServico || !selectProf) return;

  selectServico.innerHTML = "";
  selectProf.innerHTML = "";

  servicos.forEach((s,i)=>{
    selectServico.innerHTML += `<option value="${i}">${s.nome}</option>`;
  });

  profissionais.forEach((p,i)=>{
    selectProf.innerHTML += `<option value="${i}">${p.nome}</option>`;
  });

}

function agendar(){

  const cliente = document.getElementById("cliente").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const data = document.getElementById("data").value;
  const servicoIndex = document.getElementById("servico").value;
  const profIndex = document.getElementById("profissional").value;

  const agendamento = {
    cliente,
    whatsapp,
    data,
    servico: servicos[servicoIndex].nome,
    profissional: profissionais[profIndex].nome
  };

  agendamentos.push(agendamento);

  salvarDados();
  listarAgendamentos();

  alert("Agendado com sucesso");

}

function listarAgendamentos(){

  const lista = document.getElementById("listaAgendamentos");
  if(!lista) return;

  lista.innerHTML = "";

  agendamentos.forEach(a=>{
    lista.innerHTML += `
      <div class="card">
      <b>${a.cliente}</b><br>
      ${a.servico}<br>
      ${a.profissional}<br>
      ${a.data}
      </div>
    `;
  });

}

function adicionarServico(){

  const nome = document.getElementById("novoServico").value;
  const duracao = document.getElementById("duracaoServico").value;

  servicos.push({nome,duracao});

  salvarDados();
  listarServicos();
  atualizarSelects();

}

function listarServicos(){

  const lista = document.getElementById("listaServicos");
  if(!lista) return;

  lista.innerHTML = "";

  servicos.forEach((s,i)=>{
    lista.innerHTML += `
    <div class="card">
      ${s.nome} (${s.duracao} min)
      <button onclick="removerServico(${i})">Excluir</button>
    </div>
    `;
  });

}

function removerServico(i){

  servicos.splice(i,1);
  salvarDados();
  listarServicos();
  atualizarSelects();

}

function adicionarProfissional(){

  const nome = document.getElementById("novoProfissional").value;

  profissionais.push({nome});

  salvarDados();
  listarProfissionais();
  atualizarSelects();

}

function listarProfissionais(){

  const lista = document.getElementById("listaProfissionais");
  if(!lista) return;

  lista.innerHTML = "";

  profissionais.forEach((p,i)=>{
    lista.innerHTML += `
    <div class="card">
      ${p.nome}
      <button onclick="removerProfissional(${i})">Excluir</button>
    </div>
    `;
  });

}

function removerProfissional(i){

  profissionais.splice(i,1);
  salvarDados();
  listarProfissionais();
  atualizarSelects();

}

window.onload = carregarDados;
