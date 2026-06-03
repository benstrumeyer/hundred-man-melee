let screenEl;
function updateLoadingText(text) { const t = document.getElementById("loadTextEdit"); if (t) t.innerHTML = `${text}...`; }
document.addEventListener("DOMContentLoaded", () => {
  screenEl = document.getElementById("loadScreen");
  updateLoadingText("Initializing");
  window.start();
  if (screenEl) { screenEl.className = "fadeout"; setTimeout(() => screenEl.remove(), 300); }
});
