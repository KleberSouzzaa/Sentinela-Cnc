// Importando funções de autenticação do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Suas credenciais do Firebase (as mesmas do script.js do login)
const firebaseConfig = {
  apiKey: "AIzaSyA_XUEOMSAr1Q7SCNfT-Qa55O-OTWs615A",
  authDomain: "sentinela-cnc.firebaseapp.com",
  projectId: "sentinela-cnc",
  storageBucket: "sentinela-cnc.firebasestorage.app",
  messagingSenderId: "605484478113",
  appId: "1:605484478113:web:ebe382614377abf2388ae0"
};

// Inicializando o Firebase e o serviço de autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Selecionando elementos da página
const logoutButton = document.getElementById('logoutButton');
const userEmailSpan = document.getElementById('userEmail');

// ==================================================================================
// GUARDA DE AUTENTICAÇÃO: Protegendo a página
// ==================================================================================
// A função onAuthStateChanged é um "ouvinte" que verifica o status do login em tempo real
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Se o usuário ESTÁ logado:
        console.log('Usuário logado:', user.email);
        // Mostra o e-mail do usuário no cabeçalho
        userEmailSpan.textContent = user.email;
    } else {
        // Se o usuário NÃO ESTÁ logado:
        console.log('Nenhum usuário logado. Redirecionando para a página de login...');
        // Redireciona o usuário de volta para a página de login
        window.location.href = 'index.html';
    }
});

// ==================================================================================
// FUNÇÃO DE LOGOUT: Deslogando o usuário
// ==================================================================================
//Adiciona um evento de clique ao botão de "Sair"
logoutButton.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link

    signOut(auth).then(() => {
        // Logout bem-sucedido, redireciona para a página de login
        console.log('Usuário deslogado com sucesso.');
        // O "ouvinte" onAuthStateChanged vai detectar a mudança e redirecionar para o login
    }).catch((error) => {
        // Ocorreu um erro durante o logout
        console.error('Erro ao fazer logout:', error);
    });
});