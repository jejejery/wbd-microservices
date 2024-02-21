<?php

    require_once '../model/Song.php';
    require_once '../model/Playlist.php';


    require_once '../model/Song.php';
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(!isset($_GET['playlist'])){
            $songDB = new Song();
            $result = $songDB->getSongInSearchPage($_GET['title'], $_GET['artist'], $_GET['genre'], ($_GET['sort'] == 'false' ? false : true), ($_GET['sort_artist'] == 'false' ? false : true));
            if (isset($result)) {
                echo json_encode($result);     
            } else {
                echo 'Couldn\'t get songs';
            }
        }
        else if($_GET['playlist'] == "true"){
           $playlistDB = new Playlist();
           $result = $playlistDB->getPlaylistInSearchPage($_GET['title'],$_GET['playlist_startview']);
           if (isset($result)) {
            echo json_encode($result);     
            } else {
                echo 'Couldn\'t get playlists';
            }
        }
        else if($_GET['playlist'] == "len"){
            $playlistDB = new Playlist();
            $result = $playlistDB->getLengthPlaylistInSearchPage($_GET['title']);
            if (isset($result)) {
                echo json_encode($result);     
             } else {
                 echo 'Couldn\'t get playlists len';
             }
         }
        else{
            echo 'Invalid parameter';
        }
        
        
    }

?>