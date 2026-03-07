import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyAxyovmqjNYIzOYYDZZnduquiJQeK4UIgc",
    authDomain: "agendei-d721e.firebaseapp.com",
    projectId: "agendei-d721e",
    storageBucket: "agendei-d721e.firebasestorage.app",
    messagingSenderId: "525023801595",
    appId: "1:525023801595:web:71a6d72e986e6e9e30005e",
    measurementId: "G-YQP41N6MJ3"
  };

const firebaseApp = initializeApp(firebaseConfig)

export { firebaseApp }
