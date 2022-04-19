//Global Variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const list = phrase.querySelector('ul');
let btnReset = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');
const letters = document.getElementsByClassName('letter');
const showing = document.getElementsByClassName('show');
const hearts = document.getElementsByClassName('tries');


//Stores # of mismatched keys.
let missed = 0;

//Array storing various phrases for display.
const phrases = ["Live and learn",
    "Throw caution to the wind",
    "Cut me some slack",
    "Speak of the devil",
    "Hang in there",
];

//Functions 

/* Init Phrase */
function initPhrase() {
    /* 
    --getRandomPhraseAsArray--
    -Function gets and random phrase from the phrases array and splits it to return the letters contained as a new array 
*/
    function getRandomPhraseAsArray(arr) {
        const randomPhrase = arr[Math.floor(Math.random() * phrases.length)];
        return randomPhrase.split('');
    };

    const phraseForDisplay = getRandomPhraseAsArray(phrases);

    /* 
        --addPhraseToDisplay function-- 
        -Loops through an array of characters. 
        -For each character in the array it creates a list item with character inside. 
        -It appends the list item to the #phrase ul 
        -If character in the array is a letter the “letter” class is added
        -If character is a space the "space" class is added
    */

    function addPhraseToDisplay(arr) {
        for (let i = 0; i < arr.length; i++) {
            const arrLetter = document.createElement('li');
            arrLetter.textContent = `${arr[i]}`;
            list.append(arrLetter);
            if (arrLetter.textContent != ' ') {
                arrLetter.className = 'letter';
            } else {
                arrLetter.className = 'space';
            };
        };
    }

    let newPhrase = addPhraseToDisplay(phraseForDisplay);
}

/* 
    --checkLetter function-- 
    -Gets all elements with a class of “letter”.
    -Loops over letters and checks if they match the letter in the button the player has clicked.
    -If it matches, a class of “show” is added to the list item containing that letter. 
    -Stores the matching letter inside of a variable and returns that letter.
    -If a match is not found it returns null.
*/

function checkLetter(buttonClicked) {
    let matches = null;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent.toLowerCase() === buttonClicked.textContent) {
            letters[i].classList.add('show');
            matches += buttonClicked.textContent;
        };
    };
    return matches;
}

/*
    --checkWin function--
    -Checks if the length of the 2 variables are the same and if so displays the win overlay
    -Changes overlay class to 'win'.
    -Changes headline text show user won.
    -Changes overlay display to 'flex'.
    -Adds a "Play again" button.
    -If the missed counter is greater than 4 it displays the lose overlay.
    -Changes overlay class to 'lose'.
    -Changes headline text to show user lost.
    -Changes overlay display to 'flex'.  
    -Adds a 'Try again" button.
*/

function checkWin() {
    if (letters.length === showing.length) {
        overlay.classList.add('win');
        document.querySelector('.title').textContent = "Congratulations, you win!";
        overlay.style.display = 'flex';
        btnReset.textContent = 'Play again';
    } else if (missed > 4) {
        overlay.classList.add('lose');
        document.querySelector('.title').textContent = "Sorry, try again!";
        overlay.style.display = 'flex';
        btnReset.textContent = 'Try again';
    };
};

/* 
    --resetPhrase--
    -Resets the phrase.
*/
function resetPhrase() {
    console.log(list);
    while (list.hasChildNodes()) {
        console.log('Removing child node');
        list.removeChild(list.lastChild);
    };
};

/* 
    --resetKeys Function--
    -Resets keyboard keys to initial state.
*/
function resetKeys() {
    const keys = keyboard.getElementsByTagName('button');
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].className === 'chosen') {
            console.log('resetting the keys!');
            keys[i].removeAttribute('disabled');
            keys[i].removeAttribute('class');
        };
    };
};


/* 
    --resetMissed Function--
    -Resets missed to initial state.
*/
function resetMissed() {
    for (let i = 0; i < hearts.length; i++) {
        if (hearts[i].querySelector('img').src = "images/lostHeart.png") {
            console.log('resetting the hearts!');
            hearts[i].querySelector('img').src = "images/liveHeart.png";
        };
    };
    missed = 0;
};

//Event Listeners

/* 
    --btnReset--
    -This code hides the screen overlay when the user clicks the "Start Game button".
 */
btnReset.addEventListener('click', (e) => {
    if (btnReset.textContent !== 'Start Game') {
        let buttonReset = e.target;
        overlay.style.display = 'none';
        resetPhrase();
        resetKeys();
        resetMissed();
        initPhrase();
    } else {
        overlay.style.display = 'none';
        initPhrase();
    };
});

/* 
    --buttonClick--
    When a player chooses a letter the “chosen” class is added to that button so the same letter can’t be chosen twice.
*/
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let buttonClicked = e.target;
        buttonClicked.className = 'chosen';
        buttonClicked.disabled = true;
        const checked = checkLetter(buttonClicked);
        if (checked === null) {
            missed += 1;
            for (let i = 0; i < missed; i++) {
                if (missed) {
                    hearts[i].querySelector('img').src = "images/lostHeart.png";
                };
            };
        };
    };
    checkWin();
});