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

            user.sendEmailVerification()
                .then(() => {
                    showToast("Success: Please verify your email!", "success");
                })
                .catch((error) => {
                    showToast("Error sending verification link: ", "error");
                });
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
