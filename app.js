// Espera o DOM (Document Object Model) estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona o botão pelo seu ID
    const meuBotao = document.getElementById('meuBotao');

    // Seleciona o elemento onde a mensagem será exibida
    const mensagemDiv = document.getElementById('mensagem');

    // Adiciona um "ouvinte de evento" para o clique no botão
    meuBotao.addEventListener('click', function() {
        // Altera o conteúdo do elemento de mensagem
        mensagemDiv.textContent = 'O botão foi clicado com sucesso!';
        console.log('Botão clicado!'); // Mensagem para o console do navegador
    });

    console.log('Página carregada e app.js executado!');
});
