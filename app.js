const songGrid = document.getElementById("songGrid");
const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const speed = document.getElementById("speed");

const searchInput = document.getElementById("searchInput");

const homeBtn = document.getElementById("homeBtn");
const searchBtn = document.getElementById("searchBtn");
const likedBtn = document.getElementById("likedBtn");
const artistBtn = document.getElementById("artistBtn");
const profileBtn = document.getElementById("profileBtn");
const themeBtn = document.getElementById("themeBtn");

const homePage = document.getElementById("homePage");
const artistPage = document.getElementById("artistPage");

let songs = [];
let likedSongs = [];

let currentSong = 0;
let isPlaying = false;

/* ARTISTS */

const artists = [

{
name:"Arijit Singh",
image:"images/arijit.jpg",
query:"arijit singh"
},

{
name:"Neha Kakkar",
image:"images/neha.jpg",
query:"neha kakkar"
},

{
name:"Diljit Dosanjh",
image:"images/diljit.jpg",
query:"diljit dosanjh"
},

{
name:"Karan Aujla",
image:"images/karan.jpg",
query:"karan aujla"
},

{
name:"Shubh",
image:"images/shubh.jpg",
query:"shubh"
},

{
name:"Sidhu Moosewala",
image:"images/sidhu.jpg",
query:"sidhu moosewala"
}

];
/* FETCH SONGS */

async function fetchSongs(query = "punjabi") {

songGrid.innerHTML = `
<h2 class="loading">
Loading Songs 🎵
</h2>
`;

try {

const response = await fetch(
`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
);

const data = await response.json();

songs = data.data;

renderSongs();

}

catch(error){

console.log(error);

songGrid.innerHTML = `
<h2 class="loading">
API Failed 😭
</h2>
`;

}

}

/* RENDER SONGS */

function renderSongs(){

songGrid.innerHTML = "";

songs.forEach((song,index)=>{

const card = document.createElement("div");

card.classList.add("song-card");

card.innerHTML = `

<img src="${song.album.cover_medium}">

<h3>${song.title}</h3>

<p>${song.artist.name}</p>

<button class="like-btn">

  <i class="fa-solid fa-heart"></i>

</button>

`;

card.addEventListener("click",()=>{

loadSong(index);

});

const likeBtn =
card.querySelector(".like-btn");

likeBtn.addEventListener("click",(e)=>{

e.stopPropagation();

likedSongs.push(song);

alert("Music Liked ❤️");

});

songGrid.appendChild(card);

});

}

/* LOAD SONG */

function loadSong(index){

const song = songs[index];

if(!song.preview){

alert("Preview unavailable 😭");

return;

}

currentSong = index;

audio.src = song.preview;

title.innerText = song.title;
artist.innerText = song.artist.name;
cover.src = song.album.cover_medium;

playSong();

}

/* PLAY */

function playSong(){

audio.play();

isPlaying = true;

playBtn.innerHTML = "⏸";

}

/* PAUSE */

function pauseSong(){

audio.pause();

isPlaying = false;

playBtn.innerHTML = "▶";

}

/* PLAY BUTTON */

playBtn.addEventListener("click",()=>{

if(!audio.src){

alert("Select Song First 🎵");

return;

}

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

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);

});

/* PREVIOUS */

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong < 0){

currentSong = songs.length - 1;

}

loadSong(currentSong);

});

/* PROGRESS */

audio.addEventListener("timeupdate",()=>{

progress.max = audio.duration;
progress.value = audio.currentTime;

});

progress.addEventListener("input",()=>{

audio.currentTime = progress.value;

});

/* VOLUME */

volume.addEventListener("input",()=>{

audio.volume = volume.value / 100;

});

/* SPEED */

speed.addEventListener("change",()=>{

audio.playbackRate = speed.value;

});

/* SEARCH */

searchInput.addEventListener("input",(e)=>{

if(e.target.value.length > 0){

fetchSongs(e.target.value);

}

});

/* GENRE BUTTONS */

const genreBtns =
document.querySelectorAll(".genre-btn");

genreBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

fetchSongs(btn.dataset.query);

});

});

/* HOME */

homeBtn.addEventListener("click",()=>{

artistPage.style.display = "none";
homePage.style.display = "block";

fetchSongs("trending punjabi");

});

/* SEARCH */

searchBtn.addEventListener("click",()=>{

searchInput.focus();

});

/* LIKED */

likedBtn.addEventListener("click",()=>{

artistPage.style.display = "none";
homePage.style.display = "block";

if(likedSongs.length === 0){

songGrid.innerHTML = `
<h2 class="loading">
No Liked Songs ❤️
</h2>
`;

return;

}

songs = likedSongs;

renderSongs();

});

/* PROFILE */

profileBtn.addEventListener(
"click",
()=>{

window.location.href =
"profile.html";

}
);

/* ARTISTS */

artistBtn.addEventListener("click",()=>{

homePage.style.display = "none";
artistPage.style.display = "block";

const artistGrid =
document.querySelector(".artist-grid");

artistGrid.innerHTML = "";

artists.forEach((artistData)=>{

const card =
document.createElement("div");

card.classList.add("artist-card");

card.innerHTML = `

<img 
src="${artistData.image}"
onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'"
>

<h3>${artistData.name}</h3>

`;

card.addEventListener("click",()=>{

artistPage.style.display = "none";
homePage.style.display = "block";

fetchSongs(artistData.query);

});

artistGrid.appendChild(card);

});

});

/* RECENTLY PLAYED */

let recentSongs = [];

/* LOAD SONG */

function loadSong(index){

const song = songs[index];

if(!song.preview){

alert("Preview unavailable 😭");

return;

}

currentSong = index;

audio.src = song.preview;

title.innerText = song.title;

artist.innerText = song.artist.name;

cover.src = song.album.cover_medium;

/* ADD TO RECENT */

const exists =
recentSongs.find(
(item)=> item.id === song.id
);

if(!exists){

recentSongs.unshift(song);

}

/* LIMIT */

if(recentSongs.length > 15){

recentSongs.pop();

}

playSong();

}

/* RECENT BUTTON */

const recentBtn =
document.getElementById("recentBtn");

recentBtn.addEventListener(
"click",
()=>{

artistPage.style.display =
"none";

homePage.style.display =
"block";

if(recentSongs.length === 0){

songGrid.innerHTML = `
<h2 class="loading">
No Recently Played Songs 🎵
</h2>
`;

return;

}

songs = recentSongs;

renderSongs();

alert("🕓 Recently Played Loaded");

}
);

/* DARK MODE */

let darkMode = false;

themeBtn.addEventListener("click",()=>{

darkMode = !darkMode;

document.body.classList.toggle("light");

if(darkMode){

alert("Light Mode On ☀️");

}

else{

alert("Dark Mode On 🌙");

}

});

/* INITIAL */

artistPage.style.display = "none";

fetchSongs();