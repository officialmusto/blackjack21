/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['s','h', 'c', 'd'] // Spades, Hearts, Clubs, Diamonds
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

let playerOneHand = []

// Establishing Deck Class to handle p1 deck, dealer deck, player deck, and the sorted deck.
class Deck {
  constructor(){
    this.p1 = []
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
let playerOneDeck = decks.p1
/* ------------------- CACHED REFERENCES ------------------- */
const hitBtn = document.getElementById('hit-btn')
const frontCard1 = document.getElementById('card-front1')
const frontCard2 = document.getElementById('card-front2')



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
  if (playerOneDeck.length === 52){
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
    playerOneDeck.push(chosenCard)
    chosenCard = new Card()
  }
}
const playerCard1 = playerOneDeck[0].combined
const playerCard2 = playerOneDeck[1].combined


function playerOneTurn(){
  if (playerOneHand.length < 2){
    generateCard()
    generateCard()
    return console.log(playerOneDeck)
  }
  
}

function checkDecks(card){
  let duplicate = false
  playerOneDeck.forEach(function(obj){
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
  
  console.log(decks.p1[0].combined) // <- Used to change SVG file
  frontCard1.setAttribute('src', `assets/SVGs/front-of-cards/${playerCard1}.svg`)
  frontCard2.setAttribute('src', `assets/SVGs/front-of-cards/${playerCard2}.svg`)







  //todo CREATE BET MECHANICS
  //todo CREATE PLAYER 1 FIRST TURN LOGIC
  //todo CREATE DEALER TURN LOGIC
  //todo CREATE TURN LOGIC
  //todo CREATE CARD FLIPS, CARD DISPOSING, AND DECK MECHANICS
  