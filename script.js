 // ✅ Signup
function signup() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user && pass) {
    localStorage.setItem(user, pass);
    document.getElementById('msg').textContent = "✅ Registered successfully!";
  } else {
    document.getElementById('msg').textContent = "❗ Fill in all fields!";
  }
}

// ✅ Login
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const storedPass = localStorage.getItem(user);

  if (storedPass === pass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "home.html";
  } else {
    document.getElementById('msg').textContent = "❌ Wrong username or password.";
  }
}

// ✅ Check login status
function checkLogin() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Please log in first!");
    window.location.href = "index.html";
  } else {
    loadSavedJobs();
  }
}

// ✅ Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ✅ Save job
function saveJob(jobName) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) return;

  let savedJobs = JSON.parse(localStorage.getItem(user + "_jobs")) || [];
  if (!savedJobs.includes(jobName)) {
    savedJobs.push(jobName);
    localStorage.setItem(user + "_jobs", JSON.stringify(savedJobs));
    loadSavedJobs();
  }
}

// ✅ Load saved jobs
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
