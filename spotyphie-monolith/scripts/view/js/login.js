import sanitize from "./sanitize.js";

window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        
            let username = document.getElementById('username');
            let password = document.getElementById('password');
            let usernameVal = sanitize(username.value);
            let passwordVal = sanitize(password.value);
            
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        // Berhasil log in, set session variables
                        console.log(this.responseText)
                        let userData = JSON.parse(this.responseText);
                        let xhttp2 = new XMLHttpRequest();
                        xhttp2.open("POST", "../../helper/session.php", true);
                        xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp2.send("username=" + userData.username + "&is_admin=" + userData.is_admin + "&user_id=" + userData.user_id + "&for=login");
                        xhttp2.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                window.location.replace("../../pages/main_page.php");
                            }
                        }
                    } else {
                        // Gagal log in, munculkan pesan error
                        let err = document.getElementById('login-error');
                        err.innerHTML = this.responseText;
                    }
                }
            }
            xhttp.open("POST", "../../controller/login_controller.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("username=" + usernameVal + "&password=" + passwordVal);

            username.value = "";
            password.value = "";
        }
    )
} 
}
);