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
    <title>Spotyphie | Add Song </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/add_song.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <main>
        <h1 class="white-text baloo-font">Add song</h1>
        <form method="post" action="" id="add-song-form">
            <div id="textBoxContainer">
              <label for="song-name" class="white-text inter-font">Title</label><br>
              <input type="text" id="song-name" name="song-name" class="txtbox-med" /><br>
              <label for="song-artist" class="white-text inter-font">Artist</label><br>
              <input type="text" id="song-artist" name="song-artist" class="txtbox-med" /><br>
              <label for="song-genre" class="white-text inter-font">Genre</label><br>
              <input type="text" id="song-genre" name="song-genre" class="txtbox-med" /><br>
            </div><br>
            <div class="song-container">
              <label for="song-audio-file" style="cursor: pointer;" class="baloo-font btn">Upload Audio</label>
              <span src="#" alt="No file selected" class="white-text inter-font upload-preview-audio" id="song-audio">No file selected</span>
              <input type="file" accept="audio/*" name="song-audio-file" id="song-audio-file" />
            </div>
            <br>
            <div class="song-container">
              <label for="song-img-file" style="cursor: pointer;" class="baloo-font btn">Upload Image</label>
              <img src="#" alt="No file selected" class="white-text inter-font upload-preview-img" id="song-img"> 
              <input type="file" accept="image/*" name="song-img-file" id="song-img-file" />
            </div>
            <br>
            <p class="inter-font white-text">Max file sizes : 2 MB</p>
            <input type="submit" value="Save Song" name="add-song" id="add-song" class="baloo-font btn" /> 
        </form>
        <br>
    </main>
    <footer>
      <script type="module" src="../view/js/add_song.js"></script>
      <script src="../view/js/navbar.js"></script>
    </footer>
  </body>
</html>