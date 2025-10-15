//1. IMPORTAÇÕES: Importando funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Linha 5: Adicionado para debug
console.log("✅ Script.js carregado com sucesso!");

// 2. CONFIGURAÇÕES DO FIREBASE - Substitua pelos seus dados
//========================================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyA_XUEOMSAr1Q7SCNfT-Qa55O-OTWs615A",
  authDomain: "sentinela-cnc.firebaseapp.com",
  projectId: "sentinela-cnc",
  storageBucket: "sentinela-cnc.firebasestorage.app",
  messagingSenderId: "605484478113",
  appId: "1:605484478113:web:ebe382614377abf2388ae0"
};
//========================================================================================================

// 3. INICIALIZAÇÃO DO FIREBASE E SERVIÇOS DE AUTENTICAÇÃO
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Linha 25: Adicionado para debug
console.log("🔥 Firebase Auth inicializado:", auth);


// 4. LÓGICA DA PÁGINA DE LOGIN: Aguardar o carregamento do HTML
document.addEventListener('DOMContentLoaded', () => {

    // Linha 31: Adicionado para debug
     console.log("📄 DOM completamente carregado. Os eventos de clique e digitação estão ativos.");

    // Selecionando os elementos do formulário
    const loginForm = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const createAccountLink = document.querySelector('#createAccountLink');
    const messageDiv = document.querySelector('#message');
    //ADICIONADO - Selecionando o novo link
    const forgotPasswordLink = document.querySelector('#forgotPasswordLink');


    // Função para exibir mensagens ao usuário
    const showMessage = (message, type = 'danger') => {
        messageDiv.textContent = message;
        messageDiv.className = `alert alert-${type}`; //Altera a classe para cor de sucesso ou erro
    };

    // Evento de SBMISSÃO do formulário de login
    loginForm.addEventListener('submit' ,(e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const email = emailInput.value;
        const password = passwordInput.value;

        //Usando a função do Firebase para fazer login
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            showMessage(`Login bem-sucedido! Bem-vindo, ${user.email}`, 'success');
            // Aqui você redirecionaria o usuário para o dachboard ou página principal
            // window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            // Trata os erros de login
            showMessage( 'E-mail ou senha inválidos. Tente novamente.');
            console.error("Erro de login:", error.message);
        });
    });

    // Evento de CLIQUE no link "Criar Conta"
    createAccountLink.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || password.length < 6) {
            showMessage('Por favor, preencha o e-mail válido e uma senha com no mínimo 6 caracteres para criar uma conta.');
            return;
        }

        // Usando a função do Firebase para criar um novo usuário
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                showMessage(`Conta criada com sucesso para ${user.email}!`, 'Você já pode fazer o login.', 'success');
        })
        .catch((error) => {
            //trata os erros de criação de conta
            if (error.code === 'auth/email-already-in-use') {
                showMessage('Este e-mail já está em uso. Tente fazer o login ou use outro e-mail.');
            }else {
                showMessage('Ocorreu um erro ao criar a conta. Tente novamente.');
            }
            console.error("Erro ao criar conta:", error.message);
        });
    });
        
    //ADICIONADO - Evento de CLIQUE no link "Esqueci minha senha"
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link
        const email = emailInput.value;

        if (!email) { 
            showMessage('Por favor, digite seu e-mail no campo acima para redefinir a senha.');
            return;
        }

        // Usando a função do Firebase para enviar o e-mail de redefinição de senha
        sendPasswordResetEmail(auth, email)
            .then(() => {
                showMessage('Link para redefinição de senha enviado para o seu e-mail!', 'success');
            })
            .catch((error) => {
                showMessage('Não foi possível envivar o link. Verifique se o e-mail digitado está correto e cadastrado .');
                console.error("Erro ao enviar e-mail de redefinição de senha:", error.message);
            });
    });

        // --- Lógica para mostrar/ocultar o ícone de senha ---
    const togglePassword = document.querySelector('#togglePassword');
    const passwordField = document.querySelector('#password');

    passwordField.addEventListener('input', function() {
        togglePassword.classList.toggle('is-visible', passwordField.value.length > 0);
    });

    // --- Lógica para o clique no ícone de senha ---
    // Adiciona um "ouvinte" de evento de clique no ícone
    togglePassword.addEventListener('click', function () {
        // Verifica o tipo atual do campo de senha
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        // Altera o tipo do campo para 'text' (mostrar) ou 'password' (ocultar)
        passwordField.setAttribute('type', type);
        // Alterna a classe do ícone para mudar de olho cortado para olho aberto e vice-versa
        this.classList.toggle('bi-eye-fill');
        this.classList.toggle('bi-eye-slash-fill');
    });

});
