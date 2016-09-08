import { createStore } from 'redux';
import { card as c } from '../cards';
import reducer, { statuses } from './game';

describe('Reducer', () => {
  let ace, king, queen, jack, ten, nine, eight, seven, six, five, four, three, two, store;

  beforeEach(() => {
    ace = c('A', '♥');
    king = c('K', '♥');
    queen = c('Q', '♥');
    jack = c('J', '♥');
    ten = c(10, '♥');
    nine = c(9, '♥');
    eight = c(8, '♥');
    seven = c(7, '♥');
    six = c(6, '♥');
    five = c(5, '♥');
    four = c(4, '♥');
    three = c(3, '♥');
    two = c(2, '♥');
  });
  
  describe('NEW_GAME', () => {
    it('starts a new game', () => {
      const store = createStore(reducer);

      store.dispatch({ type: 'NEW_GAME' });

      store.getState().drawPile.should.have.length(52);
      store.getState().dealerHand.should.have.length(0);
      store.getState().playerHand.should.have.length(0);
    });
  });

  describe('DEAL', () => {
    beforeEach(() => {
      const initialState = {
        drawPile: [ace, king, queen, jack],
        dealerHand: [],
        playerHand: [],
        status: statuses.WIN
      };
      store = createStore(reducer, initialState);
    });

    it('deals two cards to each person starting with player', () => {
      store.dispatch({ type: 'DEAL' });

      store.getState().drawPile.should.be.empty;
      store.getState().playerHand.should.eql([ace, queen]);
      store.getState().dealerHand.should.eql([{ ...king, faceDown: true }, jack]);
    });

    it('keeps one of the dealer cards face down', () => {
      store.dispatch({ type: 'DEAL' });

      store.getState().dealerHand[0].faceDown.should.be.true;
    });

    it('resets status to PLAYING', () => {
      store.dispatch({ type: 'DEAL' });

      store.getState().status.should.eql(statuses.PLAYING);
    });
  });

  describe('HIT', () => {
    beforeEach(() => {
      const initialState = {
        drawPile: [ace, king, queen, jack],
        dealerHand: [],
        playerHand: []
      };
      store = createStore(reducer, initialState);
    });

    it('hits the dealer', () => {
      store.dispatch({ type: 'HIT', who: 'dealer' });

      store.getState().drawPile.should.eql([king, queen, jack]);
      store.getState().dealerHand.should.eql([ace]);
      store.getState().playerHand.should.be.empty;
    });
  
    it('hits the player', () => {
      store.dispatch({ type: 'HIT', who: 'player' });

      store.getState().drawPile.should.eql([king, queen, jack]);
      store.getState().playerHand.should.eql([ace]);
      store.getState().dealerHand.should.be.empty;
    });
  });

  describe('TALLY', () => {
    it('totals up the scores for both players', () => {
      const initialState = {
        dealerHand: [king, jack, nine, seven, five, three],
        playerHand: [queen, ten, eight, six, four, two],
        dealerScore: 0,
        playerScore: 0
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'TALLY' });

      store.getState().dealerScore.should.eql(44);
      store.getState().playerScore.should.eql(40);
    });

    it('prefers an ace to be 11 if possible', () => {
      const initialState = {
        drawPile: [two, three, four, five, six, seven],
        dealerHand: [ace],
        playerHand: [],
        dealerScore: 0,
        playerScore: 0
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(11);

      // deal a two
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(13);

      // deal a three
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(16);

      // deal a four
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(20);

      // deal a five - should trigger ace to become a 1
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(15);

      // deal a six
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(21);

      // deal a seven
      store.dispatch({ type: 'HIT', who: 'dealer' });
      store.dispatch({ type: 'TALLY' });
      store.getState().dealerScore.should.eql(28);
    });
  });

  describe('OUTCOME', () => {
    let sharedState;

    beforeEach(() => {
      sharedState = {
        dealerHand: [ace, king, { ...queen, faceDown: true }],
        dealerScore: 0,
        playerScore: 0,
        status: statuses.PLAYING
      };
    });

    it('turns all dealer cards face up', () => {
      const initialState = {
        ...sharedState
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().dealerHand.every(c => !c.faceDown).should.be.true;
    });
    
    it('wins if player hits 21', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 0,
        playerScore: 21,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.WIN);
    });

    it('loses if player busts', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 0,
        playerScore: 22,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.LOSE);
    });

    it('wins if dealer busted and player did not', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 22,
        playerScore: 10,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.WIN);
    });

    it('wins if no one busted and player has higher score', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 17,
        playerScore: 19,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.WIN);
    });

    it('loses if no one busted and player has lower score', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 19,
        playerScore: 17,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.LOSE);
    });

    it('wins if no one busted and player ties dealer score', () => {
      const initialState = {
        ...sharedState,
        dealerScore: 19,
        playerScore: 19,
        status: statuses.PLAYING
      };
      store = createStore(reducer, initialState);

      store.dispatch({ type: 'OUTCOME' });

      store.getState().status.should.equal(statuses.WIN);
    });
  });
});