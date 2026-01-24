/* =====================================================================
   FOOTER – GENEROWANY DYNAMICZNIE
   INFO:
   - Footer jest wstrzykiwany do <div id="footer-placeholder">
   - Dzięki temu nie trzeba go kopiować do każdej strony
   - Zmiany robimy w jednym miejscu (tu!!!), a nie w HTML!!!
   ===================================================================== */
document.getElementById('footer-placeholder').innerHTML = `
<footer class="footer">
    <div class="footer-about">
        <h3 class="olol">dawidmozdzonek</h3>
        <p></p>
    </div>
    
    <div class="media">
        <div class="mpun facebook">
        <a href="https://www.facebook.com/SargeThePlayer" target="_blank">
            <i class="fab fa-facebook-f"></i>
        </a>
        </div>

        <div class="mpun yt">
        <a href="https://www.youtube.com/user/SargeThePlayer" target="_blank">
            <i class="fab fa-youtube"></i>
        </a>
        </div>

        <div class="mpun instagram">
        <a href="https://www.instagram.com/robertmaklowicz_official/" target="_blank">
            <i class="fab fa-instagram"></i>
        </a>
        </div>

        <div class="mpun x">
        <a href="https://x.com/SargeThePlayer" target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
        </div>

        <div class="mpun tiktok">
        <a href="https://tiktok.com" target="_blank">
            <i class="fab fa-tiktok"></i>
        </a>
        </div>
    </div>
    <div class="footer-links">
             <nav id="nav-footer" class="nav-footer">
                <ul class="ulul-foter">
                    <li><a class="a0 sas" href="#naglowek">G Ł Ó W N A</a></li>
                    <li><a class="a0 sas" href="#dlaczego-ekologia">O M N I E</a></li>
                    <li><a class="a0 sas" href="#porady">B I O G R A F I A</a></li>
                </ul>
            </nav>
    </div>


    <div class="footer-copy">
       Copyright© 2025 DawidMozdzonek — designed by: | Dawid Mozdzonek |
    </div>
    </footer>
`;

const toggleBtn = document.getElementById("toggle-theme");
const contrastBtn = document.getElementById("wysoki-kontrast");
// Funkcja ustawiająca motyw
function setDarkTheme(enabled) {
  document.body.classList.toggle("dark-theme", enabled);
  if (enabled) document.body.classList.remove("contrast");
  localStorage.setItem("theme", enabled ? "dark" : "light");
}

function setContrastTheme(enabled) {
  document.body.classList.toggle("contrast", enabled);
  if (enabled) document.body.classList.remove("dark-theme");
  localStorage.setItem("theme", enabled ? "contrast" : "light");
}

// Obsługa kliknięcia przycisku
toggleBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-theme");
  setDarkTheme(isDark);
});

contrastBtn.addEventListener("click", () => {
  const isContrast = !document.body.classList.contains("contrast");
  setContrastTheme(isContrast);
});

// Przy ładowaniu strony – ustawiamy motyw z localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark") {
    setTheme(true);
  } else {
    setTheme(false);
  }
});


/* =====================================================================
  pojawianie reponsywnego menu 
   ===================================================================== */
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav-header");
const overlay = document.getElementById("overlay");

// kliknięcie burgera – toggle menu + X i overlay
burger.addEventListener("click", () => {
  burger.classList.toggle("open"); // zmienia burger w X
  nav.classList.toggle("open");    // pokazuje / ukrywa menu
  overlay.classList.toggle("active"); // pokazuje / ukrywa overlay
});

// kliknięcie w link w menu – zamyka menu i overlay
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
    overlay.classList.remove("active");
  });
});

// kliknięcie w overlay – zamyka menu i overlay
overlay.addEventListener("click", () => {
  burger.classList.remove("open");
  nav.classList.remove("open");
  overlay.classList.remove("active");
});


/* =====================================================================
  klikniecie w menu (pozostawienie psaka na dole zamienia na [.a0.active])
   ===================================================================== */

const menuItems = document.querySelectorAll('#nav-header .a0');


menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});





/* =====================================================================
   przeskakiwanie podkreslenia w pasku nav w menu 
   ===================================================================== */

const sections = [...menuItems]
  .map(item => document.querySelector(item.getAttribute('href')))
  .filter(el => el !== null);

const menuMap = {};
menuItems.forEach(item => {
    const id = item.getAttribute('href').slice(1);
    menuMap[id] = item;
});

// procent widocznosc ekranu
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuItems.forEach(i => i.classList.remove('active'));
            menuMap[entry.target.id].classList.add('active');
        }
    });
}, {
    threshold: 0.55 // 55% widoczne
});






