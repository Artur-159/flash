importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

if (navigator.serviceWorker) {
  firebase.initializeApp({
    apiKey: "AIzaSyAWBEkjIOjMq5nRs7SXl0PpTIIBlqM2Tiw",
    authDomain: "flash-usercabinet.firebaseapp.com",
    projectId: "flash-usercabinet",
    storageBucket: "flash-usercabinet.firebasestorage.app",
    messagingSenderId: "122709356202",
    appId: "1:122709356202:web:9a73f9dd281d94a1752ad3",
  });

  const messaging = firebase.messaging();
  if (messaging) {
    messaging.onBackgroundMessage((payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  }
}
