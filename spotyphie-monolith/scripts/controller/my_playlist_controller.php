<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/model/Playlist.php');

    $playlistController = new Playlist();
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Mendapatkan daftar playlist milik pengguna berdasarkan username
        $username = $_SESSION['username'];
        $playlists = $playlistController->getPlaylist($username);
    }
?>