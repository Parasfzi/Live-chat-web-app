import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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

// DOM Elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const errorMessage = document.getElementById("error-message");
const signupErrorMessage = document.getElementById("signup-error-message");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");

// Switch Forms
signupLink.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});
loginLink.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

// Sign Up
signupBtn.addEventListener("click", async () => {
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign-up successful!");
        signupEmailInput.value = "";
        signupPasswordInput.value = "";
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    } catch (error) {
        signupErrorMessage.textContent = error.message;
    }
});

// Login
loginBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "chat.html"; // Redirect to chat page
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
