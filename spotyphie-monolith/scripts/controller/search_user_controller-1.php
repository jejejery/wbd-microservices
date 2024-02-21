<?php

    require_once '../model/Account.php';
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        try{
            $accountDB = new Account();
            if(isset($_GET['username'])){
                $result = $accountDB->searchUserData($_GET['username']);
                if (isset($result)) {
                    echo json_encode($result);     
                } else {
                    echo 'Couldn\'t get users';
                }
            }
            else if(isset($_GET['user_id'])){
                $result = $accountDB->getUserDataById(intval($_GET['user_id']));
                if (isset($result)) {
                    echo json_encode($result);     
                } else {
                    echo 'Couldn\'t get users';
                }
            }
            else{
                $result = $accountDB->getAllUser();
                if (isset($result)) {
                    echo json_encode($result);     
                } else {
                    echo 'Couldn\'t get users';
                }
            }
            
            
        }
        catch(PDOException $e){
            die($e->getMessage());
        }
        
        
    }

?>