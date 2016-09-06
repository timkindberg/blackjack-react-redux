import { newShuffledPokerDeck, calculatePlayerScore } from '../cards';

export const statuses = {
  PLAYING: 'Playing',
  WIN: 'Win',
  LOSE: 'Lose'
};

const initialState = {
  drawPile: newShuffledPokerDeck(),
  dealerHand: [],
  dealerScore: 0,
  playerHand: [],
  playerScore: 0,
  status: statuses.PLAYING
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEAL':
      // Let's pull the first four cards out of the drawPile
      let [playerCard1, dealerCard1, playerCard2, dealerCard2] = state.drawPile;













      // We have to turn the first dealer card face down.
      // How should we do it, A or B? Why?

        // A:
      dealerCard1 = { ...dealerCard1, faceDown: true };

        // B:
      dealerCard1.faceDown = true;














      // We need to return the new state
      // What should we return, A or B? Why?

        // A:
      state.drawPile = state.drawPile.splice(0, 4);
      state.dealerHand = ['??', '??'];
      state.playerHand = ['??', '??'];
      return state;

        // B:
      return {
        ...state,
        drawPile: drawPile,
        dealerHand: ['??', '??'],
        playerHand: ['??', '??']
      };















    case 'HIT':
      // We will draw a card and capture the remainin pile
      const [drawnCard, ...remainingPile] = state.____;
      const hitHandKey = `${action.____}Hand`;
      const hitHand = state[hitHandKey];

      // This ain't right...
      // - We need to set the drawPile to the remaining pile
      // - We need to add the drawnCard to the player hand that was hit
      return {
        ...state
      };
















    // Now we need to 'TALLY'
    // - You can use the `calculatePlayerScore(anyHandOfCards)` to figure out the score for a hand
    case '??':
      return void(0);























    case 'OUTCOME':
      const calculateStatus = () => {
        if (state.playerScore === 21) return statuses.____;
        if (state.playerScore > 21) return statuses.____;
        if (state.dealerScore > 21) return statuses.____;
        if (state.playerScore >= state.dealerScore) return statuses.____;
        if (state.playerScore < state.dealerScore) return statuses.____;
        return statuses.____;
      };

      const turnAllFaceDown =  c => ({ ...c, faceDown: false });

      return {
        ...state
      };














    default:
      return state;
  }
};

export default reducer


////////////////////////////////////////////////////////////////////
//////// ANSWERS BELOW - SCROLL SLOW - DON'T CHEAT!! ///////////////
////////////////////////////////////////////////////////////////////
















// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'DEAL':
//       const [playerCard1, dealerCard1, playerCard2, dealerCard2] = state.drawPile;
//       dealerCard1.faceDown = true;
//
//       return {
//         ...state,
//         drawPile: state.drawPile.slice(4),
//         dealerHand: [dealerCard1, dealerCard2],
//         playerHand: [playerCard1, playerCard2],
//         status: statuses.PLAYING
//       };
//
//     case 'HIT':
//       const [drawnCard, ...remainingPile] = state.drawPile;
//       const hitHandKey = `${action.who}Hand`;
//       const hitHand = state[hitHandKey];
//
//       return {
//         ...state,
//         drawPile: remainingPile,
//         [hitHandKey]: [...hitHand, drawnCard]
//       };
//
//     case 'TALLY':
//       return {
//         ...state,
//         dealerScore: calculatePlayerScore(state.dealerHand),
//         playerScore: calculatePlayerScore(state.playerHand)
//       };
//
//     case 'OUTCOME':
//       const calculateStatus = () => {
//         if (state.playerScore === 21) return statuses.WIN;
//         if (state.playerScore > 21) return statuses.LOSE;
//         if (state.dealerScore > 21) return statuses.WIN;
//         if (state.playerScore >= state.dealerScore) return statuses.WIN;
//         if (state.playerScore < state.dealerScore) return statuses.LOSE;
//         return statuses.PLAYING;
//       };
//
//       return {
//         ...state,
//         status: calculateStatus(),
//         dealerHand: state.dealerHand.map(c => ({ ...c, faceDown: false }))
//       };
//
//     default:
//       return state;
//   }
// };