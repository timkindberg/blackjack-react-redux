import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { statuses } from '../reducers/game';

export const Card = ({ color, face, faceDown }) =>
    faceDown
      ? <span>? </span>
      : <span style={ { color } }>{ face } </span>;

export const Hand = ({ label, cards }) =>
  <div>
    <label>{ label }</label>
    { cards.map((card, i) =>
      <Card
          face={ card.face }
          faceDown={ card.faceDown }
          color={ card.color }
          key={ i }
      />
    )}
  </div>;

export const BlackjackGame = ({
    newGame,
    deal,
    hit,
    stand,
    drawPile,
    dealerHand,
    playerHand,
    dealerScore,
    playerScore,
    status
}) =>
  <div>
    <button onClick={ deal }>Deal</button>
    <hr />
    { drawPile && drawPile.length === 0 &&
      [<div>Deck is empty, refresh for a new game.</div>,
       <hr />] }
    <Hand label="Dealer: " cards={ dealerHand } />
    <div>Dealer Score: {
        status === statuses.PLAYING
            ? '?'
            : dealerScore }</div>
    <hr />
    <Hand label="Your Hand: " cards={ playerHand } />
    <div>Your Score: { playerScore }</div>
    <hr />
    <button onClick={ () => hit('player') }>Hit</button>
    <button onClick={ stand }>Stand</button>
    <hr />
    <div style={{ fontWeight: 'bold' }}>{ status }</div>
  </div>;

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, actions)(BlackjackGame);
