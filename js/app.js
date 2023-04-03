/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['s','h', 'c', 'd'] // Spades, Hearts, Clubs, Diamonds
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

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
    this.combined = suit + value
  }
}



// Created a variable to utilize the '.push()' method and push the selected card into the dispose pile.
let decks = new Deck()
let disposedDeck = decks.disposed
/* ------------------- CACHED REFERENCES ------------------- */
const hitBtn = document.getElementById('hit-btn')
const frontCard = document.getElementById('card-front')



/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */

init()

function init(){
  playerOneTurn()
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
  if (playerOneHand.length < 2){
    generateCard()
    generateCard()
    return console.log(disposedDeck)
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
  }
  
  console.log(decks.disposed[0].combined) // <- Used to change SVG file
  







  //todo CREATE BET MECHANICS
  //todo CREATE PLAYER 1 FIRST TURN LOGIC
  //todo CREATE DEALER TURN LOGIC
  //todo CREATE TURN LOGIC
  //todo CREATE CARD FLIPS, CARD DISPOSING, AND DECK MECHANICS
  