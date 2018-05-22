/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = [
'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube',
'fa fa-leaf','fa fa-bicycle','fa fa-bomb','fa fa-diamond','fa fa-paper-plane-o',
'fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb'];
const restart = document.querySelector('.restart');
const movesDisplay = document.querySelector('.moves');
const starDisplay = document.querySelector('.stars');
const timerDisplay = document.querySelector('.timer');
let openCard = [];
let matchCard = [];
let moves = 0;
let stars = 0;
let seconds = 0;
let minutes = 0;
//=====================   New Deck Function   ================================//
 /* Display the cards on the page */
function newDeck() {
/* - shuffle the list of cards using the provided "shuffle" method below */
   shuffle(cards);
/*   - loop through each card and create its HTML */
   for (let i = 0; i < cards.length; i++) {
/*   - add each card's HTML to the page */
     const li = document.createElement('li');
     const icon = document.createElement('i');
     li.classList.add('card');
     icon.innerHTML = `<i class='${cards[i]}'></i>`;
     deck.appendChild(li);
     li.appendChild(icon);
     clickListener(li);
   }
 }
 newDeck();
 timer();
 //=====================   Shuffle Function   ================================//
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//=====================   Event Listener   ================================//
/* set up the event listener for a card. If a card is clicked: */
function clickListener(li) {
  li.addEventListener('click', function() {
    const current = this;
    const previous = openCard[0];
    if(openCard.length === 1) {
      li.classList.add('open', 'show', 'disable');
 /* add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */
      openCard.push(this);
 /* if the list already has another card, check to see if the two cards match */
      compare(current, previous);
    } else {
      li.classList.add('open', 'show', 'disable');
      openCard.push(this);
    }
  });
}
//=====================   Compare Function   ================================//
function compare(current, previous) {
  if(current.innerHTML === previous.innerHTML) {
/*  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) */
    match(current, previous);
    matchCard.push(current, previous);
    openCard = [];
/*  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */
    gameOver();
  } else {
/*  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */
    setTimeout(function() {
      noMatch(current, previous);
    }, 500);
      openCard = [];
  }
/*   + increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
  moveAdd();
}
//=====================    Match Function   ================================//
function match(current, previous) {
  current.classList.add('match');
  previous.classList.add('match');
}
//=====================   No Match Function   ================================//
function noMatch(current, previous) {
  current.classList.remove('open', 'show', 'disable');
  previous.classList.remove('open', 'show', 'disable');
}
//=====================   Add Move Function   ================================//
function moveAdd() {
  moves++;
  movesDisplay.innerHTML = moves;
  rating();
}
//=====================   Game Over Function   ================================//
function gameOver() {
  if(matchCard.length === cards.length) {
    clearInterval(time);
    alert('Game Over! You have done it in ' + minutes + ' Minutes and ' + seconds +
    ' Seconds. It took you ' + moves + 'moves to win the game. And you recieved ' + stars + ' Stars')
  }
}
//=====================   Rating Function   ================================//
function rating() {
  if(moves > 2) {
    starDisplay.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    stars = 3;
  }
  if(moves > 18) {
    starDisplay.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    stars = 2;
  }
  if(moves > 24) {
    starDisplay.innerHTML = '<li><i class="fa fa-star"></i></li>';
    stars = 1;
  }
}
//=====================   Timer Function   ================================//
function timer() {
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}
		timerDisplay.innerHTML = minutes + " Mins " + seconds + " Secs" ;
	}, 1000);
}
//=====================   Restart Function   ================================//
restart.addEventListener('click', function() {
  deck.innerHTML = '';
  moves = 0;
  clearInterval(time);
  matchCard = [];
  newDeck();
});
