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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $data = file_get_contents('php://input');
    $user_id = json_decode($data)->user_id;
    
    if (isset($user_id)) {
        $userDB = new Account();
        try {
            $result = $userDB->deleteAccount($user_id);
            http_response_code(200);
            echo 'success';
        } catch (Exception $e) {
            http_response_code(400);
            echo $e->getMessage();
        }
    }
    else{
        http_response_code(400);
        echo 'user_id not set';
    }
}
?>