import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvuETPdTeZsDasgOw7MW59IrsmeOQP7kk",
        authDomain: "chat-web-23e9c.firebaseapp.com",
        projectId: "chat-web-23e9c",
        storageBucket: "chat-web-23e9c.firebasestorage.app",
        messagingSenderId: "90729782128",
        appId: "1:90729782128:web:b051229c6c45866a87cdb5",
        measurementId: "G-MDK4X48TP0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Authenticate User
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html"; // Redirect to login
        return;
    }
    loadMessages();
});

// Load Messages
const loadMessages = () => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
        messagesDiv.innerHTML = "";
        snapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement("div");
            messageElement.textContent = `${message.sender}: ${message.text}`;
            messagesDiv.appendChild(messageElement);
        });
    });
};

// Send Message
sendBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    const message = messageInput.value.trim();
    if (message) {
        await addDoc(collection(db, "messages"), {
            text: message,
            sender: user.email,
            timestamp: new Date(),
        });
        messageInput.value = "";
    }
});
