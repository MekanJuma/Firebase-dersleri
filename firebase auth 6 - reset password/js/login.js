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
