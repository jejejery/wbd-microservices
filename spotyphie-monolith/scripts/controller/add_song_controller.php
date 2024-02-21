<?php 
    require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Song.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $picUrl = '../view/assets/img/';
        $audioUrl = '../view/assets/audio/';

        if (isset($_FILES['picture']) && isset($_FILES['audio'])) {
            if ($_FILES['picture']['tmp_name'] !== '' && $_FILES['audio']['tmp_name'] !== '') {
                // Pecah filename menjadi nama file dan extension
                $filename = explode('.',$_FILES['picture']['name']);
                $picUrl .= 'uploads/';
                $audioname = explode('.',$_FILES['audio']['name']);
                $audioUrl .= 'uploads/';
                $filePicContent = file_get_contents($_FILES['picture']['tmp_name']);
                $fileAudioContent = file_get_contents($_FILES['audio']['tmp_name']);
                // Jika file duplikat, tambahkan _dup di nama file
                if (file_exists($picUrl . $filename[0] . '.' . $filename[1])) {
                    $filename[0] .= '_dup';
                }
                $picUrl .= $filename[0] . '.' . $filename[1];

                if (file_exists($audioUrl . $audioname[0] . '.' . $audioname[1])) {
                    $audioname[0] .= '_dup';
                }
                $audioUrl .= $audioname[0] . '.' . $audioname[1];

                if (!empty($_POST['song_name']) && !empty($_POST['artist']) && !empty($_POST['genre'])) {
                    $songDB = new Song();
                    $result = $songDB->addSong($_POST['song_name'], $_POST['artist'], $_POST['genre'], $audioUrl, $picUrl);
                    if ($result != 'success') {
                        http_response_code(400);
                        echo $result;
                    } else {
                        file_put_contents($picUrl, $filePicContent);
                        file_put_contents($audioUrl, $fileAudioContent);
                    }
                } else {
                    http_response_code(400);
                    echo 'Title, Artist, and Genre are required fields';
                }
            } else {
                http_response_code(400);
                echo 'File size too large';
            }
        } else {
            //$picUrl .= 'logo.png';
            http_response_code(400);
            echo 'Please input audio and picture files';
        }
    }

?>