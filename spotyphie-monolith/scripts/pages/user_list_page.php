<?php
session_start();
require_once('../controller/redirect_controller.php');
checkIsLoggedIn();
checkIsAdmin();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotyphie | User List</title>
    <link rel="stylesheet" href="../view/css/globals.css">
    <link rel="stylesheet" href="../view/css/user_list_page.css">
  </head>
  <body>
    <?php 
      require_once($_SERVER['DOCUMENT_ROOT'] . '/pages/templates/navbar.php');
      getNavBar();
    ?>
    <main>
        <h1 class="white-text baloo-font">User List</h1>
        <?php
          require_once($_SERVER['DOCUMENT_ROOT'] . '/model/Account.php');
          $account = new Account();
          $account_view = $account->getAllUser();
          $html_table = <<< "EOT"
          <table class = "white-text baloo-font">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
          EOT;

          $num = 1;
          foreach($account_view as $row){
            $is_admin = $row['is_admin'] ? 'Yes' : 'No';
            $html_table .= <<< "EOT"
            <tr>
              <td data-column="No">{$num}</td>
              <td data-column="Name">{$row['name']}</td>
              <td data-column="Email">{$row['email']}</td>
              <td data-column="Username">{$row['username']}</td>
              <td data-column="Is Admin">{$is_admin}</td>
            </tr>
            EOT;
            $num++;
          }

          $html_table .= <<< "EOT"
            </tbody>
          </table>
          EOT;

          echo $html_table;
       
        ?>
      
    </main>
    <footer>
      <script src="../view/js/navbar.js"></script>
    </footer>
  </body>
</html>