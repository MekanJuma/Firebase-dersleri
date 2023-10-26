let auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("back-to-main").addEventListener("click", () => {
        window.location.href = "home.html";
    });

    // ! auth state change
    auth.onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("name").value = user.displayName;
            document.getElementById("email").value = user.email;

            const imgTag = document.querySelector(".card-header img");
            const defaultImageDiv = document.querySelector(
                ".card-header .default-image"
            );

            let profileImageURL = user.photoURL;

            if (profileImageURL) {
                imgTag.src = profileImageURL;
                imgTag.style.display = "block";
                defaultImageDiv.style.display = "none";
            } else {
                imgTag.style.display = "none";
                defaultImageDiv.style.display = "flex";
                defaultImageDiv.innerText = user.email[0].toUpperCase();
            }
        } else {
            if (window.location.pathname !== "/pages/login.html") {
                window.location.href = "login.html";
            }
        }
    });

    // ! profile name update
    document
        .getElementById("updateName")
        .addEventListener("click", function () {
            let name = document.getElementById("name").value;
            updateName(name);
        });

    // ! password update
    document
        .getElementById("updatePass")
        .addEventListener("click", function () {
            let password = document.getElementById("password").value;
            updatePassword(password);
        });

    // ! photo update
    document
        .getElementById("uploadImageBtn")
        .addEventListener("click", function () {
            document.getElementById("imageUpload").click();
        });

    // ! file upload event
    document
        .getElementById("imageUpload")
        .addEventListener("change", function (e) {
            const file = e.target.files[0];
            console.log(file);

            let imgUrl =
                "https://www.shareicon.net/data/512x512/2016/07/26/802043_man_512x512.png";
            updateUserProfile(imgUrl);
        });

    // ! delete user
    document
        .getElementById("deleteUser")
        .addEventListener("click", function () {
            deleteUser();
        });
});

function updateName(name) {
    const user = auth.currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(() => {
            console.log("Update name success");
        })
        .catch((error) => {
            console.log("Error updating name", error);
        });
}

function updatePassword(newPass) {
    const user = auth.currentUser;

    user.updatePassword(newPass)
        .then(() => {
            console.log("success updating password");
        })
        .catch((error) => {
            console.log("error updating password", error);
        });
}

function updateUserProfile(imageUrl) {
    const user = auth.currentUser;

    user.updateProfile({
        photoURL: imageUrl,
    })
        .then(() => {
            console.log("Update photo success");
        })
        .catch((error) => {
            console.log("Error updating photo", error);
        });
}

function deleteUser() {
    const user = auth.currentUser;

    user.delete()
        .then(() => {
            console.log("Delete user success");
            window.location.href = "register.html";
        })
        .catch((error) => {
            console.log("Error delete user", error);
        });
}
