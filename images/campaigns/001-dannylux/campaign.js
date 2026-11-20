

/* =========================
   START AT TOP
========================= */

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


/* =========================
   SONORA. — CAMPAIGN 001
   LANGUAGE SWITCH
========================= */

const languageButtons = document.querySelectorAll(
    '.campaign-language button'
);

const translatableElements = document.querySelectorAll(
    '[data-en][data-es]'
);

function changeLanguage(language) {

    // Change all translated texts
    translatableElements.forEach(element => {

        element.textContent = element.getAttribute(
            `data-${language}`
        );

    });

    // Update active language button
    languageButtons.forEach(button => {

        button.classList.remove('is-active');

        if (button.textContent.trim().toLowerCase() === language) {
            button.classList.add('is-active');
        }

    });

    // Update document language
    document.documentElement.lang = language;
}

// Language button events
languageButtons.forEach(button => {

    button.addEventListener('click', () => {

        const language = button.textContent.trim().toLowerCase();

        changeLanguage(language);

    });

});

// Default language
changeLanguage('en');



/* =========================
   LOADING SCREEN
========================= */

function hideLoadingScreen() {

    const loadingScreen = document.querySelector('.loading-screen');

    if (!loadingScreen) return;

    setTimeout(() => {

        loadingScreen.classList.add('loaded');

        setTimeout(() => {
            loadingScreen.remove();
        }, 800);

    }, 2000);
}

if (document.readyState === 'complete') {
    hideLoadingScreen();
} else {
    window.addEventListener('load', hideLoadingScreen);
}


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.querySelector('.campaign-menu-toggle');
const mobileMenu = document.querySelector('.campaign-mobile-menu');
const mobileLinks = document.querySelectorAll('.campaign-mobile-menu nav a');

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener('click', () => {

        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        const isOpen = mobileMenu.classList.contains('active');

        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close menu' : 'Open menu'
        );

    });

    mobileLinks.forEach(link => {

        link.addEventListener('click', () => {

            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');

            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');

        });

    });

}
