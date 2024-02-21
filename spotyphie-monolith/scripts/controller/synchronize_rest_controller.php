<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/model/Account.php');



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   
        try{
            $accountDB = new Account();
            $result = $accountDB->getAllUserId();
            if(!empty($result)){
                echo json_encode($result);
            }
            else{
                http_response_code(404);
                echo 'Couldn\'t get users';
            }
        }
        catch(exception $e){
            echo $e->getMessage();
        }
        
}
?>