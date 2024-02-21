import sanitize from "./sanitize.js";

function toSongPage(title) {
    location.replace("song_page.php?title=" + title);
}

function showEditPopup() {
    var popup = document.getElementById("playlist-popup-wrapper");
    popup.style.display = 'flex';
}

function hideEditPopup() {
    var popup = document.getElementById("playlist-popup-wrapper");
    popup.style.display = 'none';
}

function editPlaylist(playlist_id, playlist_name) {
    let params = "method=edit&playlist_id=" + playlist_id + "&playlist_name=" + playlist_name;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Playlist edited successfully");
                document.getElementById("playlist-title").textContent = playlist_name;
                // showPlaylistById(playlist_id);
            } else {
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("POST", "../../controller/playlist_controller.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function deletePlaylist(playlist_id) {
    let params = "id=" + playlist_id;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Playlist deleted successfully");
                location.replace("../../pages/my_playlist_page.php");
            } else {
                alert(this.responseText);
            }
        }
    }
    xhttp.open("DELETE", "../../controller/playlist_controller.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}
const apply = document.getElementById("apply-playlist-edit");
const del = document.getElementById("delete-playlist");
var currId = document.getElementById("playlist-id").value;
    
apply.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Apply changes ?")) {
        const title = document.getElementById("playlist-name-edit");
        const newPlaylistName = sanitize(title.value);

        editPlaylist(currId, newPlaylistName);

        title.value="";
    }
});

del.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Delete Playlist ?")) {
        deletePlaylist(currId);

        const title = document.getElementById("playlist-name-edit");

        title.value="";
        location.reload();
    }
});

//const editPlaylistButton = document.getElementById('edit-playlist');
//if (`<?php echo $_SESSION['username']; ?>` !== `<?php echo $creator; ?>`) {
  //  editPlaylistButton.style.display = 'none';
  //}

window.showEditPopup = showEditPopup;
window.hideEditPopup = hideEditPopup;
window.toSongPage = toSongPage;