
// =========================
// MOBILE MENU
// =========================

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Open and close menu
menuToggle.addEventListener('click', () => {

    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');

    const isOpen = navbar.classList.contains('active');

    menuToggle.setAttribute('aria-expanded', isOpen);

    menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close menu' : 'Open menu'
    );

});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        navbar.classList.remove('active');
        menuToggle.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');

    });

});


// =========================
// LANGUAGE SELECTOR
// =========================

const languageOptions = document.querySelectorAll('.language-option');
const translatableElements = document.querySelectorAll('[data-en][data-es]');

function changeLanguage(language) {

    // Translate all elements
translatableElements.forEach(element => {

    const translation = element.getAttribute(`data-${language}`);

    if (translation !== null) {
        element.textContent = translation;
    }

});
    // Update active button
    languageOptions.forEach(button => {
        button.classList.toggle(
            'is-active',
            button.dataset.lang === language
        );
    });

    // Update HTML language
    document.documentElement.lang = language;
    renderVoteResults();

}

// Language buttons
languageOptions.forEach(button => {

    button.addEventListener('click', () => {
        changeLanguage(button.dataset.lang);
    });

});


// =========================
// SOUND WAVE FREQUENCY
// =========================

const wave = document.querySelector('.wave-line');
const waveContainer = document.querySelector('.footer-wave');

const footerLinks = document.querySelectorAll(
    '.footer-nav a, .footer-logo'
);

const wavePatterns = {
    home: "M0 70 Q15 70 30 55 T60 70 T90 85 T120 70 T150 45 T180 70 T210 90 T240 70 T270 50 T300 70 T330 85 T360 70 T390 45 T420 70 T450 90 T480 70 T510 55 T540 70 T570 85 T600 70",

    about: "M0 70 Q20 20 40 70 T80 70 T120 20 T160 70 T200 70 T240 20 T280 70 T320 70 T360 20 T400 70 T440 70 T480 20 T520 70 T560 70 T600 70",

    music: "M0 70 Q10 5 20 70 T40 70 T60 5 T80 70 T100 70 T120 5 T140 70 T160 70 T180 5 T200 70 T220 70 T240 5 T260 70 T280 70 T300 5 T320 70 T340 70 T360 5 T380 70 T400 70 T420 5 T440 70 T460 70 T480 5 T500 70 T520 70 T540 5 T560 70 T580 70 T600 70",

    journal: "M0 70 Q30 15 60 70 T120 70 T180 15 240 70 T300 70 T360 15 420 70 T480 70 T540 15 600 70",

    gallery: "M0 70 Q20 40 40 70 T80 70 T120 40 T160 70 T200 70 T240 40 T280 70 T320 70 T360 40 T400 70 T440 70 T480 40 T520 70 T560 70 T600 70"
};

// Línea recta al iniciar
wave.setAttribute('d', wavePatterns.home);

footerLinks.forEach(link => {

    link.addEventListener('mouseenter', () => {

        const section = link.getAttribute('href').replace('#', '');
        const pattern = wavePatterns[section] || wavePatterns.home;

        wave.setAttribute('d', pattern);
        waveContainer.classList.add('is-playing');

    });

link.addEventListener('mouseleave', () => {

    wave.setAttribute('d',
        "M0 70 Q15 70 30 55 T60 70 T90 85 T120 70 T150 45 T180 70 T210 90 T240 70 T270 50 T300 70 T330 85 T360 70 T390 45 T420 70 T450 90 T480 70 T510 55 T540 70 T570 85 T600 70"
    );

    waveContainer.classList.remove('is-playing');

});

});


// =========================
// LOADING SCREEN
// =========================

const loadingScreen = document.querySelector('.loading-screen');

window.addEventListener('load', () => {

    setTimeout(() => {

        loadingScreen.classList.add('loading-finished');

    }, 2500);

});

// =========================
// SONORA. — CAMPAIGN VOTING
// =========================

