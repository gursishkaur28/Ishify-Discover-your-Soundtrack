const quotes = [

  "Music is what feelings sound like.",

  "Where words fail, music speaks.",

  "One good song can change your mood instantly.",

  "Life feels better with headphones on.",

  "Music gives a soul to the universe."

];



const quoteText =
document.getElementById("quoteText");



const randomQuote =

quotes[
Math.floor(
Math.random() * quotes.length
)
];



quoteText.textContent =
randomQuote;



/* PROFILE EDIT */

const editBtn =
document.getElementById("editProfileBtn");

const editModal =
document.getElementById("editModal");

const saveBtn =
document.getElementById("saveProfileBtn");



const userName =
document.getElementById("userName");

const userEmail =
document.getElementById("userEmail");



editBtn.addEventListener("click",()=>{

  editModal.style.display =
  "flex";

});



saveBtn.addEventListener("click",()=>{

  const newName =
  document.getElementById("newName").value;

  const newEmail =
  document.getElementById("newEmail").value;

  const newBirthday =
  document.getElementById("newBirthday").value;



  if(newName){

    userName.textContent =
    newName;

  }



  if(newEmail){

    userEmail.textContent =
    newEmail;

  }



  if(newBirthday){

    document.querySelector(
      ".birthday-card"
    ).textContent =

    "🎂 Birthday: " +
    newBirthday;

  }



  editModal.style.display =
  "none";

});



/* CHANGE PROFILE PHOTO */

const changePhotoBtn =
document.getElementById("changePhotoBtn");



changePhotoBtn.addEventListener("click",()=>{

  const imageUrl =
  prompt(
   "Paste image URL"
  );



  if(imageUrl){

    document.querySelector(
      ".profile-pic"
    ).src = imageUrl;

  }

});



/* LOGOUT */

const logoutBtn =
document.getElementById("logoutBtn");



logoutBtn.addEventListener("click",()=>{

  const confirmLogout =
  confirm(
    "Are you sure you want to logout?"
  );



  if(confirmLogout){

    window.location.href =
    "login.html";

  }

});