importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;

firebase.initializeApp({
  apiKey: "Your key",
  authDomain: "*Your Firebase Porject Id*.firebaseapp.com", 
  projectId: "Your Firebase Porject Id",
  storageBucket: "*Your Firebase Porject Id*.appspot.com",
  messagingSenderId:"Your message Sender Id",
  appId: "Your Firebase App Id",
  measurementId: "Your measurementId",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("New Message");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  console.log("notification received: ", event);
});
