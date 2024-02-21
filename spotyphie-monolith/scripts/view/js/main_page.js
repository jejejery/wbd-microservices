function addForYouItem(title, artist, picture) {
    const btn = document.createElement("button");
    btn.type="button";
    btn.classList.add("list-btn");
    btn.classList.add("white-text");
    const pic = document.createElement("img");
    pic.setAttribute("src", picture);
    pic.setAttribute("alt", "song picture");
    pic.classList.add("list-img");
    const desc = document.createElement("p");
    desc.classList.add('inter-font');
    desc.innerHTML = "Title : " + title + "<br>Author : " + artist;
    btn.appendChild(pic);
    btn.appendChild(desc);
    btn.addEventListener('click', (e) => {
        location.replace("song_page.php?title=" + title);
    })

    var container = document.getElementById("for-you-container");
    container.appendChild(btn);
}

function addTopItem(title, artist, picture, number) {
    const grid_cont = document.createElement("div");
    grid_cont.classList.add("grid-item");
    const num = document.createElement("p");
    num.classList.add("white-text");
    num.classList.add("baloo-font");
    num.innerHTML = number;
    const btn = document.createElement("button");
    btn.type="button";
    btn.classList.add("grid-btn");
    const pic = document.createElement("img");
    pic.setAttribute("src", picture);
    pic.setAttribute("alt", "song picture");
    pic.classList.add("list-img");
    const desc = document.createElement("p");
    desc.classList.add('inter-font');
    desc.classList.add('white-text');
    desc.innerHTML = "Title : " + title + "<br>Author : " + artist;
    btn.appendChild(pic);
    btn.appendChild(desc);
    btn.addEventListener('click', (e) => {
        location.replace("song_page.php?title=" + title);
    })
    grid_cont.appendChild(num);
    grid_cont.appendChild(btn);

    var container = document.getElementById("top-songs-container");
    container.appendChild(grid_cont);
}

window.addEventListener('DOMContentLoaded', (e) => {
    // Hapus semua isi list
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                songs = JSON.parse(JSON.parse(this.responseText));
                for (var i in songs) {
                    addForYouItem(songs[i].title, songs[i].artist, songs[i].picture);
                }
            } else {
                // Gagal mendapatkan daftar lagu, munculkan pesan error
                alert(this.responseText);
            }
        }
    }
    xhttp.open("GET", "../../controller/main_controller.php?for=forYou", true);
    xhttp.send();

    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                songs = JSON.parse(JSON.parse(this.responseText));
                for (var i in songs) {
                    addTopItem(songs[i].title, songs[i].artist, songs[i].picture, Number(i) + 1);
                }
            } else {
                // Gagal mendapatkan daftar lagu, munculkan pesan error
                alert(this.responseText);
            }
        }
    }
    xhttp2.open("GET", "../../controller/main_controller.php?for=top", true);
    xhttp2.send();
})