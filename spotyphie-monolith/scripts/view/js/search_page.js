let songs = [];
let playlists = [];

function myhref(url){
    window.location.href = url
}

function showSongResults(){
    let template = '\
    <div class="list-item" onClick = "myhref(\'{songpage}\')">\
        <img src="{imgsrc}" class="list-img">\
        <p>Title : {title} <br>\
            Author : {author}\
        </p>\
    </div>'

    let songResults = document.getElementById('song-results');

    for(let k in songs){
        let song = songs[k];
        let songpage = window.location.origin + "/pages/song_page.php?title=" + song.title;
        let songTemplate = template.replace('{imgsrc}', song.picture);
        songTemplate = songTemplate.replace('{title}', song.title);
        songTemplate = songTemplate.replace('{author}', song.artist);
        songTemplate = songTemplate.replace('{songpage}', songpage);
        songResults.innerHTML += songTemplate;
    }

}

function showNoSongResults(){
    document.getElementById('song-results').innerHTML = '<p> No song found </p>';
}

function showPlaylistResults(){
    let template = '\
    <div class="playlist-card"  onClick = "myhref(\'{playlistpage}\')">\
        <div class="playlist-card-image">\
            <img src={imgsrc} alt="">\
        </div>\
        <div class="playlist-card-title">\
            Playlist {title} \
        </div>\
    </div>'


    let res = '';
    for(let i = 0; i < playlists.length; i++){
        let playlist = playlists[i];
        let playlistpage = window.location.origin + "/pages/playlist_page.php?playlist_name=" + playlist.playlist_name;
        let playlistTemplate = template.replace('{imgsrc}', playlist.playlist_picture);
        playlistTemplate = playlistTemplate.replace('{title}', playlist.playlist_name);
        playlistTemplate = playlistTemplate.replace('{playlistpage}', playlistpage);
        res += playlistTemplate;
    }

    document.getElementById('playlist-results').innerHTML = res;

}

function showNoPlaylistResults(){
    document.getElementById('playlist-results').innerHTML = `<p>No playlist found</p>`;
}

/*
@ params
    playlists_startview : int
*/

function getPlaylistResults(){
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if(this.readyState == 4){
            if(this.status == 200){
                try{
                    playlists = JSON.parse(JSON.parse(this.responseText));      
                    showPlaylistResults();

                }
                catch{
                    showNoPlaylistResults();
                }
            }
        }
    }
    
    xhttp2.open("GET", "../../controller/search_page_controller.php?" + location.search.substring(1) + "&playlist=true", true);
    xhttp2.send();
}

function clickLeftButton(){
    let w = window.location.href;
    let current_startview = parseInt(new URLSearchParams(window.location.search).get('playlist_startview'));
     w = w.replace(`playlist_startview=${current_startview}`, `playlist_startview=${current_startview-1}`);
    if(current_startview > 0) window.location.href = w;
}

function clickRightButton(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try{
                    playlists = JSON.parse(this.responseText);      
                   
                    let current_startview = parseInt(new URLSearchParams(window.location.search).get('playlist_startview'));

                    if((current_startview + 1) * 3 < playlists[0].count){
                        let w = window.location.href;
                        w = w.replace(`playlist_startview=${current_startview}`, `playlist_startview=${current_startview+1}`);
                        window.location.href = w;
                    }
                }
                catch{
                    alert("something is wrong");
                }
                
            } else {
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("GET", "../../controller/search_page_controller.php?"+ location.search.substring(1) + "&playlist=len", true);
    xhttp.send();

}

window.addEventListener('DOMContentLoaded', (e) => {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try{
                    songs = JSON.parse(JSON.parse(this.responseText));
                    showSongResults();
                }
                catch{
                    showNoSongResults();
                }
                finally{
                    // get the playlists
                    getPlaylistResults();
                }
                
            } else {
                // Gagal mendapatkan daftar lagu, munculkan pesan error
                alert(this.responseText);
                return;
            }
        }
    }
    xhttp.open("GET", "../../controller/search_page_controller.php?" + location.search.substring(1), true);
    xhttp.send();
    

 });