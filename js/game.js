const TOTAL_MARKERS = 3;
const foundMarkers = new Set();

const countEl = document.getElementById("count");
const cluesEl = document.getElementById("clues");
const finalOverlay = document.getElementById("finalOverlay");
const cheer = document.getElementById("cheer");

const ping = new Audio("./assets/sounds/ping.mp3");

window.addEventListener("DOMContentLoaded", () => {
  const markers = document.querySelectorAll("a-marker");

  markers.forEach((marker, index) => {
    const id = `marker-${index + 1}`;

    marker.addEventListener("markerFound", () => {
      if (!foundMarkers.has(id)) {
        foundMarkers.add(id);
        console.log(`✅ Detectado: ${id}`);
        ping.play().catch(() => {});
        updateUI();
        if (foundMarkers.size === TOTAL_MARKERS) {
          setTimeout(showFinalFeedback, 600);
        }
      }
    });

    marker.addEventListener("markerLost", () => {
      console.log(`❌ Perdido: ${id}`);
    });
  });

  document.getElementById("closeFinal").addEventListener("click", () => {
    finalOverlay.classList.remove("show");
  });

  updateUI();
});

function updateUI() {
  countEl.textContent = foundMarkers.size;
  if (foundMarkers.size === 0)
    cluesEl.textContent = "Busca el marcador inicial para comenzar.";
  else if (foundMarkers.size < TOTAL_MARKERS)
    cluesEl.textContent = `Encontrados: ${Array.from(foundMarkers).join(", ")}`;
  else
    cluesEl.textContent = "¡Todos los marcadores encontrados!";
}

function showFinalFeedback() {
  finalOverlay.classList.add("show");
  try { cheer.play(); } catch (e) {}
}
