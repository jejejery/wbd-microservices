<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotyphie | Register </title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/log_reg.css">
  </head>
  <body>
    <main>
        <img src="../view/assets/img/logo.png" alt="logo" class="log-reg logo"/>
        <h1 class="green-text baloo-font">Spotyphie</h1>  
        <h3 class="green-text baloo-font">Since 2023</h3>
        <form method="post" action="../controller/register_controller.php" id="register-form">
            <label for="name" class="white-text inter-font">Name</label><br>
            <input type="text" id="name" name="name" class="txtbox-med"><br>
            
            <label for="email" class="white-text inter-font">Email</label><br>
            <input type="email" id="email" name="email" class="txtbox-med"><br>
            
            <label for="username" class="white-text inter-font">Username</label><br>
            <input type="text" id="username" name="username" class="txtbox-med"><br>
            
            <label for="password" class="white-text inter-font">Password</label><br>
            <input type="password" id="password" name="password" class="txtbox-med"><br>
            <input type="submit" value="Register" id="register" class=" baloo-font btn"> 
        </form>
        <br>
        <p class="white-text inter-font">Already have an account ? <a href="login_page.php" class="green-text inter-font">Log in</a></p>
    </main>
  <script src="register.js"></script>
  </body>
</html>