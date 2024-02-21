<?php 
    session_start();
    function setLoginSession() {
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['is_admin'] = ($_POST['is_admin'] == 'true');
        $_SESSION['user_id'] = $_POST['user_id'];
    }

    function sessionDestroyLogout() {
        session_unset();
        session_destroy();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if ($_POST['for'] === 'login') {
            setLoginSession();
        } else if ($_POST['for'] === 'logout') {
            sessionDestroyLogout();
        }
    }
?>