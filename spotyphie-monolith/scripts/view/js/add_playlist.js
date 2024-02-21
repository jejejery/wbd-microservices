import sanitize from "./sanitize.js";

var i = 2;

function getTextBox() {
    let newText = '<label for="song' + i + '" class="white-text inter-font">Song ' + i + '</label><br><input type="text" name="song' + i + '" id="song' + i + '" class="txtbox-med"/><br>';
    i += 1;
    return newText;
}

function addSongInput() {
    let newTextBox = document.createElement('DIV');
    newTextBox.innerHTML = getTextBox();
    document.getElementById('textBoxContainer').appendChild(newTextBox);
}

const imgUpload = document.getElementById('playlist-img-file');
imgUpload.addEventListener('change', (e) => {
    var image = document.getElementById('playlist-img');
    var imgUrl = URL.createObjectURL(e.target.files[0]);
    image.src = imgUrl;
});

const submit = document.getElementById('add-playlist');
submit.addEventListener('click', function(event) {
    event.preventDefault();
    if (confirm("Confirm add playlist ?")) {
        const form = document.getElementById('add-playlist-form');
        if (form) {
            let name = document.getElementById('playlist-name');
            let nameVal = sanitize(name.value);
            if (nameVal.length == 0) {
                alert('Playlist name shouldn\'t be empty');
                return;
            }
            var fd = new FormData();
            fd.append("playlist_name", nameVal);

            let songs = [];
            let songTitles = [];
            for (let j=1; j<i; j++) {
                songs.push(document.getElementById('song'+ j));
                let title = sanitize(songs[j-1].value);
                if (title.length > 0) {
                    songTitles.push(title);
                    fd.append("song_titles[]", title);
                }
            }

            if (songTitles.length > 0) {
                fd.append("picture", imgUpload.files[0]);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            // Berhasil save playlist
                            alert('Playlist saved successfully');
                        } else {
                            // Gagal log in, munculkan pesan error
                            alert(this.responseText);
                        }
                    } 
                }
                xhttp.open("POST", "../../controller/add_playlist_controller.php/", true);
                xhttp.send(fd);

                name.value = "";
                songs.forEach(element => {
                    element.value = "";
                });
                imgUpload.value = null;
                var image = document.getElementById('playlist-img');
                image.src = "#";
            } else {
                alert('Songs shouldn\'t be empty');
            }
        }
    }
});

window.addSongInput = addSongInput;