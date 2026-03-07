const app = document.getElementById("app")

document.getElementById("novoCliente").onclick = () => {
    app.innerHTML = "<h2>Cadastrar cliente</h2>"
}

document.getElementById("novoAgendamento").onclick = () => {
    app.innerHTML = "<h2>Novo agendamento</h2>"
}

document.getElementById("verAgenda").onclick = () => {
    app.innerHTML = "<h2>Agenda</h2>"
}
