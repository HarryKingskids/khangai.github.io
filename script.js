// DARK MODE TOGGLE
document.getElementById("modeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// TYPING EFFECT
const text = "9th Grader | Ravenclaw | Future MIT Engineer 🚀";
const typedText = document.getElementById("typed-text");
let index = 0;

function type() {
  if (index < text.length) {
    typedText.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 60);
  }
}
