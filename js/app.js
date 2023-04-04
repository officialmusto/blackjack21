/* ------------------- VARIABLES ------------------- */
// Separating the Card by their suit & value.
const suits = ['s', 'h', 'c', 'd'] // Spades, Hearts, Clubs, Diamonds
const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

// Establishing Deck Class to handle p1 deck, dealer deck, player deck, and the sorted deck.


// Establishing Cards Class to create an object with two key/value pairs that will be the selected random card from the 'HIT button.
class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
    this.combined = suit + value
  }
}
class Deck {
  constructor() {
    this.p1 = []
    this.dealer = []
    this.shuffled = []
  }
}

// Created a variable to utilize the '.push()' method and push the selected card into the dispose pile.
let decks = new Deck()
let playerOneHand = decks.p1
let shuffledDeck = decks.shuffled
let dealerHand = decks.dealer

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

const dealerCard0 = document.getElementById('dealer-card0')
const dealerCard1 = document.getElementById('dealer-card1')


/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleClick)
stayBtn.addEventListener('click', stayLogic)
betBtn.addEventListener('click', toggleSlider)
resetBtn.addEventListener('click', resetGame)

/* ------------------- FUNCTIONS ------------------- */
// GAME INITIALIZER
init()

function createFullDeck() {
  let newDeck = []
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push(new Card(suit, value))
    }
  }
  return newDeck
}

function init() {
  betSlider.style.display = 'none'
  if (shuffledDeck.length < 1) {
    generateCard()
    render()
    addPlayerCards()
    playerOneTurn()
    dealerTurn()
    createFullDeck()
  } else {
    hitBtn.disabled = true
    betSlider.style.display = 'none'
    frontOfCards.forEach(card => card.classList.add('animate-blur'))
    return
  }
}

function handleClick() {
  playerOneHand.push(shuffledDeck.pop())
  render()
  addPlayerCards()
  console.log(shuffledDeck)
}

function generateCard() {
  suitIdx = Math.floor(Math.random() * suits.length)
  suitPicked = suits[suitIdx]
  valueIdx = Math.floor(Math.random() * values.length)
  valuePicked = values[valueIdx]
  chosenCard = new Card(suitPicked, valuePicked)
  if (checkDecks(chosenCard)) {
    generateCard
  } else {
    shuffledDeck.push(chosenCard)
    chosenCard = new Card()
  }
  if (shuffledDeck.length < 52){
    generateCard()
  }
}
function playerOneTurn() {
  playerOneHand.push(shuffledDeck.pop(), shuffledDeck.pop())
  render()
  addPlayerCards()
}
function dealerTurn() {
  dealerHand.push(shuffledDeck.pop(), shuffledDeck.pop())
  render()
  addPlayerCards()
}
console.log(shuffledDeck)


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
    hitBtn.disabled = true
    setTimeout(function(){
    blurFrontOfCards()
    resetBtn.style.display = 'block'
    betSlider.style.display = 'none'
    betBtn.style.display = 'none'
    finalMessage.style.color = '#cc1e1e'
    finalMessage.innerText = `Lost your bet, try again? \nTOTAL : ${totalValue}`
    return
    }, 2000)
  } else if (totalValue === 21) {
    hitBtn.disabled = true
    setTimeout(function(){
    blurFrontOfCards()
    resetBtn.style.display = 'block'
    betSlider.style.display = 'none'
    betBtn.style.display = 'none'
    finalMessage.style.color = 'green'
    finalMessage.innerText = `21 COUNT! YOU WIN \nTOTAL : ${totalValue}`
    return
    }, 2000)
  } else if (totalValue < 21 && playerOneHand.length === 5) {
    hitBtn.disabled = true
    setTimeout(function(){
    blurFrontOfCards()
    resetBtn.style.display = 'block'
    betSlider.style.display = 'none'
    betBtn.style.display = 'none'
    finalMessage.style.color = 'green'
    finalMessage.innerText = `OVER 5 CARDS, BUT UNDER 21 - YOU WIN \nTOTAL : ${totalValue}`
    return
    }, 2000)
  }
}

function playDealerHand() {
  let dealerHandValue = 0
  let acesCount = 0
  let i = 0

  // Draw cards until the dealer's hand value is at least 17
  while (dealerHandValue < 17) {
    dealerHand.push(shuffledDeck.pop())
    i++
  // Calculate the dealer's current hand value
  for (let card of dealerHand) {
    if (card.value === 'A') {
      acesCount++
      dealerHandValue += 11
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      dealerHandValue += 10
    } else {
      dealerHandValue += parseInt(card.value)
    }
  }
  // Adjust for aces
  while (dealerHandValue > 21 && acesCount > 0) {
    dealerHandValue -= 10
    acesCount--
  }
  }
  return console.log(dealerHandValue)
}


function checkDecks(card) {
  let duplicate = false
  shuffledDeck.forEach(function(pOneCard) {
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
    card.style.filter = 'blur(20px)'
  })
}

function stayLogic() {
  stayBtn.disabled = true
  playDealerHand()
  addPlayerCards()
  finalMessage.innerText = 'BUTTON PRESSED!' // <-- TESTER
}

function determineWinner(){
  
}


function resetGame() {
  shuffledDeck.length = 0
  playerOneHand.length = 0
  frontOfCards.forEach(function(card) {
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
  betBtn.style.display = 'block'
  playerOneCards()
}

function playerOneCards() {
  if (playerOneHand.length < 2) {
    return
  }
  frontCard0.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[0].combined}.svg`)
  frontCard1.setAttribute('src', `assets/SVGs/front-of-cards/${playerOneHand[1].combined}.svg`)
  frontCard2.style.display = 'none'
  frontCard3.style.display = 'none'
  frontCard4.style.display = 'none'
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