// ----- Simulação de Banco de Dados (localStorage) -----
// Em um aplicativo real, você usaria um backend e um banco de dados.
// localStorage é apenas para demonstração no navegador.

let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
let prestadores = JSON.parse(localStorage.getItem('prestadores')) || [];
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

function salvarDados() {
    localStorage.setItem('servicos', JSON.stringify(servicos));
    localStorage.setItem('prestadores', JSON.stringify(prestadores));
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// ----- Funções de Configuração -----

// --- Serviços ---
function renderizarServicos() {
    const listaServicosDiv = document.getElementById('lista-servicos');
    listaServicosDiv.innerHTML = ''; // Limpa a lista atual

    if (servicos.length === 0) {
        listaServicosDiv.innerHTML = '<p>Sem serviços cadastrados. Adicione um abaixo.</p>';
        return;
    }

    servicos.forEach((servico, index) => {
        const servicoDiv = document.createElement('div');
        servicoDiv.innerHTML = `
            <span>${servico.nome} - R$ ${servico.preco.toFixed(2)} (${servico.duracao} min)</span>
            <div class="item-acoes">
                <button onclick="editarServico(${index})">Editar</button>
                <button onclick="removerServico(${index})" class="delete-button">Remover</button>
            </div>
        `;
        listaServicosDiv.appendChild(servicoDiv);
    });
}

function adicionarOuAtualizarServico() {
    const idServicoEditando = document.getElementById('id-servico-editando').value;
    const nomeServico = document.getElementById('nome-servico').value.trim();
    const precoServico = parseFloat(document.getElementById('preco-servico').value);
    const duracaoServico = parseInt(document.getElementById('duracao-servico').value);

    if (!nomeServico || isNaN(precoServico) || isNaN(duracaoServico)) {
        alert('Por favor, preencha todos os campos do serviço corretamente.');
        return;
    }

    const novoServico = { nome: nomeServico, preco: precoServico, duracao: duracaoServico };

    if (idServicoEditando) {
        // Atualizar serviço existente
        servicos[parseInt(idServicoEditando)] = novoServico;
        alert('Serviço atualizado com sucesso!');
    } else {
        // Adicionar novo serviço
        servicos.push(novoServico);
        alert('Serviço adicionado com sucesso!');
    }

    limparFormularioServico();
    salvarDados();
    renderizarServicos();
    popularSelects(); // Atualiza os selects de agendamento
}

function editarServico(index) {
    const servico = servicos[index];
    document.getElementById('id-servico-editando').value = index;
    document.getElementById('nome-servico').value = servico.nome;
    document.getElementById('preco-servico').value = servico.preco;
    document.getElementById('duracao-servico').value = servico.duracao;

    document.querySelector('#configuracoes .form-add-edit button[onclick="adicionarOuAtualizarServico()"]').textContent = 'Atualizar Serviço';
    document.querySelector('#configuracoes .form-add-edit button[onclick="cancelarEdicaoServico()"]').style.display = 'inline-block';
}

function removerServico(index) {
    if (confirm('Tem certeza que deseja remover este serviço?')) {
        servicos.splice(index, 1);
        salvarDados();
        renderizarServicos();
        popularSelects();
    }
}

function cancelarEdicaoServico() {
    limparFormularioServico();
    document.querySelector('#configuracoes .form-add-edit button[onclick="adicionarOuAtualizarServico()"]').textContent = 'Salvar Serviço';
    document.querySelector('#configuracoes .form-add-edit button[onclick="cancelarEdicaoServico()"]').style.display = 'none';
}

function limparFormularioServico() {
    document.getElementById('id-servico-editando').value = '';
    document.getElementById('nome-servico').value = '';
    document.getElementById('preco-servico').value = '';
    document.getElementById('duracao-servico').value = '';
    document.querySelector('#configuracoes .form-add-edit button[onclick="adicionarOuAtualizarServico()"]').textContent = 'Salvar Serviço';
    document.querySelector('#configuracoes .form-add-edit button[onclick="cancelarEdicaoServico()"]').style.display = 'none';
}

// --- Prestadores ---
function renderizarPrestadores() {
    const listaPrestadoresDiv = document.getElementById('lista-prestadores');
    listaPrestadoresDiv.innerHTML = '';

    if (prestadores.length === 0) {
        listaPrestadoresDiv.innerHTML = '<p>Sem prestadores cadastrados. Adicione um abaixo.</p>';
        return;
    }

    prestadores.forEach((prestador, index) => {
        const prestadorDiv = document.createElement('div');
        prestadorDiv.innerHTML = `
            <span>${prestador.nome} (${prestador.contato})</span>
            <div class="item-acoes">
                <button onclick="editarPrestador(${index})">Editar</button>
                <button onclick="removerPrestador(${index})" class="delete-button">Remover</button>
            </div>
        `;
        listaPrestadoresDiv.appendChild(prestadorDiv);
    });
}

function adicionarOuAtualizarPrestador() {
    const idPrestadorEditando = document.getElementById('id-prestador-editando').value;
    const nomePrestador = document.getElementById('nome-prestador').value.trim();
    const contatoPrestador = document.getElementById('contato-prestador').value.trim();

    if (!nomePrestador || !contatoPrestador) {
        alert('Por favor, preencha nome e contato do prestador.');
        return;
    }

    const novoPrestador = { nome: nomePrestador, contato: contatoPrestador };

    if (idPrestadorEditando) {
        prestadores[parseInt(idPrestadorEditando)] = novoPrestador;
        alert('Prestador atualizado com sucesso!');
    } else {
        prestadores.push(novoPrestador);
        alert('Prestador adicionado com sucesso!');
    }

    limparFormularioPrestador();
    salvarDados();
    renderizarPrestadores();
    popularSelects();
}

function editarPrestador(index) {
    const prestador = prestadores[index];
    document.getElementById('id-prestador-editando').value = index;
    document.getElementById('nome-prestador').value = prestador.nome;
    document.getElementById('contato-prestador').value = prestador.contato;

    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="adicionarOuAtualizarPrestador()"]').textContent = 'Atualizar Prestador';
    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="cancelarEdicaoPrestador()"]').style.display = 'inline-block';
}

