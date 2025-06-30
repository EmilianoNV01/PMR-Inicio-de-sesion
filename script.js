// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔁 REEMPLAZA con tu configuración
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGMK2jEi-xYgUA0nssmGtuPb9YssYe3vY",
  authDomain: "prm-contactos.firebaseapp.com",
  databaseURL: "https://prm-contactos-default-rtdb.firebaseio.com",
  projectId: "prm-contactos",
  storageBucket: "prm-contactos.firebasestorage.app",
  messagingSenderId: "644617404812",
  appId: "1:644617404812:web:2580a6c1c5acac4e20d6a9",
  measurementId: "G-TF34X8C3QR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login
window.login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Bienvenido"))
    .catch(e => alert("Error: " + e.message));
};

// Cargar datos del usuario autenticado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const datos = snap.data();
      document.getElementById("datosUsuario").innerHTML = `
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Mensaje:</strong> ${datos.mensaje || "Sin mensaje"}</p>
      `;
    } else {
      document.getElementById("datosUsuario").innerText = "No hay datos disponibles.";
    }
  }
});