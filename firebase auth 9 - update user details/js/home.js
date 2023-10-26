let auth = firebase.auth();

// signup
// signin
// signout

document.addEventListener("DOMContentLoaded", function () {
    const signOutButton = document.getElementById("signOutButton");

    // ! Sign out
    signOutButton.addEventListener("click", () => {
        signOut();
    });

    // ! AuthStateChanged
    auth.onAuthStateChanged((user) => {
        if (user) {
            // login eden user
            document.querySelector(".nav-dropdown-username").textContent =
                user.email;
            console.log(user);
        } else {
            // log in etmedik user
            if (window.location.pathname != "/pages/login.html") {
                window.location.href = "login.html";
            }
        }
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
