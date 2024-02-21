let search_url = ``;
var titleValue = "";
var artistValue = "";
var genreValue = "";
var sortedTitleValue = "";
var sortedArtistValue = "";

function logoutRequest() {
    // Lakukan logout
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../../helper/session.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("for=logout");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("../../pages/login_page.php");
        }
    }
}


function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  
  function saveInput() {
    titleValue = document.getElementById('searching').value
    artistValue = document.getElementById('artist').value;
    genreValue = document.getElementById('genre').value;
    sortedTitleValue = document.getElementById('sort').checked;
    sortedArtistValue = document.getElementById('sort-artist').checked;
    search_url = `search_page.php?title=${titleValue}&artist=${artistValue}&genre=${genreValue}&sort=${sortedTitleValue}&sort_artist=${sortedArtistValue}&playlist_startview=0`;
  }
  
  // Membuat fungsi debounce untuk saveInput
  const processChange = debounce(() => saveInput());

window.addEventListener('DOMContentLoaded', (e) => {
    var popupButton = document.getElementById('popupButton');
    var popup = document.getElementById('popup');
    var closeButton = document.getElementById('closeButton');
    var searchForm = document.getElementById('search-form')
    var userButton = document.getElementById('user-button');
    var dropDown = document.getElementById('nav-dropdown');
    var dropDownMobile = document.getElementById('nav-dropdown-mobile');
    var logoutButton = document.getElementById('logout-button');
    var logoutButtonMobile = document.getElementById('logout-button-mobile');
  
    popupButton.addEventListener('click', function() {
        popup.style.display = 'flex';
    });
  
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    searchForm.addEventListener('submit', (e) =>{
        e.preventDefault(); 
        console.log(titleValue)
        if(titleValue !== "") window.location.href = search_url;
    })

    // Tambahkan event listener untuk event 'keyup'
    searchForm.addEventListener('keyup', processChange);

    userButton.addEventListener('click', (e) => {
        if (window.innerWidth >= 810) {
            dropDown.style.display = 'block';
            dropDownMobile.style.display = 'none';
        } else {
            dropDown.style.display = 'none';
            dropDownMobile.style.display = 'block';
        }
    })

    logoutButton.addEventListener('click', (e) => {
        logoutRequest();
    })

    logoutButtonMobile.addEventListener('click', (e) => {
        logoutRequest();
    })

    window.addEventListener('click', (e) => {
        if (!e.target.matches('#user-button')) {
            dropDown.style.display = 'none';
            dropDownMobile.style.display = 'none';
        }
    })
  });