const voteButtons = document.querySelectorAll('.vote-button');

const voteStorageKey = 'sonoraCampaignVotes';

const candidateIds = [
    'weeknd',
    'badbunny',
    'tyler',
    'billie',
    'rosalia',
    'travis'
];

// Load saved votes
function getVoteData() {

    const savedData = localStorage.getItem(voteStorageKey);

    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (error) {
            console.error('Could not load saved votes:', error);
        }
    }

    return {
        counts: {
            weeknd: 0,
            badbunny: 0,
            tyler: 0,
            billie: 0,
            rosalia: 0,
            travis: 0
        },
        hasVoted: false,
        selected: null
    };
}

let voteData = getVoteData();

// Save votes
function saveVoteData() {
    localStorage.setItem(voteStorageKey, JSON.stringify(voteData));
}

// Show results
function renderVoteResults() {

    const totalVotes = Object.values(voteData.counts)
        .reduce((total, votes) => total + votes, 0);

    const language = document.documentElement.lang;

    const cancelButton = document.querySelector('.cancel-vote-button');

    if (cancelButton) {
        cancelButton.hidden = !voteData.hasVoted;
    }

    document.querySelectorAll('.campaign-card').forEach(card => {

        const button = card.querySelector('.vote-button');

        card.classList.toggle(
    'has-voted',
    voteData.hasVoted
);

card.classList.toggle(
    'is-selected',
    voteData.selected === button.dataset.vote
);

        if (!button) return;

        const candidate = button.dataset.vote;

        if (!candidateIds.includes(candidate)) return;

        let result = card.querySelector('.vote-result');

        if (!result) {
            result = document.createElement('div');
            result.classList.add('vote-result');

            const label = document.createElement('span');
            label.classList.add('vote-result-label');

            const bar = document.createElement('div');
            bar.classList.add('vote-result-bar');

            const fill = document.createElement('div');
            fill.classList.add('vote-result-fill');

            bar.appendChild(fill);
            result.appendChild(label);
            result.appendChild(bar);

            card.appendChild(result);
        }

        if (!voteData.hasVoted) {

            result.style.display = 'none';
            button.disabled = false;

            button.textContent = language === 'es'
                ? 'VOTAR ↗'
                : 'VOTE ↗';

            return;
        }

        const votes = voteData.counts[candidate];

        const percentage = totalVotes > 0
            ? Math.round((votes / totalVotes) * 100)
            : 0;

        result.style.display = 'grid';

        result.querySelector('.vote-result-label').textContent =
            language === 'es'
                ? `${percentage}% — ${votes} votos`
                : `${percentage}% — ${votes} votes`;

        result.querySelector('.vote-result-fill').style.width =
            `${percentage}%`;

        button.disabled = true;

        button.textContent = language === 'es'
            ? (voteData.selected === candidate ? 'TU VOTO ✓' : 'VOTACIÓN CERRADA')
            : (voteData.selected === candidate ? 'YOUR VOTE ✓' : 'VOTING CLOSED');
    });
}

// Register vote
voteButtons.forEach(button => {

    button.addEventListener('click', () => {

        const candidate = button.dataset.vote;

        if (voteData.hasVoted) return;
        if (!candidateIds.includes(candidate)) return;

        voteData.counts[candidate]++;
        voteData.hasVoted = true;
        voteData.selected = candidate;

        saveVoteData();
        renderVoteResults();

    });

});

// Cancel vote
const cancelVoteButton = document.querySelector('.cancel-vote-button');

if (cancelVoteButton) {

    cancelVoteButton.addEventListener('click', () => {

        if (!voteData.hasVoted) return;

        const previousVote = voteData.selected;

        if (previousVote && voteData.counts[previousVote] > 0) {
            voteData.counts[previousVote]--;
        }

        voteData.hasVoted = false;
        voteData.selected = null;

        saveVoteData();
        renderVoteResults();

    });

}

// Restore saved results
renderVoteResults();