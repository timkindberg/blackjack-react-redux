import { newShuffledPokerDeck, calculatePlayerScore } from '../cards';

export const statuses = {
  PLAYING: 'Playing',
  WIN: 'Win',
  LOSE: 'Lose'
};

export const newGameState = () => ({
  drawPile: newShuffledPokerDeck(),
  dealerHand: [],
  dealerScore: 0,
  playerHand: [],
  playerScore: 0,
  status: statuses.PLAYING
});

const reducer = (state = newGameState(), action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return newGameState();

    case 'DEAL':
      const [playerCard1, dealerCard1, playerCard2, dealerCard2] = state.drawPile;
      dealerCard1.faceDown = true;

      return {
        ...state,
        drawPile: state.drawPile.slice(4),
        dealerHand: [dealerCard1, dealerCard2],
        playerHand: [playerCard1, playerCard2],
        status: statuses.PLAYING
      };

    case 'HIT':
      const [drawnCard, ...remainingPile] = state.drawPile;
      const hitHandKey = `${action.who}Hand`;
      const hitHand = state[hitHandKey];

      return {
        ...state,
        drawPile: remainingPile,
        [hitHandKey]: [...hitHand, drawnCard]
      };
    
    case 'TALLY':
      return {
        ...state,
        dealerScore: calculatePlayerScore(state.dealerHand),
        playerScore: calculatePlayerScore(state.playerHand)
      };

    case 'FINAL_SCORE':
      const calculateStatus = () => {
        if (state.playerScore === 21) return statuses.WIN;
        if (state.playerScore > 21) return statuses.LOSE;
        if (state.dealerScore > 21) return statuses.WIN;
        if (state.playerScore >= state.dealerScore) return statuses.WIN;
        if (state.playerScore < state.dealerScore) return statuses.LOSE;
        return statuses.PLAYING;
      };

      return {
        ...state,
        status: calculateStatus(),
        dealerHand: state.dealerHand.map(c => ({ ...c, faceDown: false }))
      };

    default:
      return state;
  }
};

export default reducer