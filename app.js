let likedSongs = [];

let recentSongs = [];

let queueSongs = [];



const songGrid =
document.getElementById("songGrid");

const audio =
document.getElementById("audio");

const playBtn =
document.getElementById("play");

const nextBtn =
document.getElementById("next");

const prevBtn =
document.getElementById("prev");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const cover =
document.getElementById("cover");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");

const searchInput =
document.getElementById("searchInput");



let songs = [];

let currentSong = 0;

let isPlaying = false;



/* API FETCH */

/* API FETCH */

async function fetchSongs(query = "top"){

  try{

    songGrid.innerHTML =

    `<h2 class="loading">
      Loading songs... 🎧
    </h2>`;


    const response = await fetch(

      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,

      {

        method:"GET",

        headers:{

          "X-RapidAPI-Key":
          "1ce54a44e2mshdf802179ea2fb48p117228jsnce26e2c70d3b",

          "X-RapidAPI-Host":
          "deezerdevs-deezer.p.rapidapi.com"

        }

      }

    );



    if(!response.ok){

      throw new Error(
        "API Request Failed"
      );

    }



    const data =
    await response.json();



    if(!data.data ||
       data.data.length === 0){

      songGrid.innerHTML =

      `<h2 class="loading">
        No songs found 😭
      </h2>`;

      return;

    }



    songs = data.data;

    renderSongs(songs);

  }



  catch(error){

    console.log(error);



    songGrid.innerHTML =

    `<h2 class="loading">
      API Failed 😭
      <br><br>
      Try Again Later
    </h2>`;

  }

}



/* RENDER SONGS */

function renderSongs(songArray){

  songGrid.innerHTML = "";

  songArray.forEach((song,index)=>{

    const card =
    document.createElement("div");

    card.classList.add("song-card");



    card.innerHTML = `

      <img src="${song.album.cover_medium}">

      <h3>${song.title}</h3>

      <p>${song.artist.name}</p>

    `;



    /* PLAY SONG */

    card.addEventListener("click",()=>{

      loadSong(index);

      playSong();

    });



    /* LIKE SONG */

    card.addEventListener("dblclick",()=>{

      likedSongs.push(song);

      alert(
        song.title +
        " added to liked songs ❤️"
      );

    });



    /* OPEN SONG PAGE */

    card.addEventListener("contextmenu",(e)=>{

      e.preventDefault();

      localStorage.setItem(
        "selectedSong",
        JSON.stringify(song)
      );

      window.location.href =
      "song.html";

    });



    songGrid.appendChild(card);

  });

}



/* LOAD SONG */

function loadSong(index){

  const song = songs[index];

  audio.src = song.preview;

  title.textContent = song.title;

  artist.textContent = song.artist.name;

  cover.src = song.album.cover_medium;



  /* RECENTLY PLAYED */

  recentSongs.unshift(song);

  if(recentSongs.length > 10){

    recentSongs.pop();

  }



  currentSong = index;

}



/* PLAY */

function playSong(){

  audio.play();

  isPlaying = true;

  playBtn.textContent = "⏸";

}



/* PAUSE */

function pauseSong(){

  audio.pause();

  isPlaying = false;

  playBtn.textContent = "▶";

}



/* PLAY BUTTON */

playBtn.addEventListener("click",()=>{

  if(isPlaying){

    pauseSong();

  }

  else{

    playSong();

  }

});



/* NEXT */

nextBtn.addEventListener("click",()=>{

  currentSong++;

  if(currentSong > songs.length - 1){

    currentSong = 0;

  }

  loadSong(currentSong);

  playSong();

});



/* PREV */

prevBtn.addEventListener("click",()=>{

  currentSong--;

  if(currentSong < 0){

    currentSong = songs.length - 1;

  }

  loadSong(currentSong);

  playSong();

});



/* SEARCH */

searchInput.addEventListener("keyup",(e)=>{

  const query = e.target.value;

  if(query.length > 0){

    fetchSongs(query);

  }

});



/* GENRE BUTTONS */

const genreCards =
document.querySelectorAll(".genre-card");

genreCards.forEach(card => {

  card.addEventListener("click",()=>{

    const genre =
    card.dataset.genre;



    if(genre === "punjabi"){

      fetchSongs(
        "punjabi hits"
      );

    }



    else if(genre === "romantic"){

      fetchSongs(
        "romantic songs"
      );

    }



    else if(genre === "hiphop"){

      fetchSongs(
        "hip hop"
      );

    }



    else if(genre === "lofi"){

      fetchSongs(
        "lofi songs"
      );

    }



    else{

      fetchSongs(genre);

    }

  });

});



/* PROGRESS */

audio.addEventListener("timeupdate",()=>{

  progress.max = audio.duration;

  progress.value = audio.currentTime;

});



progress.addEventListener("input",()=>{

  audio.currentTime = progress.value;

});

/* VOLUME CONTROL */

volume.addEventListener("input",()=>{

  audio.volume = volume.value;

});

/* AUTO NEXT */

audio.addEventListener("ended",()=>{

  currentSong++;

  if(currentSong > songs.length - 1){

    currentSong = 0;

  }

  loadSong(currentSong);

  playSong();

});



/* DARK MODE */

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

  document.body.classList.toggle("dark");

});



/* SIDEBAR BUTTONS */

const menuItems =
document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {

  item.addEventListener("click",()=>{

    menuItems.forEach(nav => {

      nav.classList.remove("active");

    });

    item.classList.add("active");



    const text =
    item.textContent;



    if(text.includes("Search")){

        searchInput.focus();



        document
        .getElementById("trendingSection")
        .scrollIntoView({

        behavior:"smooth"

    });

}



    if(text.includes("Liked")){

      renderSongs(likedSongs);

    }



    if(text.includes("Recently")){

      renderSongs(recentSongs);

    }



    if(text.includes("Home")){

      fetchSongs();

    }



    if(text.includes("Artists")){

      fetchSongs("artist");

    }



    if(text.includes("Library")){

      alert(
       "Your Library Opened 📚"
      );

    }



    if(text.includes("Profile")){

      window.location.href =
      "profile.html";

    }

  });

});



/* PLAYLIST INTERACTION */

const playlists =
document.querySelectorAll(".playlist-card");

playlists.forEach(playlist => {

  playlist.addEventListener("click",()=>{

    playlist.style.background =
    "#4D0E13";

    playlist.style.color =
    "white";



    setTimeout(()=>{

      playlist.style.background =
      "#F5EEE8";

      playlist.style.color =
      "#4D0E13";

    },800);

  });

});



/* INITIAL FETCH */

fetchSongs();
/* PROFILE IMAGE */

const profileTopbar =
document.getElementById("profileTopbar");



profileTopbar.addEventListener("click",()=>{

  window.location.href =
  "profile.html";

});