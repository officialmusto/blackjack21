
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
const betBtn = document.getElementById('bet-btn')
const resetBtn = document.getElementById('reset')
const betSlider = document.getElementById('bet-slider')
const finalMessage = document.getElementById('final-message')

const frontCard0 = document.getElementById('card-front0')
const frontCard1 = document.getElementById('card-front1')
const frontCard2 = document.getElementById('card-front2')
const frontCard3 = document.getElementById('card-front3')
const frontCard4 = document.getElementById('card-front4')
const frontOfCards = document.querySelectorAll('.front-of-cards')



/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)
stayBtn.addEventListener('click', stayLogic)
betBtn.addEventListener('click', toggleSlider)
resetBtn.addEventListener('click', resetGame)



/* ------------------- FUNCTIONS ------------------- */
// GAME INITIALIZER
init()

function init(){
  playerOneTurn()
  render()
  betSlider.style.display = 'none'
  frontOfCards.forEach(card => card.classList.add('animate-blur'));
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
    blurFrontOfCards()
    betSlider.style.display = 'block'
    finalMessage.style.color = '#cc1e1e'
    resetBtn.style.display = 'block'
    finalMessage.innerText = `Lost your bet, try again? \nTOTAL: ${totalValue}`
    hitBtn.disabled = true
    return
  } else if (totalValue === 21){
    blurFrontOfCards()
    resetBtn.style.display = 'block'
    finalMessage.style.color = 'green'
    finalMessage.innerText = `21 COUNT! YOU WIN \nTOTAL: ${totalValue}`
    return hitBtn.disabled = true
  } else if (totalValue < 21 && playerOneHand.length === 5){
    blurFrontOfCards()
    resetBtn.style.display = 'block'
    finalMessage.style.color = 'green'
    finalMessage.innerText = `OVER 5, BUT UNDER 21 - YOU WIN \nTOTAL: ${totalValue}`
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

function toggleSlider() {
  if (betSlider.style.display === 'none') {
    betSlider.style.display = 'block'
  } else {
    betSlider.style.display = 'none'
  }
}

function blurFrontOfCards() {
  frontOfCards.forEach(card => {
    card.style.filter = 'blur(20px)' // Adjust the blur value as needed (e.g., 'blur(3px)', 'blur(8px)', etc.)
  })
}


function stayLogic(){
  finalMessage.innerText = 'BUTTON PRESSED!'
}

function resetGame() {
  playerOneHand.length = 0
  frontOfCards.forEach(function(card){
    card.style.filter = 'none'
  })
  finalMessage.innerText = ''
  hitBtn.disabled = false
  betSlider.style.display = 'none'
  init()
}


// Renders Turn of P1
function render() {
  resetBtn.style.display = 'none'
  playerOneCards()
  }

function playerOneCards(){
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
}

  // Create a function to generate a complete deck of cards (52 unique cards), then shuffle it.

  // Instead of generating a random card in the generateCard() function, draw a card from the shuffled deck and remove it from the deck to prevent duplicates.
  
  // Create functions to handle the dealer's logic
  //    a. Automatically draw cards until the dealer's hand value is at least 17.
  //    b. Determine the winner based on the player's and dealer's hand values.
  
  // Enhance the init() function to deal two initial cards for both the player and the dealer.

  // Add functionality to the 'Stay' button to trigger the dealer's turn and the end of the game.

  // Implement betting mechanics to allow players to place bets before each round.

  // Optimize the render function to handle both player and dealer cards, and consider hiding one of the dealer's cards until the end of the round.
  
  // Add game state tracking to manage different stages of the game, such as betting, playing, dealer's turn, and determining the winner.
  
  // Include any additional rules or features you would like to implement, such as splitting, doubling down, or insurance.