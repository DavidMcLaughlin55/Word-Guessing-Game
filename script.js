//Global Variables

const keyboard = document.getElementById('qwerty');
const button = qwerty.querySelectorAll('button');
const phrase = document.getElementById('phrase');
let startGame = document.querySelector('.btn__reset');

//Stores # of mismatched keys.
let missed = 0;

//Array storing various phrases for display.
const phrases = ["Live and learn", 
    "Throw caution to the wind", 
    "Cut me some slack", 
    "Speak of the devil",
    "Hang in there",
];

const overlay = document.getElementById('overlay');
const start = document.querySelector('.start');

/* This code hides the screen overlay when the user clicks the "Start Game button". */
startGame.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    console.log('Hidden overlay is working!'); //clear during refactoring -- X
})

//Functions 

/* 
    --buttonClicked--
    When a player chooses a letter the “chosen” class is added to that button so the same letter can’t be chosen twice.
*/
let buttonClicked = keyboard.addEventListener('click',(e) => {
    if (e.target.tagName ==='BUTTON'){
        let button = e.target;
        button.className = 'chosen';
        button.disabled = true;
        console.log('The button has been clicked!'); //clear during refactoring -- X
    }
});

/* 
    --getRandomPhraseAsArray--
    Function gets and random phrase from the phrases array and splits it to return the letters contained as a new array 
*/
function getRandomPhraseAsArray(array) {
    const randomPhrase = array[Math.floor(Math.random() * phrases.length)];
    console.log("Random phrase array is working!") //clear during refactoring -- X
    return randomPhrase.split('');
};

const phraseForDisplay = getRandomPhraseAsArray(phrases);
console.log(phraseForDisplay);

/* 
    --addPhraseToDisplay function-- 
    Loops through an array of characters. 
    For each character in the array it creates a list item with character inside. 
    It appends the list item to the #phrase ul 
    If character in the array is a letter the “letter” class is added
    If character is a space the "space" class is added
*/

    function addPhraseToDisplay(arr) {
        for (let i=0; i < arr.length; i++) {
            const list = phrase.querySelector('ul');
            const arrLetter = document.createElement('li');
            arrLetter.textContent = `${arr[i]}`;
            console.log(arrLetter); //clear during refactoring -- X
            list.append(arrLetter);
            if (arrLetter.textContent != ' ') {
                arrLetter.className = 'letter';
            } else {
                arrLetter.className = 'space';
            };
            console.log('addPhraseToDisplay is working!') //clear during refactoring -- X
        };
    }

let displayedPhrase = addPhraseToDisplay(phraseForDisplay);

/* 
    --checkLetter function-- 
    Gets all elements with a class of “letter”.
    Loops over letters and checks if they match the letter in the button the player has clicked.
    If it matches, a class of “show” is added to the list item containing that letter. 
    Stores the matching letter inside of a variable and returns that letter.
    If a match is not found it returns null.
*/


function checkLetter(buttonClicked) {
    const letters = document.querySelectorAll('.letter');

}


//Stores the letters returned from the checkLetter function
let letterFound = [checkLetter()];

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
    let letterElements = document.querySelectorAll('.letter');
    let showElements = document.querySelectorAll('.show');
    
    if (letterElements === showElements) {
        overlay.className = 'win';
        start.firstChild.textContent = 'Congratulations, you win!';
        overlay.style.display = 'flex';
        console.log('Winner works!');
    } else if (missed > 4) {
        overlay.className = 'lose';
        start.firstChild.textContent = 'Sorry, you have lost the game. Try again!'
        overlay.style.display = 'flex';
        console.log('Loser works!');
    }
}

