<?php 
    class Playlist {
        private $relationPlayList;
        private $relationPlayListSong;
        private $relationSong;
        private $relationUserPlaylist;
        private $db;

        public function __construct() {
            try {
                $this->relationPlayList = "playlist";
                $this->relationPlayListSong = "playlist_song";
                $this->relationSong = "song";
                $this->relationUserPlaylist = "user_playlist";
                $this->db = require 'db.php';
            } catch(PDOException $e){
                die($e->getMessage());
            }
        }

        public function checkPlaylistExists($name) {
            $q = "SELECT * FROM $this->relationPlayList WHERE playlist_name = ?";
            $result = $this->db->prepare($q);
            $result->execute(array($name));
            $playlist = $result->fetch(PDO::FETCH_ASSOC);
            return !empty($playlist);
        }

        public function getMinID() {
            $q = "SELECT * FROM {$this->relationPlayList}";
            $result = $this->db->query($q)->fetch(PDO::FETCH_ASSOC);
            if (!empty($result)) {
                return 0;
            } else {
                return -1;
            }
        }

        public function getMaxID() {
            $result = $this->db->query("SELECT playlist_id FROM playlist ORDER BY playlist_id DESC LIMIT 1");
            $fetch = $result->fetch(PDO::FETCH_ASSOC);
            if (!empty($fetch)) {
                $last_id = $fetch['playlist_id'];
            } else {
                $last_id = -1;
            }
            return $last_id;
        }

        public function addPlaylist($user_id, $name, $songs_list, $picture) {
            if ($this->checkPlaylistExists($name)) {
                return 'Playlist name already used';
            } 
            try {
                $songs = array();
                $q = "SELECT song_id FROM $this->relationSong WHERE title = ?";
                $result = $this->db->prepare($q);
                foreach($songs_list as $title) {
                    $result->execute(array($title));
                    $fetch = $result->fetch(PDO::FETCH_ASSOC);
                    if (!empty($fetch)) {
                        $songs[] = $fetch;
                    } else {
                        // Lagu tidak ditemukan di database
                        return 'Song ' . $title . ' not found';
                    }
                }
                
                // Insert into playlist table
                $next_id = $this->getMaxID() + 1;
                $q = "INSERT INTO $this->relationPlayList VALUES (?, ?, ?)";
                $result = $this->db->prepare($q);
                $result->execute(array($next_id, $name, $picture));
                
                // Insert into playlist_song table
                $q = "INSERT INTO $this->relationPlayListSong VALUES (?,?)";
                $result = $this->db->prepare($q);
                foreach($songs as $song) {
                    $result->execute(array($next_id, $song['song_id']));
                }

                // Insert into user_playlist table
                $q = "INSERT INTO $this->relationUserPlaylist VALUES (?,?)";
                $result = $this->db->prepare($q);
                $result->execute(array($user_id, $next_id));

                return 'success';
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        public function getPlaylist($username) {
            $query = "SELECT playlist_name, playlist_picture FROM public.playlist NATURAL JOIN user_playlist NATURAL JOIN account  WHERE username = :username";
    
            $stmt = $this->db->prepare($query);
            $stmt->bindValue('username', $username);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        /*
        @param $title : title of the playlist
        @param $playlist_startview : the number of playlist that has been viewed
        */
        public function getPlaylistInSearchPage($title,$playlist_startview){
            try{
                $ps = intval($playlist_startview)*3;
                $query = "SELECT * FROM public.playlist WHERE playlist_name LIKE '%{$title}%' ORDER BY playlist_name ASC LIMIT 3 OFFSET {$ps}";
                $result = $this->db->query($query);
                $playlist = $result->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($playlist)) {
                    return json_encode($playlist);
                }
                return null;
            }
            catch(PDOException $e){
                return null;
            }
        }

        /*
        @param $title : title of the playlist
        */
        public function getLengthPlaylistInSearchPage($title){
            try{
                $query = "SELECT COUNT(*) FROM public.playlist WHERE playlist_name LIKE '%{$title}%';";
                $result = $this->db->query($query);
                $playlist = $result->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($playlist)) {
                    return ($playlist);
                }
                return null;
            }
            catch(PDOException $e){
                return null;
            }

        }

        public function playlistCreator($playlistName){
            $query = "SELECT username from playlist NATURAL JOIN user_playlist NATURAL JOIN account WHERE playlist_name= :playlist_name";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':playlist_name', $playlistName);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function getPlaylistID($playlistName) {
            $query = "SELECT playlist_id from playlist WHERE playlist_name= :playlist_name";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':playlist_name', $playlistName);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function getPlayListPic($playlistName) {
            $query = "SELECT playlist_picture from {$this->relationPlayList} WHERE playlist_name= :playlist_name";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':playlist_name', $playlistName);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        public function countSong($playlistName){
            $query = "SELECT COUNT(song_id) FROM playlist_song NATURAL JOIN playlist WHERE playlist_name= :playlist_name GROUP BY playlist_name";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':playlist_name', $playlistName);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);}
        
        public function getSong($playlistName) {
            $query = "SELECT title, artist, picture FROM playlist NATURAL JOIN playlist_song NATURAL JOIN song  WHERE playlist_name = :playlist_name";
    
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':playlist_name', $playlistName);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function editPlaylist($playlist_id, $playlist_name) {
            try {
                $prevParamExists = false;
                $q = "SELECT playlist_name FROM {$this->relationPlayList} WHERE playlist_name='{$playlist_name}'";
                $result = $this->db->query($q)->fetch(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    return 'Playlist name already used';
                }
                $q = "UPDATE {$this->relationPlayList} SET ";
                if ($playlist_name !== '') {
                    $q .= "playlist_name='{$playlist_name}' ";
                    $prevParamExists = true;
                }
                
                if (!$prevParamExists) { // Tidak ada value yang diupdate
                    return 'No parameter change given';
                } 
                $q .= "WHERE playlist_id={$playlist_id}";
                $this->db->query($q);
                return 'success';
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        public function deletePlaylist($playlist_id) {
            try {
                if ($playlist_id >= $this->getMinID() && $playlist_id <= $this->getMaxID()) {
                    $q = "DELETE FROM {$this->relationPlayList} WHERE playlist_id={$playlist_id}";
                    $this->db->query($q);
                    return 'success';
                } else {
                    return 'Playlist ID not valid';
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }
    }
?>