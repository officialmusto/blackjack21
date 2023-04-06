
/* ----------------------- Psuedo Code for game of -----------------------
/                                  BLACKJACK

GAME STRUCTURE:
-1 BET button
-1 RESET button to reset all activity, bets, and money in game
-1 HIT button to initiate a new card into hand
-1 STAY button to end turn of P1 automatically and end all betting activity from P1
? All in button?
-52 CARDS that have values according to their suit and value. 

// Step 1: Modify the Deck class

// Add a dealer property to the Deck class that will store the dealer's hand.
// Step 2: Update the init function

// Deal two initial cards for both the player and the dealer during game initialization.
// Step 3: Add dealer's logic function

// Create a function playDealerHand that will handle the dealer's logic. This function will automatically draw cards for the dealer until the dealer's hand value is at least 17.
// Step 4: Modify the stayLogic function

// Update the stayLogic function to trigger the dealer's turn by calling the playDealerHand function when the 'Stay' button is clicked.

// Step 5: Determine the winner

// Create a function determineWinner that will compare the player's and dealer's hand values and determine the winner.

Step 6: Update the render function

Modify the render function to handle both player and dealer cards. Consider hiding one of the dealer's cards until the end of the round (you can use CSS to hide the card and reveal it later).

// Step 7: Modify the game flow
// After the dealer's turn is complete, call the determineWinner function to determine the winner and display the result.
// Here's a summary of the steps to implement the dealer functionality:

// Modify the Deck class to store the dealer's hand.
// Update the init function to deal two initial cards for both the player and the dealer.
// Create a function playDealerHand to handle the dealer's logic.
// Update the stayLogic function to trigger the dealer's turn by calling playDealerHand.
// Create a function determineWinner to determine the winner based on player's and dealer's hand values.
// Update the render function to handle both player and dealer cards.
// Modify the game flow to determine the winner and display the result after the dealer's turn is complete.

-CARDS DO NOT UPDATE AFTER PRESSING TURN

-BET AMOUNT UPDATES AFTER PRESSING BET BUTTON 
!MAYBE DISABLE BET BUTTON AFTER SLIDER IS TOGGLED


--------------------------------------------------------------------------------------------------------- */

