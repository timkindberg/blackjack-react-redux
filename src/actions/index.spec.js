import * as actions from './index';
import sinon from 'sinon';
import flatten from 'flatten';

let getStateStub = () => ({ playerScore: 0 });

describe('Actions', () => {
  let capturedArgs, dispatch;

  beforeEach(() => {
    capturedArgs = [];
    dispatch = (thunk) => {
      if (typeof thunk === 'function') {
        thunk(dispatch, () => ({ playerScore: 0 }));
      } else {
        capturedArgs.push(thunk);
      }
    };
  });

  describe('deal()', () => {
    it('tallies the score after dealing a round', () => {
      actions.deal()(dispatch, getStateStub);

      flatten(capturedArgs).should.eql([
        { type: 'DEAL' },
        { type: 'TALLY' }
      ]);
    });

    it('calculates the final score if player gets blackjack', () => {
      const getBlackjackState = () => ({ playerScore: 21 });

      actions.deal()(dispatch, getBlackjackState);

      flatten(capturedArgs).should.eql([
        { type: 'DEAL' },
        { type: 'TALLY' },
        { type: 'OUTCOME' }
      ]);
    });
  });

  describe('hit()', () => {
    it('hits a specific player then tallies the score', () => {
      actions.hit('player')(dispatch, getStateStub);

      flatten(capturedArgs).should.eql([
        { type: 'HIT', who: 'player' },
        { type: 'TALLY' }
      ]);
    });

    it('calculates the final score if player gets blackjack', () => {
      const getBlackjackState = () => ({ playerScore: 21 });

      actions.hit('player')(dispatch, getBlackjackState);

      flatten(capturedArgs).should.eql([
        { type: 'HIT', who: 'player' },
        { type: 'TALLY' },
        { type: 'OUTCOME' }
      ]);
    });

    it('calculates the final score if player busts', () => {
      const getBustedState = () => ({ playerScore: 22 });

      actions.hit('player')(dispatch, getBustedState);

      flatten(capturedArgs).should.eql([
        { type: 'HIT', who: 'player' },
        { type: 'TALLY' },
        { type: 'OUTCOME' }
      ]);
    });
  });

  describe('stand()', () => {
    it('plays out the dealers turn, but stops if 17 or above', () => {
      const stateVals = [5, 10, 16, 17];
      const getState = () => ({ dealerScore: stateVals.shift() });

      actions.stand()(dispatch, getState);

      flatten(capturedArgs).should.eql([
        { type: 'HIT', who: 'dealer' },
        { type: 'TALLY' },
        { type: 'HIT', who: 'dealer' },
        { type: 'TALLY' },
        { type: 'HIT', who: 'dealer' },
        { type: 'TALLY' },
        { type: 'OUTCOME' }
      ]);
    });
  });

});