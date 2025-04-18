// 🔐 LOGIN / SIGNUP

function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("loginMsg").textContent = "⚠️ Please enter both fields.";
    return;
  }

  if (localStorage.getItem(username)) {
    document.getElementById("loginMsg").textContent = "❌ Username already exists.";
  } else {
    localStorage.setItem(username, JSON.stringify({ password }));
    document.getElementById("loginMsg").textContent = "✅ Signed up successfully!";
  }
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem(username));

  if (!user) {
    document.getElementById("loginMsg").textContent = "❌ User not found.";
  } else if (user.password !== password) {
    document.getElementById("loginMsg").textContent = "❌ Incorrect password.";
  } else {
    document.getElementById("loginMsg").textContent = "✅ Login successful!";
    localStorage.setItem("loggedInUser", username);
    window.location.href = "profile.html";
  }
}

// 👤 PROFILE HANDLING

function saveProfile() {
  const user = localStorage.getItem("loggedInUser");
  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;
  const image = document.getElementById("image").files[0];
  const video = document.getElementById("video").files[0];

  const profile = { name, bio };

  const reader = new FileReader();
  reader.onload = function () {
    profile.image = reader.result;

    const videoReader = new FileReader();
    videoReader.onload = function () {
      profile.video = videoReader.result;
      localStorage.setItem(user + "_profile", JSON.stringify(profile));
      document.getElementById("msg").textContent = "✅ Profile saved!";
      showPreview(profile);
    };

    if (video) videoReader.readAsDataURL(video);
    else {
      localStorage.setItem(user + "_profile", JSON.stringify(profile));
      document.getElementById("msg").textContent = "✅ Profile saved!";
      showPreview(profile);
    }
  };

  if (image) reader.readAsDataURL(image);
  else {
    localStorage.setItem(user + "_profile", JSON.stringify(profile));
    document.getElementById("msg").textContent = "✅ Profile saved!";
    showPreview(profile);
  }
}

function loadProfile() {
  const user = localStorage.getItem("loggedInUser");
  const profile = JSON.parse(localStorage.getItem(user + "_profile")) || {};
  document.getElementById("name").value = profile.name || "";
  document.getElementById("bio").value = profile.bio || "";
  showPreview(profile);
}

function showPreview(profile) {
  const div = document.getElementById("preview");
  div.innerHTML = "";

  if (profile.image) {
    const img = document.createElement("img");
    img.src = profile.image;
    img.style.width = "200px";
    div.appendChild(img);
  }

  if (profile.video) {
    const vid = document.createElement("video");
    vid.src = profile.video;
    vid.controls = true;
    vid.style.width = "200px";
    div.appendChild(vid);
  }
}
