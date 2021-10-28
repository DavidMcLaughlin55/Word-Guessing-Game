//Global Variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let startGame = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');
const letters = document.getElementsByClassName('letter');
const showing = document.getElementsByClassName('show');


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

/* 
    --getRandomPhraseAsArray--
    Function gets and random phrase from the phrases array and splits it to return the letters contained as a new array 
*/
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * phrases.length)];
    return randomPhrase.split('');
};

const phraseForDisplay = getRandomPhraseAsArray(phrases);

/* 
    --addPhraseToDisplay function-- 
    Loops through an array of characters. 
    For each character in the array it creates a list item with character inside. 
    It appends the list item to the #phrase ul 
    If character in the array is a letter the “letter” class is added
    If character is a space the "space" class is added
*/

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const list = phrase.querySelector('ul');
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

addPhraseToDisplay(phraseForDisplay);

/* 
    --checkLetter function-- 
    Gets all elements with a class of “letter”.
    Loops over letters and checks if they match the letter in the button the player has clicked.
    If it matches, a class of “show” is added to the list item containing that letter. 
    Stores the matching letter inside of a variable and returns that letter.
    If a match is not found it returns null.
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
Checks if the length of the 2 variables are the same and if so displays the win overlay
    -Changes overlay class to 'win'.
    -Changes headline text show user won.
    -Changes overlay display to 'flex;
If the missed counter is greater than 4 it displays the lose overlay.
    -Changes overlay class to 'lose'.
    -Changes headline text to show user lost.
    -Changes overlay display to 'flex;  
*/

function checkWin() {
    if (letters.length === showing.length) {
        overlay.classList.add('win');
        document.querySelector('.title').textContent = "Congratulations, you win!";
        overlay.style.display = 'flex';
    } else if (missed > 4) {
        overlay.classList.add('lose');
        document.querySelector('.title').textContent = "Sorry, click \"Start Game\" to try again!";
        overlay.style.display = 'flex';
    };
};

//Event Listeners

/* 
    --startGame--
    This code hides the screen overlay when the user clicks the "Start Game button".
 */
startGame.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

/* 
    --buttonClick--
    When a player chooses a letter the “chosen” class is added to that button so the same letter can’t be chosen twice.
*/
keyboard.addEventListener('click',(e) => {
    const heart = document.querySelector('.tries');
    if (e.target.tagName ==='BUTTON'){
        let buttonClicked = e.target;
        buttonClicked.className = 'chosen';
        buttonClicked.disabled = true;
        const checked = checkLetter(buttonClicked);
        if (checked === null) { 
            heart.remove();
            console.log("Heart removed!");
            missed += 1;
        }; 
    };
    checkWin();
});