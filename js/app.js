/* ------------------- VARIABLES ------------------- */

// Separating the Card by their suit & value.
const suits = ['♠','♥', '♣', '♦']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


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


let chosenCard = new Card()

// Created a variable to utilize the '.push()' method and push the selected card into the dispose pile.
let decks = new Deck()
/* ------------------- CACHED REFERENCES ------------------- */
const pickCardBtn = document.getElementById('pick-card-btn')




/* ------------------- EVENT LISTENERS ------------------- */
pickCardBtn.addEventListener('click', handleClick)



/* ------------------- FUNCTIONS ------------------- */


init()

function init(){}

function handleClick() {
  checkForDuplicates()
  generateCard()
  render()
}
  
  function generateCard(){
  // Picks random Suit from suits array.
  let suitIdx = Math.floor(Math.random() * suits.length)
  let suitPicked = suits[suitIdx]

  // Picks random Value from values array.
  let valueIdx = Math.floor(Math.random() * values.length)
  let valuePicked = values[valueIdx]

  // Combines both value & suit into an object within Card class.
  let chosenCard = new Card(suitPicked, valuePicked)

  // Sends chosen card to disposed pile. //! WILL BE CHANGED TO A MORE-APPROPIATE DECK.
  decks.disposed.push(chosenCard)
}
  
  // Checks for Duplicates in decks Class. 
  function checkForDuplicates() {
    let isDuplicate = false;
  
    //? FIGURE OUT HOW TO NOT STORE DUPLICATES.
    decks.disposed.forEach(function(disposedCard) {
      disposedCard = console.log(disposedCard)
      // if (disposedCard.suit === chosenCard.suit && disposedCard.value === chosenCard.value) {
      //   isDuplicate = true
      // }
    })
  
    return isDuplicate;
  }
  

//? HOW TO MAKE THIS FUNCTION NEEDED? RE-WATCH OLD LECTURE
  // Renders Turn of P1
  function render(){
    console.log(decks.disposed)
  }