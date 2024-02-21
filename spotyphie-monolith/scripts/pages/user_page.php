<?php
session_start();
require_once('../controller/redirect_controller.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/controller/user_page_controller.php');
checkIsLoggedIn();
setVariables($_SESSION['username']);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotyphie | Register </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/user_page.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar($_SESSION['username'], $_SESSION['is_admin']);
    ?>
    <main>
        <div class="my-playlist-header">
            <h1 class="white-text baloo-font">Hi, Playlist</h1>
        </div>
        <form method="post" action="" id="user-page-form">
            <div id="textBoxContainer">
              <label for="user-name" class="white-text inter-font" >Your Name</label><br>
              <input type="text" id="user-name" name="user-name" class="txtbox-med" value="<?php echo $user_name; ?>" required /><br>
              <br>
              <label for="user-email" class="white-text inter-font">Your Email</label><br>
              <input type="text" id="user-email" name="user-email" class="txtbox-med" value="<?php echo $user_email; ?>" required/><br>
              <br>
              <label for="user-username" class="white-text inter-font">Your Username</label><br>
              <input type="text" id="user-username" name="user-username" class="txtbox-med" value="<?php echo $user_username; ?>" required /><br>
              <br>
              <label for="user-password" class="white-text inter-font">Your Password</label><br>
              <input type="password" id="user-password" name="user-password" class="txtbox-med" required/><br>
            </div><br> 
        </form>
        <br>
        <button type="button" class="baloo-font btn" id="update-profile">Update Profile</button>
        <button type="button" class="baloo-font btn" id="signout-button">Sign Out</button>
        <button type="button" class="baloo-font btn" id="delete-account" onclick="showEditPopup()">Delete This Account</button>
    </main>
  <script src="../view/js/navbar.js"></script>
  <script src="../view/js/user_page.js"></script>
  </body>
</html>