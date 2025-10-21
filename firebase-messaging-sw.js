importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA2_VAJZir5DpatOgfByp7oEzfM2VEbl-g",
  authDomain: "aqui-na-feira-4afd5.firebaseapp.com",
  projectId: "aqui-na-feira-4afd5",
  storageBucket: "aqui-na-feira-4afd5.firebasestorage.app",
  messagingSenderId: "997997717655",
  appId: "1:997997717655:web:476e8272da6d65ddf7a1d2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensagem recebida:', payload);
  
  const title = payload.notification?.title || 'Notificação';
  const options = {
    body: payload.notification?.body || 'Nova mensagem',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(title, options);
});