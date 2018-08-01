const card = document.getElementsByClassName('.card')
const deck = document.querySelector('.deck');
//const matchedCards = document.querySelectorAll('.deck li');
let flippedCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;



deck.addEventListener('click', event => {
  let target = event.target;
    if(isClickValid(target)) {
        if(clockOff) {
          startTimer();
          clockOff = false;
        }
        toggleClass(target);
    }
});

function isClickValid(target) {
  return (
    target.classList.contains('card') &&
      !target.classList.contains('match') &&
      flippedCards.length < 2 &&
      !flippedCards.includes(target)
  )
};

function toggleClass(target) {
    target.classList.toggle('open');
    target.classList.toggle('show');
    flippedCards.push(target);
    compareCards();
};
//function compareCards from https://www.diigo.com/outliner/fii42b/Udacity-Memory-Game-Project?key=dwj0y5x9cw
function compareCards(){
  if(flippedCards.length === 2){
    addMoves();
    checkMoves();
    if(flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className){
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards = [];
    matched++;
    if(matched === TOTAL_PAIRS) {
      gameOver();
    }
  } else {
      setTimeout(() => {
        toggleClass(flippedCards[0]);
        toggleClass(flippedCards[1]);
        flippedCards = [];
      }, 1000);
    }
  }
};

function shuffleDeck(){
  const icons = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(icons);
  for (var i= 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(card){
      deck.appendChild(card);
    });
  }
}
shuffleDeck();

function addMoves(){
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

function checkMoves(){
  if (moves === 9 || moves === 18){
    deleteStar();
  }
}

function deleteStar(){
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if(star.style.display != 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

function startTimer() {
  time = 0;
  clockId = setInterval(() => {
    time++;
    displayClock();
  }, 1000);
}

function displayClock() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  clock.innerHTML = time;
  if (seconds < 10) {
  clock.innerHTML = (minutes + ':0' + seconds);
} else {
  clock.innerHTML = (minutes + ':' + seconds);
  }
}

function stopClock() {
  clearInterval(clockId);
}

function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

toggleModal()
toggleModal()

function writeModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();

  timeStat.innerHTML = 'Time = ' +  clockTime;
  movesStat.innerHTML = 'Moves = ' + moves;
  starsStat.innerHTML = 'Stars = ' + stars;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

document.querySelector('.modal_close').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', () => {
  replayGame();
});

document.querySelector('.restart').addEventListener('click', () => {
  resetGame()
});

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
  resetCards();
}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayClock();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
  resetCards();
}

function replayGame() {
  resetGame();
  toggleModal();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/* function startGame(){
   shuffle();

   }
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
  };



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
