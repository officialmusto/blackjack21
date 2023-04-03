/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['♠','♥', '♣', '♦']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


// Establishing Deck Class to handle disposed deck, dealer deck, player deck, and the sorted deck.
class Deck {
  constructor(){
    this.disposed = []
    this.p1 = []
    this.dealer = []
    this.pullFrom = []
  }
}


// Establishing Cards Class to create an object with two key/value pairs that will be the selected random card from the 'HIT button.
class Card{
  constructor(suit, value){
    this.suit = suit
    this.value = value
  }
}



// Created a variable to utilize the '.push()' method and push the selected card into the dispose pile.
let decks = new Deck()
let disposedDeck = decks.disposed
/* ------------------- CACHED REFERENCES ------------------- */
const pickCardBtn = document.getElementById('pick-card-btn')




/* ------------------- EVENT LISTENERS ------------------- */
pickCardBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */


init()

function init(){}

function handleClick() {
  // checkForDuplicates()
  generateCard()
  render()
}

function generateCard(){
// Checks to see if 52 cards are in Deck.disposed Class array
  if (disposedDeck.length === 52){
    return
  }
  // Picks random Suit from suits array.
  let suitIdx = Math.floor(Math.random() * suits.length)
  let suitPicked = suits[suitIdx]
  
  // Picks random Value from values array.
  let valueIdx = Math.floor(Math.random() * values.length)
  let valuePicked = values[valueIdx]
  
  // Combines both value & suit into an object within Card class.
  let chosenCard = new Card(suitPicked, valuePicked)
  
// SOLVED DUPLICATES ISSUE - HUNTER LONG
//IF DUPLICATE === TRUE, GENERATE NEW CARD, ELSE PUSH CHOSEN CARD TO ARRAY
  if (checkDecks(chosenCard)){
  generateCard()
}   else {
  // Sends chosen card to disposed pile.
  disposedDeck.push(chosenCard)
  chosenCard = new Card()
}
}



function checkDecks(card){
  let duplicate = false
  disposedDeck.forEach(function(obj){
    if (obj.suit === card.suit && obj.value === card.value) {
      duplicate = true
    }
  })
  return duplicate
}

//? HOW TO MAKE THIS FUNCTION NEEDED? RE-WATCH OLD LECTURE
  // Renders Turn of P1
  function render(){
    console.log(disposedDeck)
  }

  







  
  //todo CREATE BET MECHANICS
  //todo CREATE PLAYER 1 FIRST TURN LOGIC
  //todo CREATE DEALER TURN LOGIC
  //todo CREATE TURN LOGIC
  //todo CREATE CARD FLIPS, CARD DISPOSING, AND DECK MECHANICS
  