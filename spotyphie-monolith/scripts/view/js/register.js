import sanitize from "./sanitize.js";

window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let name = document.getElementById('name').value;
            let username = document.getElementById('username').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            let usernameVal = sanitize(username.value);
            let passwordVal = sanitize(password.value);
            let emailVal = sanitize(email.value);
            let nameVal = sanitize(name.value);
           
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        let xhttp2 = new XMLHttpRequest();
                        xhttp2.open("POST", "../../controller/register_controller.php", true);
                        xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp2.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                window.location.replace("../../pages/login_page.php");
                            }
                        }
                    } 
                    else{
                        let err = "Astagfrulloh";
                        err.innerHTML = this.responseText;
                    }
                }
            }
            xhttp.open("POST", "../../controller/register_controller.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("name=" + nameVal + "&email=" + emailVal + "&username=" + usernameVal + "&password=" + passwordVal);

            username.value = "";
            password.value = "";
            email.value="";
            name.value="";
        });
    }
});