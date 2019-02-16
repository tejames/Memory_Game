//Udacity Matching Game Project
//Gets all cards as array
var allCards = document.querySelectorAll('.card');
//Select cards in deck
var deck = document.querySelector('.deck');
//Array to hold flipped cards
var flippedCards = [];
var card = "";
var matchedPairs = 0;
var elapsedTime = 0;
var elapsedTime = 0;
var timer;
var timerOn = false;
var timerGUI = document.querySelector('.time');
var starsTotal = 3;
var list = document.querySelector('.stars');

//*****CARDS*****
//Add event listener to each card.  Flip card when clicked.
for (var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener("click", flipCard);
    allCards[i].classList.remove("show", "open", "match");
    //allCards[i].classList.add("show");
}

//Function to turn a card over. Display the card's symbol.
function flipCard() {
    card = this;
    this.classList.add("open", "show");
    addFlippedCard(card);
    startTimer();
}

//Add flipped cards to array and compare
function addFlippedCard() {
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        //Check to see if the 2 cards match
        countMoves();
        starRating();

        if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
            matched();
        } else {
            noMatch();
        }

        if (matchedPairs === 8) {
            //stopTimer();
            gameWon();
        }
    }
}


//FUNCTION to lock cards if matched
function matched() {
    flippedCards[0].classList.add("match");
    flippedCards[1].classList.add("match");
    matchedPairs++;
    flippedCards = [];
}

//FUNCTION to remove cards from flippedCards array and remove symbols, if no match
function noMatch() {
    setTimeout(function() {
        flippedCards[0].classList.remove("show", "open", "match");
        flippedCards[1].classList.remove("show", "open", "match");
        flippedCards = [];
    }, 700);
}

//*****STARS*****

function starRating() {
    if (moves === 15) {
        let star = list.getElementsByTagName('li')[0];
        star.classList.add("hide");
        starsTotal--;
    }
    if (moves === 20) {
        let star = list.getElementsByTagName('li')[1];
        star.classList.add("hide");
        starsTotal--;
    }
}


function resetStars() {
    var x = 0;
    for (var i = 3; i > starsTotal; i--) {
        var star = list.getElementsByTagName('li')[x];
        star.classList.remove("hide");
        x++;
    }
}


//*****WINNING GAME*****
function gameWon() {
    stopTimer(timer);
    displayModal();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Shuffle the deck of cards.

function shuffleDeck() {
    const getCardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(getCardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

//*****MOVES*****

var moves = 0;
var movesGUI = document.querySelector('.moves');

function countMoves() {
    moves++;
    movesGUI.innerHTML = moves;
}

//*****TIMER*****
function startTimer() {
    if (!timerOn) {
        timerOn = true;
        timerCount();
    }
}

function timerCount() {
    timerGUI.innerHTML = elapsedTime;
    elapsedTime++;
    timer = setTimeout(function() {
        timerCount();
    }, 1000);
}

function stopTimer() {
    clearTimeout(timer);
}

//****MODAL****

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Get the modal text
var modalText = document.getElementById("modalText");
// Get the button to close modal
var button = document.getElementById("playAgain");

// Open the modal
function displayModal() {
    console.log(button);
    modal.style.display = "block";
    modalText.innerHTML = "YOU WON!  You took " + elapsedTime + " seconds and " + moves + " moves.  You earned " + starsTotal + " stars.";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//When the user clicks on the button.  Restart game
button.onclick = function() {
    gameBegin();
    modal.style.display = "none";
};
//****END MODAL****

//Function runs after page is loaded to begin the game.
function gameBegin() {
    moves = 0;
    elapsedTime = 0;
    matchedPairs = 0;
    timerGUI.innerHTML = elapsedTime;
    movesGUI.innerHTML = moves;
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove("show", "open", "match");
    }
    resetStars();
    starsTotal = 3;
    shuffleDeck();
    stopTimer();
}

//FUNCTION to enable reset button!
var resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', gameBegin);


window.onload = gameBegin();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */