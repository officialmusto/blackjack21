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
    this.dealerHandValue = 0
    this.playerHandValue = 0
  }
}
// Created a variable to utilize the '.push()' method and push the selected card into the dispose pile.
let decks = new Deck()
let playerOneHand = decks.p1
let shuffledDeck = decks.shuffled
let dealerHand = decks.dealer

let playerBalance = 100
let currentBet = 0
/* ------------------- CACHED REFERENCES ------------------- */
title = document.querySelector('.title')
infoBox = document.querySelector('.game-info')

const hitBtn = document.getElementById('hit-btn')
const stayBtn = document.getElementById('stay-btn')
const betBtn = document.getElementById('bet-btn')
const resetBtn = document.getElementById('reset')
const betSlider = document.getElementById('bet-slider')
const finalMessage = document.getElementById('final-message')
const dealerTotal = document.getElementById('dealer-total')
const playerTotal = document.getElementById('player-total')
const betBalance = document.getElementById('player-balance')
const betValue = document.getElementById('current-bet-value')
const betAmount = document.getElementById('bet-amount')
const nextBtn = document.getElementById('next-turn')

const frontCard0 = document.getElementById('card-front0')
const frontCard1 = document.getElementById('card-front1')
const frontCard2 = document.getElementById('card-front2')
const frontCard3 = document.getElementById('card-front3')
const frontCard4 = document.getElementById('card-front4')
const frontOfCards = document.querySelectorAll('.front-of-cards')

const dealerCard0 = document.getElementById('dealer-card0')
const dealerCard1 = document.getElementById('dealer-card1')


/* ------------------- EVENT LISTENERS ------------------- */
hitBtn.addEventListener('click', handleHitClick)
stayBtn.addEventListener('click', stayLogic)
// betBtn.addEventListener('click', toggleSlider)
resetBtn.addEventListener('click', resetGame)
betSlider.addEventListener('input', updateBet)
betBtn.addEventListener('click', function() {
  toggleSlider()
})

nextBtn.addEventListener('click', nextTurn)

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
    playerOneTurn()
    createFullDeck()
  } else {
    hitBtn.disabled = true
    betSlider.style.display = 'none'
    return
  }
  nextBtn.style.display = 'none'
}
function handleHitClick() {
    playerOneHand.push(shuffledDeck.pop())
    playerOneTurn()
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
  if (playerOneHand.length < 2){
  playerOneHand.push(shuffledDeck.pop(), shuffledDeck.pop())
  render()
  } else {

    render()
  }
}
function dealerTurn() {
  while (calculateDealerHandValue() < 17) {
    dealerHand.push(shuffledDeck.pop())
    calculatePlayerHandValue(dealerHand)
  }
}
function calculatePlayerHandValue() {
  let handValue = 0
  let acesCount = 0

  for (let card of playerOneHand) {
    if (card.value === 'A') {
      acesCount++
      handValue += 11
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      handValue += 10
    } else {
      handValue += parseInt(card.value)
    }
  }

  while (handValue > 21 && acesCount > 0) {
    handValue -= 10
    acesCount--
  }

  return handValue
}
function calculateDealerHandValue() {
  let handValue = 0
  let acesCount = 0

  for (let card of dealerHand) {
    if (card.value === "A") {
      acesCount++
      handValue += 11
    } else if (["J", "Q", "K"].includes(card.value)) {
      handValue += 10
    } else {
      handValue += parseInt(card.value)
    }
  }

  while (handValue > 21 && acesCount > 0) {
    handValue -= 10
    acesCount--
  }

  return handValue
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
      betBtn.innerText = 'Bet'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      currentBet = betSlider.value
    } else {
      betBtn.disabled = true
      betBtn.innerText = `betted: $${currentBet}`
      betSlider.style.display = 'none'
      stayBtn.style.display = 'block'
      hitBtn.style.display = 'block'
    }
  }

function applyBet() {
    currentBet = betSlider.value;
    betBalance.innerText = `Balance : $${playerBalance}`
    betBtn.innerText = `Bet: $${currentBet}`
    toggleSlider()
    betBtn.disabled = true
  }
  
