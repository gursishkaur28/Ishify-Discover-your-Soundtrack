const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("ishifyUser", username);

  window.location.href = "index.html";

});