document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
});



  // === Efekt animacji dla ARTYKUŁÓW ===
  document.addEventListener("DOMContentLoaded", function() {
    const articles = document.querySelectorAll("article");

    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85;

      articles.forEach(article => {
        const rect = article.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          article.classList.add("show");
        }
      });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // sprawdź przy starcie
  });


    // === Efekt animacji dla ARTYKUŁÓW ===
  document.addEventListener("DOMContentLoaded", function() {
    const Headers = document.querySelectorAll(".podnag");

    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85;

      Headers.forEach(podnag => {
        const rect = podnag.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          podnag.classList.add("show");
        }
      });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // sprawdź przy starcie
  });


      // === Efekt animacji dla ARTYKUŁÓW ===
  document.addEventListener("DOMContentLoaded", function() {
    const Headers = document.querySelectorAll(".nauka");

    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85;

      Headers.forEach(nauka => {
        const rect = nauka.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          nauka.classList.add("show");
        }
      });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // sprawdź przy starcie
  });



