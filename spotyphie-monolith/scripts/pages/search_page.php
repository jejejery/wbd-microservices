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
    <title>Spotyphie | Search</title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/search_page.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar();   
    ?>
    
    <main>
        <h1 class="white-text baloo-font">Results</h1>
        <h2 class="white-text baloo-font">Playlist</h2>
        <div id="playlistRes" class="horizontal-container">
          <button type="button" class="the-button" id = "left-button" onclick="clickLeftButton()"> < </button>
          <div class="container black-background vertical-scroll width-90 white-text inter-font"> 
            <div id="playlist-results" class = "playlistres">
              <!-- Content goes here -->
            </div>
          </div>
          <button type="button" class="the-button" id = "right-button" onclick="clickRightButton()"> > </button>
        </div>

        
        <h2 class="white-text baloo-font">Songs</h2>
        <div class="container black-background vertical-scroll width-60 white-text inter-font" id="song-results">
            <!-- Content goes here -->
        </div>
        <br>
    </main>
    <footer>
      <script src="../view/js/search_page.js"></script>
      <script src="../view/js/navbar.js"></script>
    </footer>
  </body>
</html>