function checkBalanceZero() {
  dealerHandValue = decks.dealerHandValue
  playerHandValue = decks.playerHandValue
    if (playerBalance <= 0) {
      setTimeout(function(){
        blurFrontOfCards()
        hitBtn.disabled = true
        stayBtn.disabled = true
        betBtn.disabled = true
        betSlider.style.display = "none"
        finalMessage.innerText = `Balance: $0, you lost.`
        playerBalance -= currentBet
        resetBtn.style.display = 'block'
        nextBtn.style.display = 'none'
        stayBtn.style.display = 'none'
        hitBtn.style.display = 'none'
        betBtn.style.display = 'none'
        title.style.display = 'none'
        infoBox.style.display = 'none'
        finalMessage.style.color = '#cc1e1e'
        dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
        playerTotal.innerText = `Player Total : ${playerHandValue}`
        betBalance.textContent = "$0"
        betValue.textContent = "$100"
        }, 2000)
      }
  }

function updateBet() {
    currentBet = Math.min(betSlider.value, playerBalance)
    betBalance.innerText = `Balance : $${playerBalance - currentBet}`
    document.getElementById('current-bet-value').innerText = `$${currentBet}`
  }

function blurFrontOfCards() {
  frontOfCards.forEach(card => {
    card.style.filter = 'blur(20px)'
  })
}
function stayLogic() {
  stayBtn.disabled = true
  dealerTurn()
  calculatePlayerHandValue()
  determineWinner()
}
function determineWinner() {
  let dealerHandValue = calculateDealerHandValue(dealerHand)
  let playerHandValue = calculatePlayerHandValue(playerOneHand)

  console.log(`Dealer hand value: ${dealerHandValue}`)
  console.log(`Player hand value: ${playerHandValue}`)

  if (dealerHandValue > 21 && playerHandValue > 21) {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
      blurFrontOfCards()
      playerBalance += currentBet
      nextBtn.style.display = 'block'
      resetBtn.style.display = 'block'
      betSlider.style.display = 'none'
      betBtn.style.display = 'none'
      stayBtn.style.display = 'none'
      title.style.display = 'none'
      infoBox.style.display = 'none'
      hitBtn.style.display = 'none'
      finalMessage.style.color = 'blue'
      finalMessage.innerText = `Both bust! It's a tie!`
      dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
      playerTotal.innerText = `Player Total : ${playerHandValue}`
    }, 2000)
  } else if (dealerHandValue > 21) {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
      blurFrontOfCards()
      playerBalance += currentBet
      playerBalance += parseInt(currentBet) * 2
      nextBtn.style.display = 'block'
      resetBtn.style.display = 'block'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      betSlider.style.display = 'none'
      betBtn.style.display = 'none'
      title.style.display = 'none'
      infoBox.style.display = 'none'
      finalMessage.style.color = 'green'
      finalMessage.innerText = `Dealer busts! Player wins!`
      dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
      playerTotal.innerText = `Player Total : ${playerHandValue}`
      }, 2000)
  } else if (playerHandValue > 21) {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
    blurFrontOfCards()
    playerBalance -= currentBet
    nextBtn.style.display = 'block'
    resetBtn.style.display = 'block'
    stayBtn.style.display = 'none'
    hitBtn.style.display = 'none'
    betSlider.style.display = 'none'
    betBtn.style.display = 'none'
    title.style.display = 'none'
    infoBox.style.display = 'none'
    finalMessage.style.color = '#cc1e1e'
    finalMessage.innerText = `Player busts! Dealer wins!`
    dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
    playerTotal.innerText = `Player Total : ${playerHandValue}`
    }, 2000)
  } else if (dealerHandValue > playerHandValue) {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
      blurFrontOfCards()
      playerBalance -= currentBet
      nextBtn.style.display = 'block'
      resetBtn.style.display = 'block'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      betSlider.style.display = 'none'
      betBtn.style.display = 'none'
      title.style.display = 'none'
      infoBox.style.display = 'none'
      finalMessage.style.color = '#cc1e1e'
      finalMessage.innerText = `Dealer wins!`
      dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
      playerTotal.innerText = `Player Total : ${playerHandValue}`
      }, 2000)
  } else if (playerHandValue > dealerHandValue) {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
      blurFrontOfCards()
      playerBalance += currentBet
      nextBtn.style.display = 'block'
      resetBtn.style.display = 'block'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      betSlider.style.display = 'none'
      betBtn.style.display = 'none'
      title.style.display = 'none'
      infoBox.style.display = 'none'
      finalMessage.style.color = 'green'
      finalMessage.innerText = `Player wins!`  
      dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
      playerTotal.innerText = `Player Total : ${playerHandValue}`  
    }, 2000)
  } else {
    hitBtn.style.pointerEvents = "none"
    stayBtn.style.pointerEvents = "none"
    hitBtn.disabled = true
    stayBtn.disabled = true
    setTimeout(function(){
      blurFrontOfCards()
      playerBalance += currentBet
      nextBtn.style.display = 'block'
      resetBtn.style.display = 'block'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      betSlider.style.display = 'none'
      betBtn.style.display = 'none'
      title.style.display = 'none'
      infoBox.style.display = 'none'
      finalMessage.style.color = 'blue'
      finalMessage.innerText = `It's a tie!`
      dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
      playerTotal.innerText = `Player Total : ${playerHandValue}`
      }, 2000)
      betBalance.innerText = `Balance : $${playerBalance}`
      checkBalanceZero()
  }
}
function resetGame() {
  betSlider.max = playerBalance
  betSlider.value = currentBet
  playerBalance = 100
  betBalance.innerText = 'Balance: $100'
  betAmount.innerText = 'Bet Amount: '
  betValue.value = 0
  currentBet = 0
  betSlider.value = 1
  shuffledDeck.length = 0
  playerOneHand.length = 0
  dealerHand.length = 0
  frontOfCards.forEach(function(card) {
  card.style.filter = 'none'
  })
  betBtn.innerText = '$$$'
  hitBtn.style.pointerEvents = 'auto'
  stayBtn.style.pointerEvents = 'auto'
  dealerTotal.innerText = ''
  playerTotal.innerText = ''
  finalMessage.innerText = ''
  hitBtn.disabled = false
  stayBtn.disabled = false
  betSlider.style.display = 'none'
  betBtn.disabled = false
  currentBet = 0
  title.style.display = 'block'
  infoBox.style.display = 'block'
  init()
}
function nextTurn(){
  checkBalanceZero()
  betSlider.max = playerBalance
  betSlider.value = currentBet
  betBalance.innerText = `Balance: $${playerBalance}`
  betAmount.innerText = `Bet Amount: `, 
  betSlider.value = 1
  shuffledDeck.length = 0
  playerOneHand.length = 0
  dealerHand.length = 0
  frontOfCards.forEach(function(card) {
  card.style.filter = 'none'
  })
  betBtn.innerText = '$$$'
  hitBtn.style.pointerEvents = 'auto'
  stayBtn.style.pointerEvents = 'auto'
  dealerTotal.innerText = ''
  playerTotal.innerText = ''
  finalMessage.innerText = ''
  hitBtn.disabled = false
  stayBtn.disabled = false
  betSlider.style.display = 'none'
  betBtn.disabled = false
  title.style.display = 'block'
  infoBox.style.display = 'block'
  betBtn.style.display = 'block'
  stayBtn.style.display = 'block'
  hitBtn.style.display = 'block'
  nextBtn.style.display = 'none'
  resetBtn.style.display = 'none'
  init()
}

function render() {
  resetBtn.style.display = 'none'
  betBtn.style.display = 'block'
  stayBtn.style.display = 'block'
      hitBtn.style.display = 'block'
  playerOneCards()
  checkPlayerHandValue()
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
function checkPlayerHandValue() {
  if (calculatePlayerHandValue() >= 21) {
    stayLogic()
  }
}