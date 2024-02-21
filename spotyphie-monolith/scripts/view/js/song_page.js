import sanitize from "./sanitize.js";

var songs, currId, maxId;

function showEditPopup() {
    var popup = document.getElementById("song-popup-wrapper");
    popup.style.display = 'flex';
}

function hideEditPopup() {
    var popup = document.getElementById("song-popup-wrapper");
    popup.style.display = 'none';
}

function showSongByTitle(titleString) {
    let params = "?method=title&value=" + titleString;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                songs = JSON.parse(JSON.parse(this.responseText));

                currId = songs[0].song_id;
                const img = document.getElementById("song-img");
                img.setAttribute("src", songs[0].picture);
                const title = document.getElementById("song-title");
                title.innerHTML = songs[0].title;
                const artist = document.getElementById("song-artist");
                artist.innerHTML = songs[0].artist;
                const audioSrc = document.getElementById("song-source");
                audioSrc.src = songs[0].audio;
                const audio = document.getElementById("song-player");
                audio.load();
                
                const prevBtn = document.getElementById("left-song-button");
                const nextBtn = document.getElementById("right-song-button");
                if (currId == 0) {
                    prevBtn.style.visibility = 'hidden';
                } else {
                    prevBtn.style.visibility = 'visible';
                }
                if (currId == maxId) {
                    nextBtn.style.visibility = 'hidden';
                } else {
                    nextBtn.style.visibility = 'visible';
                }
            } else {
                // Gagal mendapatkan daftar lagu, munculkan pesan error
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("GET", "../../controller/song_page_controller.php" + params, true);
    xhttp.send();
}

function showSongById(id) {
    let params = "?method=id&value=" + id;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                songs = JSON.parse(JSON.parse(this.responseText));

                // Set elements
                currId = songs[0].song_id;
                const img = document.getElementById("song-img");
                img.setAttribute("src", songs[0].picture);
                const title = document.getElementById("song-title");
                title.innerHTML = songs[0].title;
                const artist = document.getElementById("song-artist");
                artist.innerHTML = songs[0].artist;
                const audioSrc = document.getElementById("song-source");
                audioSrc.src = songs[0].audio;
                const audio = document.getElementById("song-player");
                audio.load();

                const prevBtn = document.getElementById("left-song-button");
                const nextBtn = document.getElementById("right-song-button");
                if (currId == 0) {
                    prevBtn.style.visibility = 'hidden';
                } else {
                    prevBtn.style.visibility = 'visible';
                }
                if (currId == maxId) {
                    nextBtn.style.visibility = 'hidden';
                } else {
                    nextBtn.style.visibility = 'visible';
                }
            } else {
                // Gagal mendapatkan daftar lagu, munculkan pesan error
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("GET", "../../controller/song_page_controller.php" + params, true);
    xhttp.send();
}

function showNextSong() {
    showSongById(currId + 1);
}

function showPrevSong() {
    showSongById(currId - 1);
}

function editSong(id, title, artist, genre) {
    let params = "method=edit&id=" + id + "&title=" + title + "&artist=" + artist + "&genre=" + genre;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Song edited successfully");
                showSongById(id);
            } else {
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("POST", "../../controller/song_page_controller.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function deleteSong(id) {
    let params = "id=" + id;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Song deleted successfully");
            } else {
                alert(this.responseText);
            }
        }
    }
    xhttp.open("DELETE", "../../controller/song_page_controller.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

const apply = document.getElementById("apply-song-edit");
const del = document.getElementById("delete-song");

apply.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById("song-title-edit");
    const artist = document.getElementById("song-artist-edit");
    const genre = document.getElementById("song-genre-edit");
    if (confirm("Apply changes ?")) {
        editSong(currId, sanitize(title.value), sanitize(artist.value), sanitize(genre.value));
        var popup = document.getElementById("song-popup-wrapper");
        popup.style.display = 'none';
    }
    showSongById(currId);
    title.value="";
    artist.value="";
    genre.value="";
})

del.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Delete song ?")) {
        deleteSong(currId);

        const title = document.getElementById("song-title-edit");
        const artist = document.getElementById("song-artist-edit");
        const genre = document.getElementById("song-genre-edit");

        title.value="";
        artist.value="";
        genre.value="";
    }
    window.location.href = window.location.pathname;
})

window.addEventListener('DOMContentLoaded', (e) => {
    let params = "?method=maxID";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                maxId = Number(this.responseText);
                var queryString = location.search.substring(1);
                var urlParam = new URLSearchParams(queryString);
                if (urlParam.get('title')) {
                    showSongByTitle(urlParam.get('title'));
                } else {
                    showSongById(0);
                }
            } else {
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("GET", "../../controller/song_page_controller.php" + params, true);
    xhttp.send();
})

window.showEditPopup = showEditPopup;
window.hideEditPopup = hideEditPopup;
window.showNextSong = showNextSong;
window.showPrevSong = showPrevSong;