function removerPrestador(index) {
    if (confirm('Tem certeza que deseja remover este prestador?')) {
        prestadores.splice(index, 1);
        salvarDados();
        renderizarPrestadores();
        popularSelects();
    }
}

function cancelarEdicaoPrestador() {
    limparFormularioPrestador();
    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="adicionarOuAtualizarPrestador()"]').textContent = 'Salvar Prestador';
    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="cancelarEdicaoPrestador()"]').style.display = 'none';
}

function limparFormularioPrestador() {
    document.getElementById('id-prestador-editando').value = '';
    document.getElementById('nome-prestador').value = '';
    document.getElementById('contato-prestador').value = '';
    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="adicionarOuAtualizarPrestador()"]').textContent = 'Salvar Prestador';
    document.querySelector('#configuracoes #lista-prestadores + div button[onclick="cancelarEdicaoPrestador()"]').style.display = 'none';
}

// --- Clientes ---
function renderizarClientes() {
    const listaClientesDiv = document.getElementById('lista-clientes');
    listaClientesDiv.innerHTML = '';

    if (clientes.length === 0) {
        listaClientesDiv.innerHTML = '<p>Sem clientes cadastrados. Adicione um abaixo.</p>';
        return;
    }

    clientes.forEach((cliente, index) => {
        const clienteDiv = document.createElement('div');
        clienteDiv.innerHTML = `
            <span>${cliente.nome} (${cliente.telefone || cliente.email})</span>
            <div class="item-acoes">
                <button onclick="editarCliente(${index})">Editar</button>
                <button onclick="removerCliente(${index})" class="delete-button">Remover</button>
            </div>
        `;
        listaClientesDiv.appendChild(clienteDiv);
    });
}

function adicionarOuAtualizarCliente() {
    const idClienteEditando = document.getElementById('id-cliente-editando').value;
    const nomeCliente = document.getElementById('nome-cliente').value.trim();
    const telefoneCliente = document.getElementById('telefone-cliente').value.trim();
    const emailCliente = document.getElementById('email-cliente').value.trim();

    if (!nomeCliente || (!telefoneCliente && !emailCliente)) {
        alert('Por favor, preencha o nome do cliente e pelo menos um contato (telefone ou email).');
        return;
    }

    const novoCliente = { nome: nomeCliente, telefone: telefoneCliente, email: emailCliente };

    if (idClienteEditando) {
        clientes[parseInt(idClienteEditando)] = novoCliente;
        alert('Cliente atualizado com sucesso!');
    } else {
        clientes.push(novoCliente);
        alert('Cliente adicionado com sucesso!');
    }

    limparFormularioCliente();
    salvarDados();
    renderizarClientes();
    popularSelects();
}

