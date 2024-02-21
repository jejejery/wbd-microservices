<?php
  require_once(__DIR__ . '/../config/config.php');

  function connect_db($host, $db, $username, $password, $port) : PDO {
    try {
      $dsn = "pgsql:host=$host;port=$port;dbname=$db;";
      // make a database connection
      $pdo = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
      if ($pdo) {
        return $pdo;
      }
    } catch (PDOException $e) {
      die($e->getMessage());
    }
  }
  return connect_db($db_host, $db, $db_username, $db_password, $db_port);
?>