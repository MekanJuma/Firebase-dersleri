let auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function () {
    const resetPasswordForm = document.getElementById("forgotPasswordForm");

    resetPasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        sendPasswordResetEmail(email);
    });
});

function sendPasswordResetEmail(email) {
    auth.sendPasswordResetEmail(email)
        .then(() => {
            console.log("Reset Password link sent");
            showToast("Reset Password link sent", "success");
        })
        .catch((error) => {
            console.log("ERror: ", error);
            showToast("Reset Password link Fail", "error");
        });
}
