<?php 
    class Song {
        private $relation;
        private $db;

        public function __construct() {
            try{
                $this->relation = 'song';
                $this->db = require_once 'db.php';
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }

        public function getMinID() {
            $q = "SELECT * FROM {$this->relation}";
            $result = $this->db->query($q)->fetch(PDO::FETCH_ASSOC);
            if (!empty($result)) {
                return 0;
            } else {
                return -1;
            }
        }

        public function getMaxID() {
            $result = $this->db->query("SELECT song_id FROM {$this->relation} ORDER BY song_id DESC LIMIT 1");
            $fetch = $result->fetch(PDO::FETCH_ASSOC);
            if (!empty($fetch)) {
                $max_id = $fetch['song_id'];
            } else {
                $max_id = -1;
            }
            return $max_id;
        }

        public function getAllSongs() {
            try {
                $q = "SELECT * FROM {$this->relation}";
                $result = $this->db->query($q);
                $songs = $result->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($songs)) {
                    return json_encode($songs);
                }
                return null;
            } catch (PDOException $e) {
                return null;
            }
        }

        public function getSongByParams($id, $title, $artist, $genre) {
            try {
                if (!isset($id) && !isset($title) && !isset($artist) && !isset($genre)) {
                    // Semua parameter kosong. Gunakan getAllSongs()
                    return $this->getAllSongs();
                } 
                $prevParamExists = false; // Fungsi untuk menentukan apakah perlu menambahkan AND pada query
                $q = "SELECT * FROM {$this->relation} WHERE ";
                if (isset($id)) {
                    $q .= "song_id='{$id}'";
                    $prevParamExists = true;
                }
                if (isset($title)) {
                    if ($prevParamExists) {
                        $q .= " AND ";
                    } else {
                        $prevParamExists = true;
                    }
                    $q .= "title='{$title}'";
                }
                if (isset($artist)) {
                    if ($prevParamExists) {
                        $q .= " AND ";
                    } else {
                        $prevParamExists = true;
                    }
                    $q .= "artist='{$artist}'";
                }
                if (isset($genre)) {
                    if ($prevParamExists) {
                        $q .= " AND ";
                    } else {
                        $prevParamExists = true;
                    }
                    $q .= "genre='{$genre}'";
                }
                $result = $this->db->query($q);
                $songs = $result->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($songs)) {
                    return json_encode($songs);
                }
                return null;
            } catch (PDOException $e) {
                return null;
            }
        }

        public function getSongByID($id) {
            return $this->getSongByParams($id, null, null, null);
        }

        public function getSongByTitle($title) {
            return $this->getSongByParams(null, $title, null, null);
        }

        public function getSongByArtist($artist) {
            return $this->getSongByParams(null, null, $artist, null);
        }

        public function getSongByGenre($genre) {
            return $this->getSongByParams(null, null, null, $genre);
        }

        public function getRandomSongs($limit) {
            $minID = $this->getMinID();
            $maxID = $this->getMaxID();

            if ($minID != -1) { // Tabel tidak kosong
                try {
                    $rand_val = rand($minID, $maxID);
                    $range = $maxID - $rand_val;
                    if ($range < $limit) {
                        // Jika range terlalu kecil, ubah rand_val supaya memenuhi limit yang diminta
                        $rand_val = max(0, $rand_val-($limit-$range));
                    }
                    $q = "SELECT * FROM {$this->relation} WHERE song_id >= {$rand_val} LIMIT {$limit}";
                    $result = $this->db->query($q);
                    $songs = $result->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($songs)) {
                        return json_encode($songs);
                    }
                    return null;
                } catch (PDOException $e) {
                    return null;
                }
            }
            return null;
        }

        /*
        @param $title : Judul lagu
        @param $artist : Penyanyi lagu
        @param $genre : Genre lagu
        @param $sorted : Apakah hasil pencarian ingin diurutkan berdasarkan judul lagu
        @param $sorted_artist: Apakah hasil pencarian ingin diurutkan berdasarkan penyanyi lagu
        */
        public function getSongInSearchPage($title, $artist, $genre, $sorted, $sorted_artist) {
            try {
                if (!isset($id) && !isset($title) && !isset($artist) && !isset($genre)) {
                    // Semua parameter kosong. Gunakan getAllSongs()
                    return $this->getAllSongs();
                } 
                
                $q = "SELECT * FROM {$this->relation} WHERE title LIKE '%{$title}%'";
                $arr = [$artist, $genre];
                $counter = 0;
                foreach ($arr as $param) {
                    if ($param !== '') {
                         $q .= " AND ";
                         switch ($counter) {
                             case 0:
                                $q .= "artist = '{$param}'";
                                break;
                            case 1:
                                $q .= "genre = '{$param}'";
                                break;
                         }
                    }
                }

                
                if ($sorted && $sorted_artist) {
                    $q .= " ORDER BY title ASC, artist ASC";
                }
                else if($sorted){
                    $q .= " ORDER BY title ASC";
                }
                else if($sorted_artist){
                    $q .= " ORDER BY artist ASC";
                }

                $result = $this->db->query($q);
                $songs = $result->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($songs)) {
                    return json_encode($songs);
                }
                return null;
            } catch (PDOException $e) {
                return null;
            }
        }

        public function editSong($id, $title, $artist, $genre) {
            try {
                $prevParamExists = false;
                $q = "SELECT title FROM {$this->relation} WHERE title='{$title}'";
                $result = $this->db->query($q)->fetch(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    return 'Song title already used';
                }
                $q = "UPDATE {$this->relation} SET ";
                if ($title !== '') {
                    $q .= "title='{$title}' ";
                    $prevParamExists = true;
                }
                if ($artist !== '') {
                    if ($prevParamExists) {
                        $q .= ", ";
                    } else {
                        $prevParamExists = true;
                    }
                    $q .= "artist='{$artist}' ";
                }
                if ($genre !== '') {
                    if ($prevParamExists) {
                        $q .= ", ";
                    } else {
                        $prevParamExists = true;
                    }
                    $q .= "genre='{$genre}' ";
                }

                if (!$prevParamExists) { // Tidak ada value yang diupdate
                    return 'No parameter change given';
                } 
                $q .= "WHERE song_id={$id}";
                $this->db->query($q);
                return 'success';
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        public function deleteSong($id) {
            try {
                if ($id >= $this->getMinID() && $id <= $this->getMaxID()) {
                    $q = "DELETE FROM {$this->relation} WHERE song_id='{$id}'";
                    $this->db->query($q);
                    return 'success';
                } else {
                    return 'Song ID not valid';
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        public function addSong($title, $artist, $genre, $audio, $picture) {
            try {
                $next_id =$this->getMaxID()+1;
                $q = "INSERT INTO {$this->relation} VALUES (?,?,?,?,?,?)";
                $result= $this->db->prepare($q);
                $result->execute(array($next_id, $title, $artist, $genre, $audio, $picture));
                return 'success';
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }
    }   
?>