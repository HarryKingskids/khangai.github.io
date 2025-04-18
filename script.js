function signup() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if (user && pass) {
    localStorage.setItem(user, JSON.stringify({ password: pass, role: role }));
    document.getElementById('msg').textContent = "✅ Registered!";
  } else {
    document.getElementById('msg').textContent = "❗ Fill all fields!";
  }
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const stored = JSON.parse(localStorage.getItem(user));

  if (stored && stored.password === pass && stored.role === role) {
    localStorage.setItem("loggedInUser", user);
    localStorage.setItem("loggedInRole", role);
    window.location.href = role === "user" ? "home.html" : "company.html";
  } else {
    document.getElementById('msg').textContent = "❌ Wrong info!";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("loggedInRole");
  window.location.href = "index.html";
}

function checkLogin(requiredRole) {
  const user = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("loggedInRole");
  if (!user || role !== requiredRole) {
    alert("Please log in as a " + requiredRole);
    window.location.href = "index.html";
  } else {
    loadSavedJobs();
  }
}

function saveJob(jobName) {
  const user = localStorage.getItem("loggedInUser");
  let savedJobs = JSON.parse(localStorage.getItem(user + "_jobs")) || [];
  if (!savedJobs.includes(jobName)) {
    savedJobs.push(jobName);
    localStorage.setItem(user + "_jobs", JSON.stringify(savedJobs));
    loadSavedJobs();
  }
}

function loadSavedJobs() {
  const user = localStorage.getItem("loggedInUser");
  const savedJobs = JSON.parse(localStorage.getItem(user + "_jobs")) || [];
  const jobList = document.getElementById("savedJobsList");
  if (jobList) {
    jobList.innerHTML = "";
    savedJobs.forEach(job => {
      const li = document.createElement("li");
      li.textContent = job;
      jobList.appendChild(li);
    });
  }
}

// Profile functions
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
