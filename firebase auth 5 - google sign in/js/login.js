const firebaseConfig = {
    apiKey: "AIzaSyCayhOyZTi6c_Nepr4Gl5LRTMDpsJhRlCo",
    authDomain: "fir-dersleri-c9448.firebaseapp.com",
    projectId: "fir-dersleri-c9448",
    storageBucket: "fir-dersleri-c9448.appspot.com",
    messagingSenderId: "3683299065",
    appId: "1:3683299065:web:dca023aaaf0bdd47643c28",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            emailSignIn(email, password);
        });

    // ! Google sign in
    const googleBtn = document.getElementById("googleSignIn");
    googleBtn.addEventListener("click", function () {
        googleSignIn();
    });
});

function emailSignIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCred) => {
            const user = userCred.user;
            const email = user.email;
            const isEmailVerified = user.emailVerified;
            const photoUrl = user.photoUrl;
            console.log("Login success: ", user);
            showToast("User logged in successfully!", "success");
        })
        .catch((error) => {
            console.log("Error login: ", error);
            showToast("Username or password is not correct", "error");
        });
}

function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Google sign in success: ", user);
        })
        .catch((error) => {
            console.log("Error from google auth: ", error);
        });
}

function showToast(message, type) {
    const toast = document.getElementById("toast");

    toast.classList.remove("success", "error");

    toast.classList.add(type);

    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 10000);
}

function togglePasswordVisibility(passwordId, iconElement) {
    const passwordInput = document.getElementById(passwordId);
    const isPasswordVisible = passwordInput.type === "text";

    passwordInput.type = isPasswordVisible ? "password" : "text";
    iconElement.className = isPasswordVisible
        ? "fa fa-eye eye-icon"
        : "fa fa-eye-slash eye-icon";
}
