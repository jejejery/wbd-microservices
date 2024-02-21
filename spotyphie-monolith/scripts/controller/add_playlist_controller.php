<?php 
    session_start();
    require_once $_SERVER['DOCUMENT_ROOT'] . '/model/Playlist.php';
    if (empty($_POST['playlist_name']) || empty($_POST['song_titles'])) {
        http_response_code(404);
        echo 'Data is empty';
    } else {
        $picUrl = '../view/assets/img/';
        $fileContent;
        if (isset($_FILES['picture'])) {
            if ($_FILES['picture']['tmp_name'] === '') {
                http_response_code(400);
                echo 'File size too large';
                return;
            }
            // Pecah filename menjadi nama file dan extension
            $filename = explode('.',$_FILES['picture']['name']);
            $picUrl .= 'uploads/';
            // Jika file duplikat, tambahkan _dup di nama file
            if (file_exists($picUrl . $filename[0] . '.' . $filename[1])) {
                $filename[0] .= '_dup';
            }
            $picUrl .= $filename[0] . '.' . $filename[1];
            $fileContent = file_get_contents($_FILES['picture']['tmp_name']);
        } else {
            $picUrl .= 'logo.png';
        }
        $playlistDB = new Playlist();
        $result = $playlistDB->addPlaylist($_SESSION['user_id'], $_POST['playlist_name'], $_POST['song_titles'], $picUrl);
        if ($result != 'success') {
            http_response_code(404);
            echo $result;
        } else if (isset($fileContent)) {
            file_put_contents($picUrl, $fileContent);
        } 
    }
?>