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
    <title>Spotyphie</title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/main_page.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <main>
        <h1 class="white-text baloo-font">Made For You</h1>
        <div class="container black-background vertical-scroll width-60 white-text inter-font" id="for-you-container">
        </div>
        <h1 class="white-text baloo-font">Top Songs</h1>
        <div class="container grid width-60" id="top-songs-container">
          
        </div>
        <br>
    </main>
  </body>
  <footer>
    <script src="../view/js/navbar.js"></script>
    <script src="../view/js/main_page.js"></script>
  </footer>
</html>