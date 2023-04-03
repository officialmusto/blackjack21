/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['s','h', 'c', 'd'] // Spades, Hearts, Clubs, Diamonds
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

let playerOneHand = []

// Establishing Deck Class to handle p1 deck, dealer deck, player deck, and the sorted deck.
class Deck {
  constructor(){
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
const frontCard3 = document.getElementById('card-front3')
const frontCard4 = document.getElementById('card-front4')



/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */

init()

function init(){
  playerOneTurn()
  render()
}

function handleClick() {
  generateCard()
  render()
}

function generateCard(){
  if (playerOneDeck.length === 52){
    hitBtn.disabled = true
    console.log('STILL HITTING 52')
    return
  }
  suitIdx = Math.floor(Math.random() * suits.length)
  suitPicked = suits[suitIdx]
  valueIdx = Math.floor(Math.random() * values.length)
  valuePicked = values[valueIdx]
  chosenCard = new Card(suitPicked, valuePicked)
  if (checkDecks(chosenCard)){
    generateCard()
  } else {
    playerOneDeck.push(chosenCard)
    chosenCard = new Card()
  }
}


function playerOneTurn(){
  if (playerOneHand.length < 2){
    generateCard()
  } else if (playerOneHand.length > 4){
    console.log('YOU WIN')
  }
  
}

function checkDecks(card){
  let duplicate = false
  playerOneDeck.forEach(function(pOneCard){
    if (pOneCard.suit === card.suit && pOneCard.value === card.value) {
      duplicate = true
    }
  })
  return duplicate
}

//? HOW TO MAKE THIS FUNCTION NEEDED? RE-WATCH OLD LECTURE
// Renders Turn of P1
  function render() {
    frontCard2.style.display = 'none'
    frontCard3.style.display = 'none'
    frontCard4.style.display = 'none'

    frontCard1.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneDeck[0].combined}.svg`)
  
    if (playerOneDeck[1]) {
      frontCard2.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneDeck[1].combined}.svg`)
      frontCard2.style.display = 'block'
    }
    if (playerOneDeck[2]) {
      frontCard3.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneDeck[2].combined}.svg`)
      frontCard3.style.display = 'block'
    }
  
    if (playerOneDeck[3]) {
      frontCard4.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneDeck[3].combined}.svg`)
      frontCard4.style.display = 'block'
    }
  }
  

  //todo CREATE BET MECHANICS
  //todo CREATE PLAYER 1 FIRST TURN LOGIC
  //todo CREATE DEALER TURN LOGIC
  //todo CREATE TURN LOGIC
  //todo CREATE CARD FLIPS, CARD DISPOSING, AND DECK MECHANICS
  