import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game';
import BlackjackGame from './components/components';
import './index.css';

export const store = createStore(
    gameReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BlackjackGame />
  </Provider>,
  document.getElementById('root')
);
