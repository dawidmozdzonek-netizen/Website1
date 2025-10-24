document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
});



// === ANIMACJE SCROLLA ===
document.addEventListener("DOMContentLoaded", function() {
  const animatedElements = document.querySelectorAll("article, .podnag, .nauka");

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (rect.top < triggerBottom && rect.bottom > 0) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
});






window.addEventListener("load", function() {
  const loadingScreen = document.getElementById("loading-screen");

  // minimalny czas wyświetlania: 3 sekundy
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 2000);
});


document.addEventListener("DOMContentLoaded", function() {
  const naglki = document.querySelectorAll(".nagl");

  function checkScroll() {
    if (window.innerWidth > 600) return; // tylko mobile

    const triggerBottom = window.innerHeight * 0.85;

    naglki.forEach(nagl => {
      const rect = nagl.getBoundingClientRect();
      if (rect.top < triggerBottom && rect.bottom > 0) {
        nagl.classList.add("show");
      } else {
        nagl.classList.remove("show"); // jeśli chcesz efekt odwrotny przy przewinięciu w górę
      }
    });
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
});

