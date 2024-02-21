<?php 
    require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Song.php';
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['method'])) {
            $songDB = new Song();
            if ($_GET['method'] === 'id') {
                $result = $songDB->getSongByID($_GET['value']);
            } elseif ($_GET['method'] === 'title') {
                $result = $songDB->getSongByTitle($_GET['value']);
            } elseif ($_GET['method'] === 'maxID') {
                $result = $songDB->getMaxID();
            }
            if (isset($result)) {
                if ($_GET['method'] === 'maxID') {
                    echo $result;
                } else {
                    echo json_encode($result);
                }
            } else {
                http_response_code(404);
                echo 'Couldn\'t get songs';
            }
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['method'])) {
            $songDB = new Song();
            if ($_POST['method'] === 'edit') {
                $result = $songDB->editSong($_POST['id'], $_POST['title'], $_POST['artist'],  $_POST['genre']);
            }
            if ($result != 'success') {
                http_response_code(404);
                echo $result;
            }
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $data = file_get_contents('php://input');
        $id = intval(substr($data,3));
        if (isset($data)) {
            $songDB = new Song();
            $result = $songDB->deleteSong($id);
            if ($result != 'success') {
                http_response_code(404);
                echo $result;
            }
        } else {
            http_response_code(404);
            echo 'ID not set';
        }
    }
?>