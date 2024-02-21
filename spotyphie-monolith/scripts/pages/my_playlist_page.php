<?php
session_start();
require_once('../controller/redirect_controller.php');
checkIsLoggedIn();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotyphie | My Playlist </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/my_playlist_page.css">
</head>

<body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      require_once($_SERVER['DOCUMENT_ROOT'] . '/controller/my_playlist_controller.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <div class="playlist-list">
        <h1 class="my-playlist-header">My Playlist</h1>
        <div class="my-playlist">
            <div class="container black-background vertical-scroll width-60 white-text inter-font">
                <div class="list-item">
                <?php
                    foreach ($playlists as $playlist) {
                        $playlistName = $playlist['playlist_name'];
                        if (isset($playlist['playlist_picture'])) {
                            $picture = $playlist['playlist_picture'];
                        } else {
                            $picture = '../view/assets/img/logo_nav.png';
                        }
                        echo '<form action="playlist_page.php" method="post">';
                        echo '<div class="playlist-item">';
                        echo '<input type="hidden" name="selectedPlaylist" value="' . $playlistName . '">';
                        echo '<button type="submit">';
                        echo '<img src="' . $picture . '" class="playlist-img list-img">';
                        echo '<p>Title: ' . $playlistName . '</p>';
                        echo '</button>';
                        echo '</div>';
                        echo '</form>';
                    }
                ?>
            </div>
    </div>
</div>
<footer>
    <script src="../view/js/navbar.js"></script>
</footer>
</body>

</html>