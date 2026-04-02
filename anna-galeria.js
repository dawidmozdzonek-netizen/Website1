const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const thumbs = document.querySelectorAll('.carousel img.thumb');

// Kliknięcie miniaturki otwiera duże zdjęcie
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    lightboxImg.src = thumb.src;
    lightbox.style.display = 'flex';
  });
});

// Kliknięcie w dowolne miejsce poza zdjęciem zamyka lightbox
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) { // tylko jeśli nie kliknięto samego zdjęcia
    lightbox.style.display = 'none';
  }
});
