<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Account.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['email']) && !empty($_POST['name'])) {
        // Ambil nilai dari data POST
        $name = $_POST['name'];
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $accountDB = new Account();
        $accountDB->register($name, $email, $username, $password);
        header("Location: /pages/login_page.php");
    } else {
        http_response_code(404);
    }
}
?>