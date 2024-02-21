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
    <title>Spotyphie | Playlist Detail</Details></title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/playlist_page.css">
</head>

<body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      require_once($_SERVER['DOCUMENT_ROOT'] . '/controller/playlist_controller.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
      if (isset($_POST['selectedPlaylist'])) {
        setVariables($_POST['selectedPlaylist']);
      }
    ?>
    <input type="hidden" value=<?php echo $id?> id="playlist-id">
    <div class="popup-wrapper" id="playlist-popup-wrapper">
        <div class="edit-popup" id="playlist-edit-popup">
        <button type="button" id="close-edit-popup" onclick="hideEditPopup()">X</button>
        <form method="post" action="" id="playlist-edit-form">
            <label for="playlist-name-edit" class="white-text baloo-font">Playlist Title</label><br>
            <input type="text" name="playlist-name-edit" id="playlist-name-edit" class="txtbox-long"><br>
            <input type="submit" value="Apply" id="apply-playlist-edit" class="baloo-font btn">
            <input type="submit" value="Delete Playlist" id="delete-playlist" class="baloo-font btn">
        </form>
        </div>
    </div>
    <div class="pad-40">
        <h1 class="playlist-detail-header">Playlist Detail</h1>
            <div class="playlist-detail-flex">
                <img id="playlist_img" src="<?php echo $pic?>" alt="Playlist cover" class="playlist-cover">
                <div class="playlist-details">
                    <h1 class="playlist-title" id="playlist-title">
                        <?php echo $nameofPlaylist;?>
                    </h1>
                    <p class="playlist-creator">
                        <?php echo $creator;?>
                    </p>
                    <h2 class="song-count">
                        <?php echo $count;?>
                    </h2>
                </div>
            </div>
            <button type="button" class="baloo-font btn" id="edit-playlist" onclick="showEditPopup()">Edit Playlist</button>
            <div class="horizontal-line"></div>
            <h1 class="songs-list-header">Songs</h1>
                <div class="songs-list">
                    <div class="container black-background vertical-scroll width-60 white-text inter-font" id="song-list-container">
                        <?php
                            foreach ($getSong as $song) {
                                if (isset($song['picture'])) {
                                    $picture = $song['picture'];
                                } else {
                                    $picture = '../view/assets/img/logo.png';
                                }

                                if (isset($song['artist'])) {
                                    $artist = $song['artist'];
                                } else {
                                    $artist = 'Unknown Artist';
                                }

                                echo '<div class="song-item" onClick="toSongPage(\''. $song['title'] .'\')">';
                                echo '<img src="' . $picture . '" class="song-img list-img">';
                                echo '<p>Title: ' . $song['title'] . '<br>';
                                echo 'Artist: ' . $artist . '</p>';
                                echo '</div>';
                            }
                        ?>
                    </div>
                </div>
    </div>
    <footer>
        <script src="../view/js/navbar.js"></script>
        <script src="../view/js/playlist_page.js" type="module"></script>
    </footer>
</body>
</html>