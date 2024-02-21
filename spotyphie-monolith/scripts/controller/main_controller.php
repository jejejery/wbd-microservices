<?php 
    require_once $_SERVER['DOCUMENT_ROOT'] .  '/model/Song.php';
    $songDB = new Song();
    if ($_GET['for']==='forYou') {
        $result = $songDB->getRandomSongs(20);
        if (isset($result)) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo 'Couldn\'t get songs';
        }
    } else if ($_GET['for'] === 'top') {
        $result = $songDB->getRandomSongs(9);
        if (isset($result)) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo 'Couldn\'t get songs';
        }
    }
?>