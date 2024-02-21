import sanitize from "./sanitize.js";

var i = 2;

const imgUpload = document.getElementById('song-img-file');
imgUpload.addEventListener('change', (e) => {
    var image = document.getElementById('song-img');
    var imgUrl = URL.createObjectURL(e.target.files[0]);
    image.src = imgUrl;
});

const audioUpload = document.getElementById('song-audio-file');
const audioFileName = document.getElementById('song-audio');
audioUpload.addEventListener('change', (e) => {
    //var audioUrl = URL.createObjectURL(e.target.files[0]);
    // audio.src = audioUrl;
    if (audioUpload.files.length > 0) {
        audioFileName.textContent = audioUpload.files[0].name;
    } else {
        audioFileName.textContent = 'No file selected';
    }
});

const submit = document.getElementById('add-song');
submit.addEventListener('click', function(event) {
    event.preventDefault();
    if (confirm("Confirm add song ?")) {
        const form = document.getElementById('add-song-form');
        if (form) {
            let name = document.getElementById('song-name');
            let nameVal = sanitize(name.value);
            let artist = document.getElementById('song-artist');
            let artistVal = sanitize(artist.value);
            let genre = document.getElementById('song-genre');
            let genreVal = sanitize(genre.value);

            var fd = new FormData();
            fd.append("song_name", nameVal);
            fd.append("artist", artistVal);
            fd.append("genre", genreVal);
            fd.append("picture", imgUpload.files[0]);
            fd.append("audio", audioUpload.files[0]);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                    if (this.status == 200) {
                        // Berhasil save song
                        alert('Song saved successfully');
                    } else {
                        alert(this.responseText);
                    }
                }
            } 

            xhttp.open("POST", "../../controller/add_song_controller.php/", true);
            xhttp.send(fd);
            name.value = "";
            artist.value = "";
            genre.value = "";
            imgUpload.value = null;
            var image = document.getElementById('song-img');
            image.src = "#";
            audioUpload.value = null;
            var audio = document.getElementById('song-audio');
            audio.src = "#";
            audioFileName.textContent = "No file selected";
            } 
        }
    }
);