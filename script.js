//Global Variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let startGame = document.querySelector('.btn__reset');

//Stores # of mismatched keys.
let missed = 0;

//Array storing various phrases for display.
const phrases = ["Nothing is entirely free", 
    "Throw caution to the wind", 
    "Cut me some slack", 
    "Speak of the devil",
    "Hang in there",
];

/* This code hides the screen overlay when the user clicks the "Start Game button". */
startGame.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
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
    const phraseCharacters = [randomPhrase.split('')];
    console.log("Random phrase array is working!") //clear during refactoring -- X
    return phraseCharacters;
};

const phraseForDisplay = getRandomPhraseAsArray(phrases);
console.log(phraseForDisplay);

/* 
    --addPhraseToDisplay function-- 
    Loops through an array of characters. 
    For each character in the array it creates a list item with character inside. 
    It appends the list item to the #phrase ul 
    If character in the array is a letter “letter” class is added
    If character is a space, "space" class is added
*/

//NEEDS FIX
function addPhraseToDisplay(letters) {
    const ul = phrase.querySelector('ul');
    for (let i = 0; i < letters.length; i++) {
        const li = document.createElement(`li`);
        li.innerHTML = letters[i];
        ul.appendChild(li);
        if (li.innerHTML === /[a-zA-Z]/ ) {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        console.log('Working finally!'); //clear during refactoring -- X
        return ul;
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
    let lettersMatching = [];
    for (i = 0; i < letters.length; i++){
        if (i === buttonClicked) {
            i.ClassName = 'show';
            lettersMatching += i;
            //console.log(`The letter is ${i}`);
            return i;
        } else {
            //console.log('Wrong');
            return null;
        };
    };
}


//Stores the letters returned from the checkLetter function
const letterFound = [checkLetter()];