<?php 
  session_start();
  require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login_controller.php';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotyphie | Login </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/log_reg.css">
  </head>
  <body>
    <main>
        <img src="../view/assets/img/logo.png" alt="logo" class="log-reg logo"/>
        <h1 class="green-text baloo-font">Spotyphie</h1>  
        <h3 class="green-text baloo-font">Since 2023</h3>
        <form method="post" action="" id="login-form">
            <label for="username" class="white-text inter-font">Username or Email</label><br>
            <input type="text" id="username" name="username" class="txtbox-med" required><br>
            <label for="password" class="white-text inter-font">Password</label><br>
            <input type="password" id="password" name="password" class="txtbox-med" required><br>
            <label class="error inter-font" id="login-error"></label><br>
            <input type="submit" value="Login" id="login" class="baloo-font btn">
        </form>
        <br>
        <p class="white-text inter-font">Don't have an account ? <a href="register_page.php" class="green-text inter-font">Register here</a></p>
      </main>
      <footer>
        <script type="module" src="../view/js/login.js"></script>
        <script src="../view/js/navbar.js"></script>
      </footer>
  </body>
</html>