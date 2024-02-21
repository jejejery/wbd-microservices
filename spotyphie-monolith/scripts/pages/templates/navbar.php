<?php
function getNavBar($username = 'user', $is_admin = false) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/pages/templates/page_links.php';

    $html = <<<EOT
    <nav>
        <a href="{$main_page}" class="nav-logo"></a>
        <div id="search-bar-container" class="nav-item"> <!-- Tambahkan class="nav-item" di sini -->
            <form id="search-form">
                <input type="text" id="searching" placeholder="title..."/>
                <a id="popupButton">☰</a>
            </form>
        </div>
EOT;

    if ($is_admin) {
        $html .= <<<EOT
        <a href="{$user_list_page}" class="baloo-font nav-item nav-link">User List</a>
EOT;
    }

    $html .= <<<EOT
        <a href="{$add_playlist_page}" class="baloo-font nav-item nav-link">Add Playlist</a>
        <a href="{$my_playlist_page}" class="baloo-font nav-item nav-link">My Playlist</a>
        <a href="{$add_song_page}" class="baloo-font nav-item nav-link">Add Song</a>
        <div class="dropdown">
            <button type="button" id ="user-button" class="nav-item baloo-font nav-btn white-text">Hi, $username!</button>
            <div id="nav-dropdown" class="dropdown-content baloo-font">
                <a href="{$user_page}">User Page</a>
                <a href="#" id="logout-button">Log out</a>
            </div>
            <div id="nav-dropdown-mobile" class="dropdown-content baloo-font">
                <a href="{$user_page}">User Page</a>
                <a href="{$add_playlist_page}" class="baloo-font nav-item nav-link">Add Playlist</a>
                <a href="{$my_playlist_page}" class="baloo-font nav-item nav-link">My Playlist</a>
                <a href="{$add_song_page}" class="baloo-font nav-item nav-link">Add Song</a>
                <a href="#" id="logout-button-mobile">Log out</a>
            </div>
        </div>
    </nav>

    <!-- Popup -->
    <div id="popup" class="popup white-text baloo-font">
        <div class="popup-content">
            <span class="close" id="closeButton">&times;</span>
            <h2>Advanced Search</h2>
            <form>
                <label for="artist">Artist:</label><br>
                <input type="text" id="artist" name="artist"><br>
                <label for="genre">Genre:</label><br>
                <input type="text" id="genre" name="genre"><br><br>
                <input type="checkbox" id="sort" name="sorted">
                <label for="sorted"> Order by title</label><br>
                <input type="checkbox" id="sort-artist" name="sorted">
                <label for="sorted"> Order by artist (song)</label><br>
            </form>
        </div>
    </div>
      

EOT;

    echo $html;
}
?>
