<?php 
    require('config/config.php');
    if (session_status() === PHP_SESSION_ACTIVE) {
        $curr_time = time();

        if ($curr_time - $_SESSION['last_update'] > SESSION_EXPIRED_TIME) {
            session_unset();
            session_destroy();
        } else if ($curr_time - $_SESSION['last_update'] > SESSION_REGENERATE) {
            session_regenerate_id(true);
            $_SESSION['last_update'] = $curr_time;
        }
    }

    if (session_status() === PHP_SESSION_NONE) {
        $curr_time = time();
        $_SESSION['last_update'] = $curr_time;

        session_set_cookie_params(COOKIE_LIFETIME);
        session_start();
    }
    header('Location: pages/login_page.php');
    exit();
?>