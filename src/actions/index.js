// This action will add up both player's hands to attain their current scores
// This one is good to go.
export const tally = () => ({ type: 'TALLY' });

// - We want to 'DEAL'.
// - We also want to 'TALLY' up the scores after that. How can we do that? How can we dispatch multiple actions
//   from this one action?
// - We also want to see the 'OUTCOME' if the player immediately busts or gets blackjack. How can we do that?
export const deal = () => ({
  type: '??' // I'll get you started by showing that you at least need a type...
});

// - We want to 'HIT', but we also need to specify 'who' we will hit.
// - Just like 'deal' we want to 'TALLY' and then see the 'OUTCOME' if the player busts or gets blackjack.
// You are on your own with this one :)
export const hit = null;

// This action is a bit different. We want to be able to do multiple dispatches just like deal and hit, but it doesn't have
// it's own 'STAND' action type (because standing doesn't change our global state). Standing just means the player is done.
// - So we want to play out the dealers hand until he has 17 or greater.
// - Then we want to see the 'OUTCOME'
export const stand = null;









////////////////////////////////////////////////////////////////////
//////// ANSWERS BELOW - SCROLL SLOW - DON'T CHEAT!! ///////////////
////////////////////////////////////////////////////////////////////












// export const deal = () => (dispatch, getState) => {
//   dispatch({ type: 'DEAL'});
//   dispatch(tally());
//   if (getState().playerScore >= 21) {
//     dispatch({ type: 'OUTCOME' });
//   }
// };









// export const hit = (who) => (dispatch, getState) => {
//   dispatch({ type: 'HIT', who });
//   dispatch(tally());
//   if (getState().playerScore >= 21) {
//     dispatch({ type: 'OUTCOME' });
//   }
// };









// export const stand = () => (dispatch, getState) => {
//   while (getState().dealerScore < 17) {
//     dispatch(hit('dealer'));
//   }
//   dispatch({ type: 'OUTCOME' });
// };