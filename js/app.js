
/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['s','h', 'c', 'd'] // Spades, Hearts, Clubs, Diamonds
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

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
let playerOneHand = decks.p1
/* ------------------- CACHED REFERENCES ------------------- */
const hitBtn = document.getElementById('hit-btn')
const stayBtn = document.getElementById('stay-btn')

const frontCard0 = document.getElementById('card-front0')
const frontCard1 = document.getElementById('card-front1')
const frontCard2 = document.getElementById('card-front2')
const frontCard3 = document.getElementById('card-front3')
const frontCard4 = document.getElementById('card-front4')



/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)
stayBtn.addEventListener('click', handleClick)


/* ------------------- FUNCTIONS ------------------- */
// GAME INITIALIZER
init()

function init(){
  playerOneTurn()
  render()
}




function handleClick() {
  if (playerOneHand.length < 5){
    generateCard()
    render()
    addPlayerCards()
  } else
  hitBtn.disabled = true
  return
  
}
function generateCard(){
  
  suitIdx = Math.floor(Math.random() * suits.length)
  suitPicked = suits[suitIdx]
  valueIdx = Math.floor(Math.random() * values.length)
  valuePicked = values[valueIdx]
  chosenCard = new Card(suitPicked, valuePicked)
  if (checkDecks(chosenCard)){
    generateCard()
  } else {
    playerOneHand.push(chosenCard)
    chosenCard = new Card()
  }
}

function playerOneTurn(){
  if (playerOneHand.length < 2){
    generateCard()
  }
}
function addPlayerCards() {
  let totalValue = 0
  let acesCount = 0

  for (let card of playerOneHand) {
    if (card.value === 'A') {
      acesCount++
      totalValue += 11
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      totalValue += 10
    } else {
      totalValue += parseInt(card.value)
    }
  }

  // Adjust for aces
  while (totalValue > 21 && acesCount > 0) {
    totalValue -= 10
    acesCount--
  }

  if (totalValue > 21) {
    console.log('OVER 21')
    hitBtn.disabled = true
    return
  } else if (totalValue === 21){
    console.log('21 COUNT! YOU WIN')
    return hitBtn.disabled = true
  } else if (totalValue < 21 && playerOneHand.length === 5){
    console.log('OVER 5 - YOU WIN')
    return hitBtn.disabled = true
  }
}
function checkDecks(card){
  let duplicate = false
  playerOneHand.forEach(function(pOneCard){
    if (pOneCard.suit === card.suit && pOneCard.value === card.value) {
      duplicate = true
    }
  })
  return duplicate
}
// Renders Turn of P1
  function render() {
    frontCard0.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[0].combined}.svg`)
    frontCard1.style.display = 'none'
    frontCard2.style.display = 'none'
    frontCard3.style.display = 'none'
    frontCard4.style.display = 'none'
    
  
    if (playerOneHand[1]) {
      frontCard1.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[1].combined}.svg`)
      frontCard1.style.display = 'block'
    }
    if (playerOneHand[2]) {
      frontCard2.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[2].combined}.svg`)
      frontCard2.style.display = 'block'
    }
    if (playerOneHand[3]) {
      frontCard3.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[3].combined}.svg`)
      frontCard3.style.display = 'block'
    }
    if (playerOneHand[4]) {
      frontCard4.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[4].combined}.svg`)
      frontCard4.style.display = 'block'
    }
    console.log(playerOneHand)
  }

  

  //todo CREATE BET MECHANICS
  //todo CREATE PLAYER 1 FIRST TURN LOGIC
  //todo CREATE DEALER TURN LOGIC
  //todo CREATE TURN LOGIC
  //todo CREATE CARD FLIPS, CARD DISPOSING, AND DECK MECHANICS
  