import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import cards from 'cards';
import {
  Card,
  Hand,
  BlackjackGame
} from './components';
import { statuses } from '../reducers/game';

describe('Components', () => {
  describe('Card', () => {
    it('shows a cards value', () => {
      const wrapper = shallow(<Card face="Q♥" />);

      wrapper.should.have.text('Q♥ ');
    });

    it('conceals the value if the card is face down', () => {
      const wrapper = shallow(<Card face="Q♥" faceDown={ true } />);

      wrapper.should.have.text('? ');
    });
  });

  describe('Hand', () => {
    it('shows a label', () => {
      const wrapper = shallow(<Hand label="Dealer: " cards={ [] }/>);

      wrapper.should.contain(<label>Dealer: </label>);
    });

    it('shows all the cards in a hand', () => {
      const hand = [
        new cards.Card('heart', 'K'),
        new cards.Card('heart', 'Q'),
        new cards.Card('heart', 'J')
      ];
      const wrapper = shallow(<Hand cards={ hand }/>);

      wrapper.should.have.exactly(3).descendants(Card);
    });
  });

  describe('Game', () => {
    it('has buttons for each user action', () => {
      const stub1 = sinon.stub();
      const stub2 = sinon.stub();
      const stub3 = sinon.stub();
      const wrapper = shallow(
          <BlackjackGame
              deal={ stub1 }
              hit={ stub2 }
              stand={ stub3 }
          />
      );

      wrapper.find('button').at(0).simulate('click');
      wrapper.find('button').at(1).simulate('click');
      wrapper.find('button').at(2).simulate('click');

      stub1.should.have.been.calledOnce;
      stub2.should.have.been.calledOnce;
      stub3.should.have.been.calledOnce;
    });

    it('shows the dealer and player hands', () => {
      const dealerHand = [];
      const playerHand = [];
      const wrapper = shallow(<BlackjackGame
          dealerHand={ dealerHand }
          playerHand={ playerHand }
      />);
      const hands = wrapper.find(Hand);

      hands.at(0).should.have.prop('cards', dealerHand);
      hands.at(1).should.have.prop('cards', playerHand);
    });

    it('shows players score', () => {
      const wrapper = shallow(<BlackjackGame
          playerScore={ 21 }
      />);

      wrapper.should.contain.text('Your Score: 21');
    });

    it('shows dealers score as ? if game is being played', () => {
      const wrapper = shallow(<BlackjackGame
          status={ statuses.PLAYING }
          dealerScore={ 21 }
      />);

      wrapper.should.contain.text('Dealer Score: ?');
    });

    it('reveals dealers score if game is won', () => {
      const wrapper = shallow(<BlackjackGame
          status={ statuses.WIN }
          dealerScore={ 21 }
      />);

      wrapper.should.contain.text('Dealer Score: 21');
    });

    it('reveals dealers score if game is lost', () => {
      const wrapper = shallow(<BlackjackGame
          status={ statuses.LOSE }
          dealerScore={ 21 }
      />);

      wrapper.should.contain.text('Dealer Score: 21');
    });
  });
});

