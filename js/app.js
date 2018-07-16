/*
 * Create a list that holds all of your cards
 */
const icons = ['.fa fa-diamond', '.fa fa-paper-plane-o', '.fa fa-anchor', '.fa fa-bolt',
 '.fa fa-cube', '.fa fa-anchor', '.fa fa-leaf', '.fa fa-bicycle', '.fa fa-diamond',
 '.fa fa-bomb', '.fa fa-leaf', '.fa fa bomb', '.fa fa-bolt', '.fa fa-bicycle', '.fa fa-paper-plane-o',
 '.fa fa-cube'];
const card = document.getElementsByClassName('.card')
const deck = document.querySelector('.deck');
let flippedCards = [];

//function flip(){
  deck.addEventListener('click', function(e) {
    const target = e.target;
    if(target.classList.contains('card') && flippedCards.length < 2) {
      toggleClass(target);
    }
});

function toggleClass(target) {
    target.classList.toggle('open');
    target.classList.toggle('show');
    flippedCards.push(target);
    compareCards();
};


function compareCards(){
  if(flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className){
    console.log(flippedCards);
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards = [];
    //matchingClass();
  } else {
    //card.classList.remove('open', 'show');
    console.log('not a match!');
    toggleClass(flippedCards[0]);
    toggleClass(flippedCards[1]);
    flippedCards = [];

  }
};


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




/*function match(e){
  if()
} */



/*const restart = document.getElementsByClassName('restart');
restart.addEventListener('click', function(e){
  reset();
}) */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return deck;
  };


/*const card = document.getElementsByClassName('card');
card.addEventListener('click', function(e){

})
*/
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
