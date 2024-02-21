<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/model/Account.php');

$user_name = "Name not found";
$user_email = "Email not found";
$user_username = "Username not found";

function setVariables($username) {
    $userController = new Account();
    global $user_name;
    global $user_email;
    global $user_username;
    $user_name = $userController->getUserData($username)['name'];
    $user_email = $userController->getUserData($username)['email'];
    $user_username = $username;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_PUT['username']) && isset($_PUT['password']) && isset($_PUT['email']) && isset($_PUT['name'])) {
        try{
            $accountDB = new Account();
            $accountDB->update($_PUT['name'], $_PUT['email'], $_PUT['username'], $_PUT['password']);
            echo "success";
        }
        catch(exception $e){
            echo $e->getMessage();
        }
        
    }
    echo $_PUT['username'], $_PUT['password'], $_PUT['email'], $_PUT['name'];
}

// Should be put, will updated later
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email']) && isset($_POST['name'])) {
        try{
            $accountDB = new Account();
            $accountDB->update($_POST['name'], $_POST['email'], $_POST['username'], $_POST['password']);
            echo "success";
        }
        catch(exception $e){
            echo $e->getMessage();
        }
        
    }
    echo $_POST['username'], $_POST['password'], $_POST['email'], $_POST['name'];
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $user_id = intval(substr($data,3));
    if (isset($user_id)) {
        $userDB = new Account();
        $result = $userDB->deleteAccount($user_id);
        if ($result != 'success') {
            http_response_code(400);
            echo $result;
        } else {
            http_response_code(200);
            echo 'success';
        }
    }
}
?>