function editarCliente(index) {
    const cliente = clientes[index];
    document.getElementById('id-cliente-editando').value = index;
    document.getElementById('nome-cliente').value = cliente.nome;
    document.getElementById('telefone-cliente').value = cliente.telefone;
    document.getElementById('email-cliente').value = cliente.email;

    document.querySelector('#configuracoes #lista-clientes + div button[onclick="adicionarOuAtualizarCliente()"]').textContent = 'Atualizar Cliente';
    document.querySelector('#configuracoes #lista-clientes + div button[onclick="cancelarEdicaoCliente()"]').style.display = 'inline-block';
}

function removerCliente(index) {
    if (confirm('Tem certeza que deseja remover este cliente?')) {
        clientes.splice(index, 1);
        salvarDados();
        renderizarClientes();
        popularSelects();
    }
}

function cancelarEdicaoCliente() {
    limparFormularioCliente();
    document.querySelector('#configuracoes #lista-clientes + div button[onclick="adicionarOuAtualizarCliente()"]').textContent = 'Salvar Cliente';
    document.querySelector('#configuracoes #lista-clientes + div button[onclick="cancelarEdicaoCliente()"]').style.display = 'none';
}

function limparFormularioCliente() {
    document.getElementById('id-cliente-editando').value = '';
    document.getElementById('nome-cliente').value = '';
    document.getElementById('telefone-cliente').value = '';
    document.getElementById('email-cliente').value = '';
    document.querySelector('#configuracoes #lista-clientes + div button[onclick="adicionarOuAtualizarCliente()"]').textContent = 'Salvar Cliente';
    document.querySelector('#configuracoes #lista-clientes + div button[onclick="cancelarEdicaoCliente()"]').style.display = 'none';
}


// ----- Funções de Agendamento -----

function popularSelects() {
    const clienteSelect = document.getElementById('cliente-select');
    const servicoSelect = document.getElementById('servico-select');
    const prestadorSelect = document.getElementById('prestador-select');

    // Limpa opções atuais (exceto a primeira opção "Selecione...")
    clienteSelect.innerHTML = '<option value="">Selecione um Cliente</option>';
    servicoSelect.innerHTML = '<option value="">Selecione um Serviço</option>';
    prestadorSelect.innerHTML = '<option value="">Selecione um Prestador</option>';

    // Popula com os dados atuais
    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index; // Armazena o índice do cliente
        option.textContent = `${cliente.nome} (${cliente.telefone || cliente.email})`;
        clienteSelect.appendChild(option);
    });

    servicos.forEach((servico, index) => {
        const option = document.createElement('option');
        option.value = index; // Armazena o índice do serviço
        option.textContent = `${servico.nome} (R$ ${servico.preco.toFixed(2)})`;
        servicoSelect.appendChild(option);
    });

    prestadores.forEach((prestador, index) => {
        const option = document.createElement('option');
        option.value = index; // Armazena o índice do prestador
        option.textContent = prestador.nome;
        prestadorSelect.appendChild(option);
    });
}

function salvarAgendamento() {
    const clienteIndex = document.getElementById('cliente-select').value;
    const servicoIndex = document.getElementById('servico-select').value;
    const prestadorIndex = document.getElementById('prestador-select').value;
    const dataHora = document.getElementById('data-hora-agendamento').value;
    const observacoes = document.getElementById('observacoes-agendamento').value.trim();

    if (!clienteIndex || !servicoIndex || !prestadorIndex || !dataHora) {
        alert('Por favor, selecione Cliente, Serviço, Prestador e Data/Hora.');
        return;
    }

    const novoAgendamento = {
        id: Date.now(), // ID único simples para este exemplo
        clienteIndex: parseInt(clienteIndex),
        servicoIndex: parseInt(servicoIndex),
        prestadorIndex: parseInt(prestadorIndex),
        dataHora: new Date(dataHora).toISOString(), // Armazena em formato ISO
        observacoes: observacoes,
        status: 'confirmado' // Status inicial
    };

    agendamentos.push(novoAgendamento);
    salvarDados();
    renderizarAgendamentos();
    alert('Agendamento salvo com sucesso!');

    // --- SIMULAÇÃO DE ENVIO DE MENSAGENS ---
    // Em um aplicativo real, aqui você chamaria sua API de SMS/Email.
    enviarNotificacaoCliente(novoAgendamento);
    enviarNotificacaoPrestador(novoAgendamento);
    // --------------------------------------

    // Limpa o formulário de agendamento após salvar
    document.getElementById('cliente-select').value = '';
    document.getElementById('servico-select').value = '';
    document.getElementById('prestador-select').value = '';
    document.getElementById('data-hora-agendamento').value = '';
    document.getElementById('observacoes-agendamento').value = '';
}

