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
/* ------------------- CACHED REFERENCES ------------------- */
title = document.querySelector('.title')
infoBox = document.querySelector('.game-info')

let hitBtn = document.getElementById('hit-btn')
let stayBtn = document.getElementById('stay-btn')
let betBtn = document.getElementById('bet-btn')
let resetBtn = document.getElementById('reset')
let betSlider = document.getElementById('bet-slider')
let finalMessage = document.getElementById('final-message')
let dealerTotal = document.getElementById('dealer-total')
let playerTotal = document.getElementById('player-total')
let betBalance = document.getElementById('player-balance')
let betValue = document.getElementById('current-bet-value')
let betAmount = document.getElementById('bet-amount')
betValue = 0
let nextBtn = document.getElementById('next-turn')

let frontCard0 = document.getElementById('card-front0')
let frontCard1 = document.getElementById('card-front1')
let frontCard2 = document.getElementById('card-front2')
let frontCard3 = document.getElementById('card-front3')
let frontCard4 = document.getElementById('card-front4')
let frontOfCards = document.querySelectorAll('.front-of-cards')

let dealerCard0 = document.getElementById('dealer-card0')
let dealerCard1 = document.getElementById('dealer-card1')
let dealerCard2 = document.getElementById('dealer-card2')
let dealerCard3 = document.getElementById('dealer-card3')
let dealerCard4 = document.getElementById('dealer-card4')

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
function createFullDeck() {
  let newDeck = []
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push(new Card(suit, value))
    }
  }
  return newDeck
}
init()

function init() {
  dealerCard2.style.display = 'none'
  dealerCard3.style.display = 'none'
  dealerCard4.style.display = 'none'
  console.log(dealerHand)
  betSlider.style.display = 'none'
  if (shuffledDeck.length < 1) {
    generateCard()
    dealerTurn()
    render()
    playerOneTurn()
    createFullDeck()
  } else {
    betBtn.disabled = false
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
    generateCard()
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
  dealerCard2.style.display = 'none'
  dealerCard3.style.display = 'none'
  while (calculateDealerHandValue() < 17) {
    dealerHand.push(shuffledDeck.pop())
    dealerCard0.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[0].combined}.svg`)
    dealerCard1.setAttribute('src', `assets/SVGs/back-of-cards/back-blue.svg`)
    if (dealerHand[2]) {
      dealerCard2.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[2].combined}.svg`)
    }
    if (dealerHand[3]) {
      dealerCard3.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[3].combined}.svg`)
    }
    
    if (dealerHand[4]) {
      dealerCard4.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[4].combined}.svg`)
    }
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
      console.log(`if statement is running:`)
      betSlider.style.display = 'block'
      betBtn.innerText = 'confirm'
      stayBtn.style.display = 'none'
      hitBtn.style.display = 'none'
      betValue = betSlider.value
    } else {
      betBtn.innerText = `$${betValue}`
      betSlider.style.display = 'none'
      stayBtn.style.display = 'block'
      hitBtn.style.display = 'block'
    }
}
function checkBalanceZero() {
  dealerHandValue = decks.dealerHandValue
  playerHandValue = decks.playerHandValue
    if (playerBalance <= 0) {
      hitBtn.disabled = true
      stayBtn.disabled = true
      betSlider.style.display = "none"
      setTimeout(function(){
        blurFrontOfCards()
        betSlider.style.display = "none"
        finalMessage.innerText = `Balance: $0, you lost.`
        playerBalance -= betValue
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
        betValue.textContent = "$0"
      }, 1000)
    }
}
function updateBet() {
  // console.log(betValue)
    betValue = Math.min(betSlider.value, playerBalance)
    betBalance.innerText = `$${playerBalance - betValue}`
    document.getElementById('current-bet-value').innerText = `$${betValue}`
}
function blurFrontOfCards() {
  frontOfCards.forEach(function(card) {
    card.style.filter = 'blur(20px)'
  })
}
function stayLogic() {
  stayBtn.disabled = true
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
      betBalance = betValue
      betValue = 0
      dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
      dealerCard1.style.display = 'block'
      dealerCard2.style.display = 'block'
      dealerCard3.style.display = 'block'
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
        dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
        dealerCard1.style.display = 'block'
        dealerCard2.style.display = 'block'
        dealerCard3.style.display = 'block'
        blurFrontOfCards()
        playerBalance += betValue
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
        betValue = 0
        dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
        dealerCard1.style.display = 'block'
        dealerCard2.style.display = 'block'
        dealerCard3.style.display = 'block'
        blurFrontOfCards()
        playerBalance -= betValue
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
      playerBalance -= betValue
      setTimeout(function(){
        blurFrontOfCards()
        dealerTotal.innerText = `Dealer Total : ${dealerHandValue}`
        playerTotal.innerText = `Player Total : ${playerHandValue}`
        dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
        dealerCard1.style.display = 'block'
        dealerCard2.style.display = 'block'
        dealerCard3.style.display = 'block'
        frontCard0.style.display = 'none'
        frontCard1.style.display = 'none'
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
      }, 2000)
  } else if (playerHandValue > dealerHandValue) {
      hitBtn.style.pointerEvents = "none"
      stayBtn.style.pointerEvents = "none"
      hitBtn.disabled = true
      stayBtn.disabled = true
      setTimeout(function(){
        dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
        dealerCard1.style.display = 'block'
        dealerCard2.style.display = 'block'
        dealerCard3.style.display = 'block'
        blurFrontOfCards()
        playerBalance += betValue 
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
        betValue = playerBalance
        dealerCard1.setAttribute('src', `assets/SVGs/front-of-cards/${dealerHand[1].combined}.svg`)
        dealerCard1.style.display = 'block'
        dealerCard2.style.display = 'block'
        dealerCard3.style.display = 'block'
        blurFrontOfCards()
        playerBalance = betValue 
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
      betBalance.innerText = `$${playerBalance}`
      dealerTurn()
    }
}
function resetGame() {
  console.log((betSlider.disabled))
  frontCard0.style.display = 'block'
  frontCard1.style.display = 'block'
  dealerCard2.style.display = 'none'
  dealerCard3.style.display = 'none'
  dealerCard4.style.display = 'none'
  dealerCard1.setAttribute('src', `assets/SVGs/back-of-cards/back-blue.svg`)
  playerBalance = 100
  betSlider.max = playerBalance
  betValue = betBalance.innerText
  betBalance.innerText = '$100'
  betAmount.innerText = 'Bet Amount '
  betValue.innerText = `$0`
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
  betBtn.disabled = false
  betSlider.disabled = false
  betSlider.style.display = 'none'
  betValue = 0
  title.style.display = 'block'
  infoBox.style.display = 'block'
  init()
}
function nextTurn(){
  frontCard0.style.display = 'block'
  frontCard1.style.display = 'block'
  checkBalanceZero()
  betSlider.max = playerBalance
  betSlider.value = 0
  betAmount.innerText = `Bet Amount `
  betValue = 
  betValue = playerBalance
  betBalance.innerText = `$${playerBalance}`
  betSlider.value = 1
  shuffledDeck.length = 0
  playerOneHand.length = 0
  dealerHand.length = 0
  dealerCard1.setAttribute('src', `assets/SVGs/back-of-cards/back-blue.svg`)
  dealerCard2.style.display = 'none'
  dealerCard3.style.display = 'none'
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
  betSlider.disabled = false
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
  nextBtn.style.display = 'none'
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