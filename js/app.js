/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['♠','♥', '♣', '♦']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


// Establishing Deck Class to handle disposed deck, dealer deck, player deck, and the sorted deck.
class Deck {
  constructor(cards){
    this.cards = cards
  }
}

// Establishing Cards Class to create an object with two key/value pairs that will be the selected random card from the 'HIT button.
  class Card{
    constructor(suit, value){
      this.suit = suit
      this.value = value
  }
}

// // Picks random Suit from suits array.
// let suitIdx = Math.floor(Math.random() * suits.length)
// let suitPicked = suits[suitIdx]
// console.log(suitPicked)

// // Picks random Value form values array.
// let valueIdx = Math.floor(Math.random() * values.length)
// let valuePicked = values[valueIdx]
// console.log(valuePicked)
/* ------------------- CACHED REFERENCES ------------------- */
pickCardBtn = document.getElementById('pick-card-btn')




/* ------------------- EVENT LISTENERS ------------------- */
pickCardBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */
function handleClick(){
  // Picks random Suit from suits array.
let suitIdx = Math.floor(Math.random() * suits.length)
let suitPicked = suits[suitIdx]
console.log(suitPicked)

// Picks random Value form values array.
let valueIdx = Math.floor(Math.random() * values.length)
let valuePicked = values[valueIdx]
console.log(valuePicked)
}
