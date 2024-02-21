<?php 
    Class Account{

        private $relation;
        private $db;
        public function __construct(){
            try{
                $this->relation = 'account';
                $pdo = require_once 'db.php';
                $this->db = $pdo;
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }

        public function getAllUser(){
            return $this->db->query("SELECT name, email, username, is_admin FROM {$this->relation} ORDER BY user_id ASC")->fetchAll();
        }

        public function getAllUserId(){
            return $this->db->query("SELECT user_id FROM {$this->relation} ORDER BY user_id ASC")->fetchAll();
        }
        
        public function debug(){
            $res = $this->getAllUser();
            if(!empty($res)){
                echo json_encode($res);
            }
        }
        
        public function login($username, $password){
            $result = $this->db->query("SELECT * FROM {$this->relation} WHERE username = '{$username}' OR email = '{$username}'");
            $user = $result->fetch(PDO::FETCH_ASSOC);
            if (!empty($user)) {
                if (password_verify($password, $user['password'])) {
                    return array('user_id' => $user['user_id'], 'username' => $user['username'], 'is_admin' => $user['is_admin']);
                } else {
                    return 'Password incorrect';
                }
            } else {
                return 'Username not found';
            }
        }

        public function register($name, $email, $username, $password) {
            $query = "INSERT INTO {$this->relation}(name, email, username, password) VALUES (:name, :email, :username, :password)";
            $stmt = $this->db->prepare($query);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bindParam('name', $name);
            $stmt->bindParam('email', $email);
            $stmt->bindParam('username', $username);
            $stmt->bindParam('password', $hashedPassword);
            $stmt->execute();
        }
        public function getUserData($username) {
            $query = "SELECT name, email from account WHERE username= :username";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':username', $username);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function getUserDataById($user_id) {
            $query = "SELECT username from account WHERE user_id= :user_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':user_id', $user_id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function searchUserData($search) {
            $search = strtolower($search);
            $query = "SELECT * FROM {$this->relation} WHERE LOWER(username) LIKE '%{$search}%'";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function update($name, $email, $username, $password){
            $query = "UPDATE {$this->relation} SET name = :name, email = :email, username = :username, password = :password WHERE username = :username";
            $stmt = $this->db->prepare($query);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bindParam('name', $name);
            $stmt->bindParam('email', $email);
            $stmt->bindParam('username', $username);
            $stmt->bindParam('password', $hashedPassword);
            $stmt->execute();
        }

        public function deleteAccount($user_id) {
            try {
                $query = "DELETE FROM {$this->relation} WHERE user_id = :user_id";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();
                return 'success'; // Jika penghapusan berhasil
            } catch (PDOException $e) {
                return $e->getMessage(); // Jika terjadi kesalahan
            }
        }

        
    }
?>