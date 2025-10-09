// Aguarda o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', (event) => {

    // Seleciona os elementos do HTML que vamos manipular
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    // --- Lógica para mostrar/ocultar o ícone de senha ---
    // Adiciona um "ouvinte" de evento de 'input' (disparado a cada tecla digitada no campo senha)
    password.addEventListener('input', function() {
        // Se o campo de senha tiver algum valor (comprimento > 0)
        if (password.value.length > 0) {
            // Mostra o ícone adicionando a classe 'is-visible' (definida no CSS)
            togglePassword.classList.add('is-visible');
        } else {
            // Esconde o ícone removendo a classe 'is-visible'
            togglePassword.classList.remove('is-visible');
        }
    });

    // --- Lógica para o clique no ícone de senha ---
    // Adiciona um "ouvinte" de evento de clique no ícone
    togglePassword.addEventListener('click', function () {
        // Verifica o tipo atual do campo de senha
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        // Altera o tipo do campo para 'text' (mostrar) ou 'password' (ocultar)
        password.setAttribute('type', type);
        
        // Alterna a classe do ícone para mudar de olho cortado para olho aberto e vice-versa
        this.classList.toggle('bi-eye-fill');
        this.classList.toggle('bi-eye-slash-fill');
    });

});