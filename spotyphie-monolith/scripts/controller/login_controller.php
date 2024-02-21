<?php 
    require_once $_SERVER['DOCUMENT_ROOT'] .  '/model/Account.php';
    if (isset($_SESSION['username'])) {
        header("Location: /pages/main_page.php");
        exit();
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!empty($_POST['username']) && !empty($_POST['password'])) {
            $accountDB = new Account();
            $result = $accountDB->login($_POST['username'], $_POST['password']);
            if(gettype($result) !== 'array') {
                http_response_code(404);
            } else {
                $result = json_encode($result);
            }
            echo $result;
        } else {
            http_response_code(404);
            echo 'Username and/or password empty';
        }
    }
?>