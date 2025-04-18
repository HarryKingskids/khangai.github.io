// Function to save profile details
function saveProfile() {
  const user = localStorage.getItem("loggedInUser");
  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;
  const image = document.getElementById("image").files[0];
  const video = document.getElementById("video").files[0];

  // Create profile object
  const profile = { name, bio };

  const reader = new FileReader();
  
  // Read the image file
  reader.onload = function () {
    profile.image = reader.result;

    // Handle video upload
    const videoReader = new FileReader();
    videoReader.onload = function () {
      profile.video = videoReader.result;

      // Save profile to localStorage
      localStorage.setItem(user + "_profile", JSON.stringify(profile));
      document.getElementById("msg").textContent = "✅ Profile saved!";
      showPreview(profile); // Show the profile preview
    };

    if (video) videoReader.readAsDataURL(video);
    else {
      // Save profile if no video
      localStorage.setItem(user + "_profile", JSON.stringify(profile));
      document.getElementById("msg").textContent = "✅ Profile saved!";
      showPreview(profile); // Show the profile preview
    }
  };

  if (image) reader.readAsDataURL(image);
  else {
    // Save profile if no image
    localStorage.setItem(user + "_profile", JSON.stringify(profile));
    document.getElementById("msg").textContent = "✅ Profile saved!";
    showPreview(profile); // Show the profile preview
  }
}

// Function to load profile data
function loadProfile() {
  const user = localStorage.getItem("loggedInUser");
  const profile = JSON.parse(localStorage.getItem(user + "_profile")) || {};
  
  // Fill in the profile details (name and bio)
  document.getElementById("name").value = profile.name || "";
  document.getElementById("bio").value = profile.bio || "";
  
  // Show preview of profile image and video
  showPreview(profile);
}

// Function to display profile preview (image & video)
function showPreview(profile) {
  const div = document.getElementById("preview");
  div.innerHTML = ""; // Clear previous previews

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
