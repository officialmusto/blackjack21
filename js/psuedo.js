/*
// ----------------------- VARIABLES -----------------------
let deck1 = []
let deck2 = []
let cardToRemove

// ----------------------- CACHED REFERENCES -----------------------
let deck1El = document.getElementById('deck-1')
let deck2El = document.getElementById('deck-2')
let button = document.getElementById('btn')
// ----------------------- EVENT LISTENERS -----------------------
button.addEventListener('click', handleClick)

// ----------------------- FUNCTIONS -----------------------

init()
function init() {
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}

function handleClick(){
  if (deck1.length > 0){
  let randIdx = Math.floor(Math.random() * deck1.length)
  let cardPicked = deck1.splice(randIdx, 1)[0]
  deck2.push(cardPicked)
  render(cardPicked)
  }
}

function render(cardPicked){
  if (deck2.length === 1){
  deck2El.classList.remove('outline')
  }
  if (deck2.length > 1){
    deck2El.classList.remove(cardToRemove)
  }
  cardToRemove = cardPicked
  deck2El.classList.add(cardPicked)
  if (deck2.length > deck1.length){
    deck2El.classList.add('shadow')
    deck1El.classList.remove('shadow')
  }
  if (deck1.length === 0){
    deck1El.classList.add('outline')
    deck1El.classList.remove('back-blue')
  }
}
*/




/* ----------------------- Psuedo Code for game of -----------------------
/                                  BLACKJACK

GAME STRUCTURE:
-1 BET button
-1 RESET button to reset all activity, bets, and money in game
-1 HIT button to initiate a new card into hand
-1 STAY button to end turn of P1 automatically and end all betting activity from P1
? All in button?
-52 CARDS that have values according to their suit and value. 
-


GAME START:
-P1 is given $100 to start game.
!-IF P1 DOES NOT HAVE MONEY, GAME CANNOT START
-A minimum of a $1 bet is needed in order to proceed and keep continuation of game.
-Dealer deals P1 2 Cards
-2 cards face UP given to P1 after betting. 
-2 cards, 1 face UP & 1 face DOWN given to dealer after
? Find a way to alternate math.random between P1 and dealer when dealing cards?

GAME TURNS:
-Start with dealer last (!dealer or something) so P1 goes FIRST
!-IF CARDS EQUAL 21, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN
-P1 has choice of choosing either HIT or STAY
!-IF 'HIT', RANDOMIZED CARD THAT HAS NOT BEEN SELECTED WILL BE ADDED TO P1'S HAND
    !IF NEW CARD ADDED TOTALS HAND TO > 21, {
      !AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
    !} ELSE IF CARD === A {
      !ASK P1 IF A === 1 || A === 11, {
        !IF P1 CHOOSES 1, A === 1
        !ELSE A === 11
      !} ELSE, ADD CARD TO HAND AND COMBINE TOTAL AND CHECKS AGAIN TO SEE IF CARD > 21, REPEATS PROCESS.
!-IF 'STAY', REVEAL DEALER CARDS
      !IF DEALER CARDS > 21, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN
      !ELSE IF DEALER CARDS === 21, AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
      !ELSE, COMPARE P1 HAND AND DEALER HAND,

    !IF DEALER HAND >= P1 HAND, AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
    !IF DEALER HAND < P1 HAND, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN

!-IF BET TOTAL === 0, AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEW GAME
also end game if P1 hand is revealed

-------------------------------------------------------------------------------- */

//! IF 5 OR MORE IN HAD, AUTOMATICALLY WIN, COLLECT BETS 2x AND CONTINUE NEXT TURN