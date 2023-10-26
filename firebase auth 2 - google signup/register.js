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
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        emailSignup(email, password);
    });

    // ! google signup
    const googleBtn = document.getElementById("googleSignUp");
    googleBtn.addEventListener("click", function () {
        googleSignup();
    });
});

function emailSignup(email, password) {
    let validations = validatePass(password);
    if (validations.length > 0) {
        showToast("Validation Error: " + validations.join(" "), "error");
        return;
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
            console.log("User sign up success: ", userCred);
            const user = userCred.user;
        })
        .catch((error) => {
            console.log("Error: ", error);
            showToast("Error: " + error.code, "error");
        });
}

function googleSignup() {
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

function validatePass(password) {
    const passwordValidationErrors = [];

    if (password.length < 8) {
        passwordValidationErrors.push(
            "Password must be at least 8 characters long."
        );
    }
    if (!/[A-Z]/.test(password)) {
        passwordValidationErrors.push(
            "Password must contain at least one uppercase letter."
        );
    }
    if (!/[a-z]/.test(password)) {
        passwordValidationErrors.push(
            "Password must contain at least one lowercase letter."
        );
    }
    if (!/[0-9]/.test(password)) {
        passwordValidationErrors.push(
            "Password must contain at least one number."
        );
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        passwordValidationErrors.push(
            "Password must contain at least one special character."
        );
    }

    return passwordValidationErrors;
}
