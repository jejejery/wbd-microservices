var currId;

function signoutRequest() {
    // Lakukan signout
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../../helper/session.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("for=signout");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("../../pages/login_page.php");
        }
    }
}

function signoutRequest() {
    // Lakukan signout
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../../helper/session.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("for=logout");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Redirect ke halaman login
            window.location.replace("../../pages/login_page.php");
        }
    }
}


window.addEventListener('DOMContentLoaded', (e) => {
    var nameForm = document.getElementById('user-name');
    var emailForm = document.getElementById('user-email');
    var usernameForm = document.getElementById('user-username');
    var passwordForm = document.getElementById('user-password');
    var signoutButton = document.getElementById('signout-button');
    var updateButton = document.getElementById('update-profile');

    signoutButton.addEventListener('click', (e) => {
        signoutRequest();
    })

    updateButton.addEventListener('click', (e) => {
        let pw = prompt("Please verify your new password", "");
        if (pw != null && pw == passwordForm.value) {
            // Lakukan update password
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    
                }
            };
            xhttp.open("POST", `../../controller/user_page_controller.php` , true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`name=${nameForm.value}&email=${emailForm.value}&username=${usernameForm.value}&password=${passwordForm.value}`);

            alert("Profile updated successfully");
            
        }
        else{
            alert("Wrong password");
        }
    })
});

function deleteAccount(user_id) {
    let params = "user_id=" + user_id;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText === "success") {
                    alert("Account deleted successfully");
                    location.replace("../../pages/login_page.php");
                } else {
                    alert(this.responseText);
                }
            } else {
                alert(this.responseText);
            }
        }
    }
    xhttp.open("DELETE", "../../controller/user_page_controller.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

window.addEventListener('DOMContentLoaded', (e) => {
    var signoutButton = document.getElementById('signout-button');

    signoutButton.addEventListener('click', (e) => {
        signoutRequest();
    })
});

const del = document.getElementById("delete-account");

del.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Delete Account ?")) {
        deleteAccount(currId);
        location.reload();
    }
});