/* =====================================================================
  zmiana wielkosci paska vaigacji po scrollowaniu(na - [nav.scrolled])
   ===================================================================== */

sections.forEach(section => observer.observe(section));
const ulul = document.getElementById('nav');




/* ======================================
   MODAL – OTWIERANIE / ZAMYKANIE
   ====================================== */
const modal       = document.getElementById('modal');
const btn         = document.getElementById('button-wiecej');
const closeBtn    = document.getElementById('zamknij');
const modalClas   = document.getElementsByClassName(`modal`)

// POKAZUJE MODAL
btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden'); 
});

// UKRYWA MODAL
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden'); 
});




localStorage.removeItem('fontsConsent');
/* ======================================
   COOKIES
   ====================================== */

const banner = document.getElementById('cookie-banner');
const accept = document.getElementById('accept');
const reject = document.getElementById('reject');

function hideBanner() {
  banner.style.display = 'none';
// To odblokuje scrollowanie całej strony:
  document.body.style.overflow = 'auto';
  document.getElementById('cookie-overlay').style.display = 'none';
}

// Akceptacja
accept.addEventListener('click', () => {
  localStorage.setItem('cookies', 'accepted');
  hideBanner();
  initTracking(); // funkcja uruchamiająca analitykę / reklamy
});

// Odrzucenie
reject.addEventListener('click', () => {
  localStorage.setItem('cookies', 'rejected');
  hideBanner();
  // nic nie włączamy
});

// Przy starcie strony
//document.addEventListener('DOMContentLoaded', () => {
//  const status = localStorage.getItem('cookies');
//  if(status === 'accepted') {
//    hideBanner();
//    initTracking();
//  } else if(status === 'rejected') {
//    hideBanner();
//  }
//});


//wesprzuj
  const btnNN = document.querySelector('.wesprzyj-button');


/*
// Tablica z nazwami Twoich plików graficznych
const zdjecia = [
  "assets/lisc-2.jpg",
  "assets/image.png", 
  "assets/image — kopia.png", 
  "assets/lisc-2.jpg"
];

let index = 0;
const obrazek = document.getElementById("rotator");

function zmienZdjecie() {
  / 2. Poczekaj 500ms (czas trwania transition), aż zdjęcie zniknie
  setTimeout(function() {
      index++;
      if (index >= zdjecia.length) {
          index = 0;
      }
      
      // 3. Zmień źródło zdjęcia
      obrazek.src = zdjecia[index];

      // 4. Gdy zdjęcie się załaduje, przywróć widoczność
      obrazek.onload = function() {
          obrazek.style.opacity = 1;
      };
  }, 100); 
}

setInterval(zmienZdjecie, 3000);
/*h*/


const letters = "日月火水木金土田由甲申鬼龍神WXYZ1234567890!@#$%^&*";

const element = document.getElementById("htext");
let interval = null;

element.addEventListener("mouseenter", () => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = element.dataset.text
      .split("")
      .map((char, index) => {
        if (index < iteration) {
          return element.dataset.text[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= element.dataset.text.length) {
      clearInterval(interval);
    }

    iteration += 1 / 2;
  }, 30);
});


// Łapiemy link "BIOGRAFIA" (rodzica)
const menuBio = document.querySelector(".a0").parentElement; 
const lista = document.querySelector(".lista");

menuBio.addEventListener("mouseenter", () => {
    lista.classList.add("pokaz-liste");
});

menuBio.addEventListener("mouseleave", () => {
    lista.classList.remove("pokaz-liste");
});










/* ======================================
   MODAL – OTWIERANIE / ZAMYKANIE
   ====================================== */
const panel = document.getElementById('lista-inwalicka');
const button = document.getElementById('inwalida-poz');

button.addEventListener('click', () => {
  panel.classList.toggle('poza-hiden');
});





console.log("Znalezione sekcje:", sections); 
console.log("Mapa menu:", menuMap);

const LOADER_TIME = 1000;
const FADE_TIME = 800; // MUSI = transition w CSS

const loader = document.getElementById("loader");
const content = document.getElementById("content");

setTimeout(() => {
  loader.classList.add("fade-out");
  content.style.visibility = "visible";

  setTimeout(() => {
    loader.remove(); // 💀 pewne usunięcie
  }, FADE_TIME);

}, LOADER_TIME);


setTimeout(() => {
  loader.classList.add("hidden"); // 🔥 po 3 sekundach znika
  content.style.visibility = "visible"; // pokazujemy content
}, LOADER_TIME);
