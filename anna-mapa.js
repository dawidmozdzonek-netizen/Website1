const svg = document.getElementById('map-svg');
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;

// Zmienne dla dotyku (pinch zoom)
let initialDist = -1;

// Pomocnicza funkcja do aktualizacji widoku

const updateTransform = () => {
  svg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
};

// --- OBSŁUGA MYSZY (PAN) ---
svg.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX - offsetX * scale;
  startY = e.clientY - offsetY * scale;
});

window.addEventListener('mousemove', e => {
  if (!isDragging || e.touches) return; // e.touches zabezpiecza przed konfliktem
  offsetX = (e.clientX - startX) / scale;
  offsetY = (e.clientY - startY) / scale;
  updateTransform();
});

window.addEventListener('mouseup', () => isDragging = false);

// --- OBSŁUGA DOTYKU (PAN & PINCH ZOOM) ---
svg.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX - offsetX * scale;
    startY = e.touches[0].clientY - offsetY * scale;
  } else if (e.touches.length === 2) {
    // Start pinch zoom - oblicz dystans między palcami
    initialDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
});

svg.addEventListener('touchmove', e => {
  e.preventDefault(); // Blokuje scroll strony

  if (e.touches.length === 1 && isDragging) {
    // Przesuwanie (Pan)
    offsetX = (e.touches[0].clientX - startX) / scale;
    offsetY = (e.touches[0].clientY - startY) / scale;
  } 
  else if (e.touches.length === 2) {
    // Pinch to Zoom
    const currentDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );

    if (initialDist > 0) {
      const zoomFactor = currentDist / initialDist;
      const prevScale = scale;
      
      // Ograniczenie skali
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.5), 5);
      
      // Zoom do środka między palcami
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      offsetX = midX - ((midX - offsetX) * (newScale / prevScale));
      offsetY = midY - ((midY - offsetY) * (newScale / prevScale));
      
      scale = newScale;
      initialDist = currentDist;
    }
  }
  updateTransform();
}, { passive: false });

svg.addEventListener('touchend', () => {
  isDragging = false;
  initialDist = -1;
});

// --- KOŁO MYSZY (ZACHOWUJEMY TWÓJ KOD) ---
svg.addEventListener('wheel', e => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  const prevScale = scale;
  scale = Math.min(Math.max(scale * delta, 0.5), 5);

  offsetX = e.offsetX - ((e.offsetX - offsetX) * (scale / prevScale));
  offsetY = e.offsetY - ((e.offsetY - offsetY) * (scale / prevScale));
  updateTransform();
}, { passive: false });