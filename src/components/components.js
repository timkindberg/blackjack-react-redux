import React from 'react';
import { statuses } from '../reducers/game';
import './components.css';

export const Card = ({ color, face, faceDown }) =>
    faceDown
      ? <span>? </span>
      : <span style={ { color } }>{ face } </span>;

export const Hand = ({ label, cards }) =>
  <div>
    <label>{ label }</label>
    { cards.map((card, i) =>
      <Card face={ card.face } faceDown={ card.faceDown } color={ card.color } key={ i } />
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
    <button onClick={ ____ }>Deal</button>
    <hr />
    { drawPile && drawPile.length === 0 &&
      [<div>Deck is empty, refresh for a new game.</div>, <hr />] }
    <Hand label="Dealer: " cards={ ____ } />
    <div>Dealer Score: { status === statuses.PLAYING? '?' : _____ }</div>
    <hr />
    <Hand label="Your Hand: " cards={ ____ } />
    <div>Your Score: { _____ }</div>
    <hr />
    <button onClick={ _____ }>Hit</button>
    <button onClick={ _____ }>Stand</button>
    <hr />
    <div style={{ fontWeight: 'bold' }}>{ status }</div>
  </div>;

export default BlackjackGame;
