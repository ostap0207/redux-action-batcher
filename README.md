# Redux Action Batcher

[![Build Status](https://travis-ci.org/ostap0207/redux-action-batcher.svg?branch=master)](https://travis-ci.org/ostap0207/redux-action-batcher)


Reducer, middleware and action creator that enables to batch own as well as custom middleware actions
such as `redux-react-router` `push` actions.

## Getting started

```javascript
import {createStore, applyMiddleware} from 'redux';
import {batchActions, batchingMiddleware, enableBatching} from 'redux-action-batcher';
import {routerMiddleware, push} from 'react-router-redux';

const USER_DATA_RECEIVED = 'USER_DATA_RECEIVED';

const reducer = (state, action) => {
  switch(action.type) {
    case USER_DATA_RECEIVED:
      return {...state, name: action.payload.name}
    default:
      return state;
  }
};

const store = createStore(
  enableBatching(reducer),
  applyMiddleware(
    batchingMiddleware,
    routerMiddleware(browserHistory)
  )
);


store.dispatch(batchActions(
  {type: USER_DATA_RECEIVED, name: 'John Snow'},
  push('/profile')
));

```