function renderizarAgendamentos() {
    const agendamentosListUl = document.getElementById('agendamentos-list');
    agendamentosListUl.innerHTML = '';

    if (agendamentos.length === 0) {
        agendamentosListUl.innerHTML = '<li>Nenhum agendamento encontrado.</li>';
        return;
    }

    agendamentos.forEach((agendamento, index) => {
        const li = document.createElement('li');
        const cliente = clientes[agendamento.clienteIndex];
        const servico = servicos[agendamento.servicoIndex];
        const prestador = prestadores[agendamento.prestadorIndex];
        const dataHoraAgendamento = new Date(agendamento.dataHora);

        const statusClass = `status-${agendamento.status}`;

        li.innerHTML = `
            <div class="agendamento-detalhes">
                <p><strong>Cliente:</strong> ${cliente ? cliente.nome : 'Cliente não encontrado'}</p>
                <p><strong>Serviço:</strong> ${servico ? servico.nome : 'Serviço não encontrado'}</p>
                <p><strong>Prestador:</strong> ${prestador ? prestador.nome : 'Prestador não encontrado'}</p>
                <p><strong>Data/Hora:</strong> ${dataHoraAgendamento.toLocaleString('pt-BR')}</p>
                <p><strong>Observações:</strong> ${agendamento.observacoes || 'Nenhuma'}</p>
                <p><strong>Status:</strong> <span class="${statusClass}">${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}</span></p>
            </div>
            <div class="item-acoes">
                <button onclick="marcarComoConcluido(${index})">Concluído</button>
                <button onclick="cancelarAgendamento(${index})" class="delete-button">Cancelar</button>
            </div>
        `;
        agendamentosListUl.appendChild(li);
    });
}

function marcarComoConcluido(index) {
    if (confirm('Marcar este agendamento como concluído?')) {
        agendamentos[index].status = 'concluido';
        salvarDados();
        renderizarAgendamentos();
    }
}

function cancelarAgendamento(index) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        agendamentos[index].status = 'cancelado';
        salvarDados();
        renderizarAgendamentos();

        // --- SIMULAÇÃO DE ENVIO DE MENSAGEM DE CANCELAMENTO ---
        // Enviar notificação de cancelamento para cliente e prestador.
        alert('Simulando envio de mensagem de cancelamento...');
        // ---------------------------------------------------
    }
}


// --- Funções de Simulação de Notificação ---
function enviarNotificacaoCliente(agendamento) {
    const cliente = clientes[agendamento.clienteIndex];
    const servico = servicos[agendamento.servicoIndex];
    const prestador = prestadores[agendamento.prestadorIndex];
    const dataHoraAgendamento = new Date(agendamento.dataHora).toLocaleString('pt-BR');

    const mensagem = `Olá ${cliente.nome}! Seu agendamento para ${servico.nome} com ${prestador.nome} está confirmado para ${dataHoraAgendamento}.`;

    console.log(`--- Notificação para Cliente: ${cliente.nome} ---`);
    if (cliente.telefone) {
        console.log(`Enviando SMS para ${cliente.telefone}: "${mensagem}"`);
    }
    if (cliente.email) {
        console.log(`Enviando Email para ${cliente.email}: "${mensagem}"`);
    }
    console.log('--------------------------------------------');
    alert(`Simulando envio de confirmação para o cliente: ${cliente.nome}`);
}

function enviarNotificacaoPrestador(agendamento) {
    const cliente = clientes[agendamento.clienteIndex];
    const servico = servicos[agendamento.servicoIndex];
    const prestador = prestadores[agendamento.prestadorIndex];
    const dataHoraAgendamento = new Date(agendamento.dataHora).toLocaleString('pt-BR');

    const mensagem = `Olá ${prestador.nome}! Você tem um novo agendamento para ${servico.nome} com ${cliente.nome} em ${dataHoraAgendamento}.`;

    console.log(`--- Notificação para Prestador: ${prestador.nome} ---`);
    console.log(`Enviando mensagem para ${prestador.contato}: "${mensagem}"`);
    console.log('----------------------------------------------------');
    alert(`Simulando envio de notificação para o prestador: ${prestador.nome}`);
}


// ----- Inicialização -----
document.addEventListener('DOMContentLoaded', () => {
    renderizarServicos();
    renderizarPrestadores();
    renderizarClientes();
    popularSelects();
    renderizarAgendamentos();
});
