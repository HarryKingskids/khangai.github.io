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
    // ✅ Redirect to profile page after successful login
    window.location.href = "profile.html";
  }
}
