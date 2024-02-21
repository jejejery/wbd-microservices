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
    <title>Spotyphie | Play Song</title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/song_page.css">
  </head>
  <body>
  <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <main>
      <div class="popup-wrapper" id="song-popup-wrapper">
        <div class="edit-popup" id="song-edit-popup">
          <button type="button" id="close-edit-popup" onclick="hideEditPopup()">X</button>
          <h1 class="white-text baloo-font">Edit song</h1>
          <form method="post" action="" id="song-edit-form">
            <label for="song-title-edit" class="green-text inter-font">Title</label><br>
            <input type="text" name="song-title-edit" id="song-title-edit" class="txtbox-long"><br>
            <label for="song-artist-edit" class="green-text inter-font">Artist</label><br>
            <input type="text" name="song-artist-edit" id="song-artist-edit" class="txtbox-long"><br>
            <label for="song-genre-edit" class="green-text inter-font">Genre</label><br>
            <input type="text" name="song-genre-edit" id="song-genre-edit" class="txtbox-long"><br>
            <input type="submit" value="Apply" id="apply-song-edit" class="baloo-font btn">
            <input type="submit" value="Delete Song" id="delete-song" class="baloo-font btn">
          </form>
        </div>
      </div>
      <div id="song-display">
          <button type="button" id="left-song-button" class="move-btn" onclick="showPrevSong()"><</button>
          <img id="song-img" src="" alt="Song Image"/>
          <div id="song-info">
              <h1 id="song-title" class="white-text baloo-font"></h1>
              <h2 id="song-artist" class="white-text baloo-font"></h2>
          </div>
          <button type="button" id="right-song-button" class="move-btn" onclick="showNextSong()">></button>
      </div>
      <audio id="song-player" controls>
        <source id="song-source" src="" type="audio/mpeg">
        Your browser does not support the audio element!
      </audio><br><br>
      <button type="button" class="baloo-font btn" id="edit-song" onclick="showEditPopup()">Edit song</button>
    </main>
    <footer>
      <script src="../view/js/song_page.js" type="module"></script>
      <script src="../view/js/navbar.js"></script>
    </footer>
  </body>
</html>