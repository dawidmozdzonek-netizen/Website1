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
document.querySelectorAll("#nav-header").forEach(link => {
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
sections.forEach(section => observer.observe(section));



function showLang(lang, btn) {
  document.querySelectorAll('.lang-content').forEach(el => el.style.display = 'none');
  document.querySelector(`.lang-content.${lang}`).style.display = 'block';

  document.querySelectorAll('.lang-switcher button').forEach(b => b.classList.remove('active-lang'));
  btn.classList.add('active-lang');
}

window.addEventListener('DOMContentLoaded', () => {
  const plBtn = document.getElementById('btn-pl');
  plBtn.classList.add('active-lang');
  showLang('pl', plBtn);
});

// animacje
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.ukidate, .div1, .div2, .p, .wycieczka-1, .wycieczka-2, .wycieczka-3, .wycieczka-4, .wycieczka-5, .wycieczka-6, li');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');  // dodajemy klasę CSS
        observer.unobserve(entry.target);       // tylko raz
      }
    });
  }, { threshold: 0.2 }); // 20% kafelka w widoku

  items.forEach(item => observer.observe(item));
});
// Łapiemy link "BIOGRAFIA" (rodzica)
const menuBio = document.querySelector(".a0").parentElement; 
const lista = document.querySelector(".lista");
/*
menuBio.addEventListener("mouseenter", () => {
    lista.classList.add("pokaz-liste");
});

menuBio.addEventListener("mouseleave", () => {
    lista.classList.remove("pokaz-liste");
});
moze kidy indziej...*/
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

/* Przy ładowaniu strony – ustawiamy motyw z localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark") {
    setTheme(true);
  } else {
    setTheme(false);
  }
});*/


document.querySelectorAll('.boxed-text').forEach(el => {
  const text = el.textContent;
  el.textContent = '';

  [...text].forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    el.appendChild(span);
  });
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

  document.body.style.overflow = 'auto';
  document.getElementById('cookie-overlay').style.display = 'none';
}


accept.addEventListener('click', () => {
  localStorage.setItem('cookies', 'accepted');
  hideBanner();
  initTracking();
});  

// Odrzucenie
reject.addEventListener('click', () => {
  localStorage.setItem('cookies', 'rejected');
  hideBanner();
  // nic nie włączamy
});

 //Przy starcie strony
document.addEventListener('DOMContentLoaded', () => {
  const status = localStorage.getItem('cookies');
  if(status === 'accepted') {
    hideBanner();
    initTracking();
  } else if(status === 'rejected') {
    hideBanner();
  }
});


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















/* ======================================
   MODAL – OTWIERANIE / ZAMYKANIE
   ====================================== */
const panel = document.getElementById('lista-inwalicka');
const button = document.getElementById('inwalida-poz');

button.addEventListener('click', () => {
  panel.classList.toggle('poza-hiden');
});







menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});


console.log("Znalezione sekcje:", sections); 
console.log("Mapa menu:", menuMap);
const LOADER_TIME = 1000;
const FADE_TIME = 800; 

const loader = document.getElementById("loader");
const content = document.getElementById("content");

setTimeout(() => {
  loader.classList.add("fade-out");
  content.style.visibility = "visible";

  setTimeout(() => {
    loader.remove(); 
  }, FADE_TIME);

}, LOADER_TIME);


setTimeout(() => {
  loader.classList.add("hidden"); 
  content.style.visibility = "visible"; 
}, LOADER_TIME);



