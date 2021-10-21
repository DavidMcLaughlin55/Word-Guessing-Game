/* Global Variables */

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector(".btn__reset");

let missed = 0;

const phrases = ["Nothing is entirely free", 
    "Throw caution to the wind", 
    "Cut me some slack", 
    "Speak of the devil",
    "Hang in there",
];

/* Functions */

/* This code hides the screen overlay when the user clicks the "Start Game button" */
startGame.addEventListener('click', (e) => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
})

/* Function gets and random phrase from the phrases array and splits it to return the letters contained as a new array */
function getRandomPhraseAsArray() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const phraseCharacters = [randomPhrase.split('')];
    console.log(phraseCharacters);
    return phraseCharacters;
};
