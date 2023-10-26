let auth = firebase.auth();

// signup
// signin
// signout

document.addEventListener("DOMContentLoaded", function () {
    const signOutButton = document.getElementById("signOutButton");

    // ! sign out
    signOutButton.addEventListener("click", () => {
        signOut();
    });
});

function signOut() {
    auth.signOut()
        .then(() => {
            console.log("Signout success");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.log("Error logout", error);
        });
}
