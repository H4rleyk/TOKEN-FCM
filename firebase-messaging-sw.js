/**
 * Service Worker para Firebase Cloud Messaging (FCM)
 * IMPORTANTE: Este arquivo deve estar acessível no caminho /TOKEN-FCM/firebase-messaging-sw.js
 */

// ============================================
// VERSÃO COMPATÍVEL (Firebase v9 compat mode)
// ============================================

// Importa a versão "compat" do Firebase v9 que mantém a API antiga
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2_VAJZir5DpatOgfByp7oEzfM2VEbl-g",
  authDomain: "aqui-na-feira-4afd5.firebaseapp.com",
  projectId: "aqui-na-feira-4afd5",
  storageBucket: "aqui-na-feira-4afd5.firebasestorage.app",
  messagingSenderId: "997997717655",
  appId: "1:997997717655:web:476e8272da6d65ddf7a1d2",
  measurementId: "G-ZFJBGCEZVD"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Obtém a instância do Messaging
const messaging = firebase.messaging();

// ============================================
// Manipula mensagens em segundo plano
// ============================================
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Mensagem recebida em segundo plano:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nova Notificação';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova mensagem',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/badge-icon.png', // Ícone pequeno (opcional)
    data: payload.data || {}, // Dados customizados
    tag: payload.data?.tag || 'default-tag', // Agrupa notificações
    requireInteraction: false, // true = notificação fica até usuário interagir
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ============================================
// Manipula cliques na notificação
// ============================================
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificação clicada:', event.notification);
  
  event.notification.close();
  
  // Abre uma URL específica ao clicar (opcional)
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUnmanaged: true })
      .then((clientList) => {
        // Verifica se já existe uma janela aberta com a URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Se não houver, abre uma nova janela
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ============================================
// Log de instalação (opcional - debug)
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker ativado');
  event.waitUntil(clients.claim());
});