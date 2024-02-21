<?php 
    function checkIsLoggedIn() {
        if (!isset($_SESSION['username'])) {
            echo '<script type="text/javascript">alert("Please login first");
                          window.location.href="login_page.php";</script>';
        }
    }
    function checkIsAdmin() {
        if (!$_SESSION['is_admin']) {
            echo '<script>alert("Forbidden access, page is for admin only");
                          window.location.href="main_page.php";</script>';
        }
    }
?>