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
    <title>Spotyphie | Add Playlist </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/add_playlist_page.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <main>
        <h1 class="white-text baloo-font">Add Your Playlist</h1>
        <form method="post" id="add-playlist-form">
            <div id="textBoxContainer">
              <label for="playlist-name" class="white-text inter-font">Playlist Name</label><br>
              <input type="text" id="playlist-name" name="playlist-name" class="txtbox-med"><br>
              <label for="song1" class="white-text inter-font">Song 1</label><br>
              <input type="text" id="song1" name="song1" class="txtbox-med"><br>
            </div>
            <button type="button" class="baloo-font btn" form="add-playlist-form" value="Add more song" id="addSong" onclick="addSongInput()"><img src="../view/assets/img/add_button.png" alt="add song" id="add-button">Add more song</button><br>
            <div id="playlist-img-container">
              <input type="file" accept="image/*" name="playlist-img-file" id="playlist-img-file"><br>
              <label for="playlist-img-file" style="cursor: pointer;" class="baloo-font btn">Upload Image</label><br>
              <img src="#" alt="No file selected" class="white-text inter-font upload-preview-img" id="playlist-img">
              <p class="inter-font white-text">Max file size : 2 MB</p>
            </div>
            <br>
            <input type="submit" value="Add Playlist" id="add-playlist" class="baloo-font btn"> 
        </form>
        <br>
    </main>
    <footer>
      <script type="module" src="../view/js/add_playlist.js"></script>
      <script src="../view/js/navbar.js"></script>
    </footer>
  </body>
</html>