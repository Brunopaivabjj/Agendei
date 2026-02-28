// 🔥 Firebase já configurado
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxyovmqjNYIzOYYDZZnduquiJQeK4UIgc",
  authDomain: "agendei-d721e.firebaseapp.com",
  projectId: "agendei-d721e",
  storageBucket: "agendei-d721e.firebasestorage.app",
  messagingSenderId: "525023801595",
  appId: "1:525023801595:web:71a6d72e986e6e9e30005e",
  measurementId: "G-YQP41N6MJ3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🌙 Dark Mode persistente
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

window.toggleDark = function() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// 🚪 Logout
window.logout = async function() {
  await signOut(auth);
  location.reload();
};

// 👩‍💼 Adicionar Funcionário
window.addFuncionario = async function() {
  const nome = document.getElementById("funcNome").value;
  const whatsapp = document.getElementById("funcWhatsapp").value;

  if (!nome) return alert("Digite o nome");

  await addDoc(collection(db, "funcionarios"), {
    nome,
    whatsapp,
    ativo: true
  });

  alert("Funcionário salvo");
  loadFuncionarios();
};

// 🗑️ Excluir Funcionário
window.deleteFuncionario = async function(id) {
  await deleteDoc(doc(db, "funcionarios", id));
  loadFuncionarios();
};

// 🔄 Carregar Funcionários
async function loadFuncionarios() {
  const container = document.getElementById("listaFuncionarios");
  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "funcionarios"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    container.innerHTML += `
      <div class="card">
        <strong>${data.nome}</strong><br>
        ${data.whatsapp || ""}
        <br><br>
        <button onclick="deleteFuncionario('${docSnap.id}')">Excluir</button>
      </div>
    `;
  });
}

window.loadFuncionarios = loadFuncionarios;

<hr style="margin:30px 0;">

<h3>Serviços</h3>

<input type="text" id="servNome" placeholder="Nome do serviço">
<input type="number" id="servValor" placeholder="Valor (R$)">
<input type="number" id="servDuracao" placeholder="Duração (minutos)">
<button onclick="addServico()">Adicionar Serviço</button>

<div id="listaServicos"></div>

// ============================
// SERVIÇOS
// ============================

import { updateDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// ➕ Adicionar Serviço
window.addServico = async function() {
  const nome = document.getElementById("servNome").value;
  const valor = parseFloat(document.getElementById("servValor").value);
  const duracao = parseInt(document.getElementById("servDuracao").value);

  if (!nome || !valor || !duracao) {
    alert("Preencha todos os campos");
    return;
  }

  await addDoc(collection(db, "servicos"), {
    nome,
    valor,
    duracao,
    ativo: true
  });

  document.getElementById("servNome").value = "";
  document.getElementById("servValor").value = "";
  document.getElementById("servDuracao").value = "";

  loadServicos();
};

// 🔄 Carregar Serviços
async function loadServicos() {
  const container = document.getElementById("listaServicos");
  if (!container) return;

  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "servicos"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    container.innerHTML += `
      <div class="card">
        <strong>${data.nome}</strong><br>
        Valor: R$ ${data.valor}<br>
        Duração: ${data.duracao} min<br>
        Status: ${data.ativo ? "Ativo" : "Inativo"}
        <br><br>
        <button onclick="toggleServico('${docSnap.id}', ${data.ativo})">
          ${data.ativo ? "Desativar" : "Ativar"}
        </button>
        <button onclick="editServico('${docSnap.id}', '${data.nome}', ${data.valor}, ${data.duracao})">
          Editar
        </button>
        <button onclick="deleteServico('${docSnap.id}')">
          Excluir
        </button>
      </div>
    `;
  });
}

window.loadServicos = loadServicos;

// 🗑️ Excluir Serviço
window.deleteServico = async function(id) {
  await deleteDoc(doc(db, "servicos", id));
  loadServicos();
};

// 🔁 Ativar / Desativar
window.toggleServico = async function(id, statusAtual) {
  await updateDoc(doc(db, "servicos", id), {
    ativo: !statusAtual
  });
  loadServicos();
};

// ✏️ Editar Serviço
window.editServico = function(id, nomeAtual, valorAtual, duracaoAtual) {

  const novoNome = prompt("Editar nome:", nomeAtual);
  if (!novoNome) return;

  const novoValor = prompt("Editar valor:", valorAtual);
  if (!novoValor) return;

  const novaDuracao = prompt("Editar duração (min):", duracaoAtual);
  if (!novaDuracao) return;

  updateDoc(doc(db, "servicos", id), {
    nome: novoNome,
    valor: parseFloat(novoValor),
    duracao: parseInt(novaDuracao)
  });

  loadServicos();
};

// 🔄 Auto carregar
setTimeout(() => {
  loadServicos();
}, 1500);
