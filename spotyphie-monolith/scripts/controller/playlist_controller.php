<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/model/Playlist.php');

$nameofPlaylist = "Playlist name not found";
$creator = "Playlist creator not found";
$count = 0;
$getSong = null;

function setVariables($selectedPlaylist) {
    $playlistController = new Playlist();
    global $nameofPlaylist;
    global $creator;
    global $count;
    global $getSong;
    global $id;
    global $pic;
    $nameofPlaylist = $selectedPlaylist;
    $creator = $playlistController->playlistCreator($selectedPlaylist)['username'];
    $count = $playlistController->countSong($selectedPlaylist)['count'];
    $getSong = $playlistController->getSong($selectedPlaylist);
    $id = $playlistController->getPlaylistID($selectedPlaylist)['playlist_id'];
    $pic = $playlistController->getPlaylistPic($selectedPlaylist)['playlist_picture'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['method'])) {
        $playlistDB = new Playlist();
        if ($_POST['method'] === 'edit') {
            $result = $playlistDB->editPlaylist($_POST['playlist_id'], $_POST['playlist_name']);
        }
        if ($result !== 'success') {
            http_response_code(400);
            echo $result;
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $playlist_id = intval(substr($data,3));
    if (isset($data)) {
        $playlistDB = new Playlist();
        $result = $playlistDB->deletePlaylist($playlist_id);
        if ($result != 'success') {
            http_response_code(400);
            echo $result;
        }
    } else {
        http_response_code(400);
        echo 'ID not set';
    }
}
?>