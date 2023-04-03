/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['♠','♥', '♣', '♦']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

let playerOneHand = []

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
const hitBtn = document.getElementById('hit-btn')




/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */

init()

function init(){
  
}

function handleClick() {
  generateCard()
  render()
}

function generateCard(){
  if (disposedDeck.length === 52){
    hitBtn.disabled = true
    return
  }
  suitIdx = Math.floor(Math.random() * suits.length)
  suitPicked = suits[suitIdx]
  valueIdx = Math.floor(Math.random() * values.length)
  valuePicked = values[valueIdx]
  chosenCard = new Card(suitPicked, valuePicked)
  if (checkDecks(chosenCard)){
  generateCard()
}   else {
  disposedDeck.push(chosenCard)
  chosenCard = new Card()
}
}

function playerOneTurn(){

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
  