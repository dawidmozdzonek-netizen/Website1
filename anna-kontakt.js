  (function(){
    emailjs.init("WRNEx5Fyq8LIoXnxS"); // ← TU WKLEJ SWÓJ PUBLIC KEY
  })();
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_15yfvhc",   // np. service_gmail
    "template_23j2ukd",  // template z EmailJS
    this
  ).then(
    () => alert("Wysłane >>>>>"),
    (err) => alert("Błąd %@$# " + err.text)
  );
});


const contactForm = document.getElementById('kontakt-sekcja'); // Twoje ID formularza
const submitBtn = document.getElementById('submit-mail'); // Twoje ID przycisku


function aktualizujPrzycisk(pozostaloSekund) {
    if (pozostaloSekund <= 0) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Wyślij wiadomość";
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.disabled = true;
        // Obliczamy minuty i sekundy
        const m = Math.floor(pozostaloSekund / 60);
        const s = pozostaloSekund % 60;
        // Formatujemy czas tak, żeby zawsze były dwie cyfry sekund (np. 1:05 zamiast 1:5)
        const wyswietlanyCzas = `${m}:${s < 10 ? '0' : ''}${s}`;
        
        submitBtn.innerText = `${wyswietlanyCzas}`;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";

        // Wywołujemy funkcję ponownie za 1 sekundę
        setTimeout(() => aktualizujPrzycisk(pozostaloSekund - 1), 1000);
    }
}

// 1. Sprawdź blokadę przy starcie strony
window.onload = function() {
    const teraz = Date.now();
    const ostatniaWysylka = localStorage.getItem('formularz_wyslany');
    const czasBlokadyMs = 2 * 60 * 1000; // 2 minuty

    if (ostatniaWysylka && (teraz - ostatniaWysylka < czasBlokadyMs)) {
        const pozostaloMs = czasBlokadyMs - (teraz - ostatniaWysylka);
        aktualizujPrzycisk(Math.ceil(pozostaloMs / 1000));
    }
};

// 2. Obsługa wysyłki formularza
contactForm.addEventListener('submit', function(e) {
    // Ponowne sprawdzenie na wypadek, gdyby ktoś chciał "oszukać" kod
    const teraz = Date.now();
    const ostatniaWysylka = localStorage.getItem('formularz_wyslany');
    const czasBlokadyMs = 2 * 60 * 1000;

    if (ostatniaWysylka && (teraz - ostatniaWysylka < czasBlokadyMs)) {
        e.preventDefault();
        return;
    }

    // Zapisujemy czas wysyłki i odpalamy timer
    localStorage.setItem('formularz_wyslany', teraz);
    // Przycisk zablokuje się po ułamku sekundy (pozwoli formularzowi wysłać dane)
    setTimeout(() => aktualizujPrzycisk(120), 100); 
});
