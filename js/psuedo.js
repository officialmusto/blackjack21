/* ----------------------- Psuedo Code for game of -----------------------
/                                  BLACKJACK

GAME STRUCTURE:
-1 BET button
-1 RESET button to reset all activity, bets, and money in game
-1 HIT button to initiate a new card into hand
-1 STAY button to end turn of P1 automatically and end all betting activity from P1
? All in button?
-52 CARDS that have values according to their suit and value. 
-


GAME START:
-P1 is given $100 to start game.
!-IF P1 DOES NOT HAVE MONEY, GAME CANNOT START
-A minimum of a $1 bet is needed in order to proceed and keep continuation of game.
-Dealer deals P1 2 Cards
-2 cards face UP given to P1 after betting. 
-2 cards, 1 face UP & 1 face DOWN given to dealer after
? Find a way to alternate math.random between P1 and dealer when dealing cards?

GAME TURNS:
-Start with dealer last (!dealer or something) so P1 goes FIRST
!-IF CARDS EQUAL 21, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN
-P1 has choice of choosing either HIT or STAY
!-IF 'HIT', RANDOMIZED CARD THAT HAS NOT BEEN SELECTED WILL BE ADDED TO P1'S HAND
  !IF NEW CARD ADDED TOTALS HAND TO > 21, {
    !AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
  !} ELSE IF CARD === A {
    !ASK P1 IF A === 1 || A === 11, {
      !IF P1 CHOOSES 1, A === 1
      !ELSE A === 11
    !} ELSE, ADD CARD TO HAND AND COMBINE TOTAL AND CHECKS AGAIN TO SEE IF CARD > 21, REPEATS PROCESS.
!-IF 'STAY', REVEAL DEALER CARDS
    !IF DEALER CARDS > 21, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN
    !ELSE IF DEALER CARDS === 21, AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
    !ELSE, COMPARE P1 HAND AND DEALER HAND,

  !IF DEALER HAND >= P1 HAND, AUTOMATICALLY LOSE, FOLD ALL BETS, AND COMMENCE NEXT TURN
  !IF DEALER HAND < P1 HAND, AUTOMATICALLY WIN, MULTIPLY BETS BY 1.5X, AND COMMENCE NEXT TURN


-------------------------------------------------------------------------------- */
