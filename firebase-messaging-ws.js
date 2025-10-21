/**
 * Arquivo Service Worker para o Firebase Cloud Messaging (FCM).
 * Este arquivo DEVE estar na raiz do seu site para que o FCM funcione corretamente.
 */

// Importa os módulos do Firebase necessários
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js');

// Configuração do seu projeto Firebase (SUBSTITUA ESTE OBJETO!)
const firebaseConfig = {
  // ATENÇÃO: COPIE AQUI O JSON COMPLETO DA SUA CONFIGURAÇÃO
          apiKey: "AIzaSyA2_VAJZir5DpatOgfByp7oEzfM2VEbl-g",
          authDomain: "aqui-na-feira-4afd5.firebaseapp.com",
          projectId: "aqui-na-feira-4afd5",
          storageBucket: "aqui-na-feira-4afd5.firebasestorage.app",
          messagingSenderId: "997997717655",
          appId: "1:997997717655:web:476e8272da6d65ddf7a1d2",
          measurementId: "G-ZFJBGCEZVD"
};

// Inicializa o Firebase no Service Worker
const app = firebase.initializeApp(firebaseConfig);

// Obtém a instância do Firebase Messaging
const messaging = firebase.messaging();
// ------------------------------------------------------------------
// Lógica de Notificação
// ------------------------------------------------------------------

// Trata a mensagem quando o app está em segundo plano (ou fechado)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem de segundo plano recebida', payload);
  
  // Customiza a notificação que será exibida ao usuário
  const notificationTitle = payload.notification.title || 'Nova Notificação';
  const notificationOptions = {
    body: payload.notification.body || 'Você tem uma nova mensagem.',
    icon: '/favicon.ico' // Use um ícone real para o seu app
    // Você pode adicionar mais opções aqui (badge, image, click_action, etc.)
  };

  // Exibe a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Trata cliques na notificação (opcional)
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificação clicada', event);
  // Você pode abrir uma URL específica aqui, se necessário.
  event.notification.close();
});
