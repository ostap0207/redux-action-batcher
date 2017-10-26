(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ReduxActionBatcher = {})));
}(this, (function (exports) { 'use strict';

var PREFIX = '@@REDUX-ACTION-BATCHER';
var BATCH_TYPE = PREFIX + '.BATCH';
var START_TYPE = PREFIX + '.BATCH_START';
var END_TYPE = PREFIX + '.BATCH_END';

var actionsToBatch = [];
var shouldBatchActions = void 0;
var enableBatching = function enableBatching(reduce) {
  return function batchingReducer(state, action) {
    if (action.type === START_TYPE) {
      shouldBatchActions = true;
      return state;
    } else if (action.type === END_TYPE) {
      shouldBatchActions = false;
      var newState = actionsToBatch.reduce(batchingReducer, state);
      actionsToBatch = [];
      return newState;
    } else if (shouldBatchActions) {
      actionsToBatch.push(action);
      return state;
    }

    return reduce(state, action);
  };
};

var batchingMiddleware = function batchingMiddleware() {
  return function (next) {
    return function (action) {
      if (action.type === BATCH_TYPE) {
        next({ type: START_TYPE });
        action.payload.forEach(function (batchedAction) {
          next(batchedAction);
        });
        return next({ type: END_TYPE });
      }
      return next(action);
    };
  };
};

var batchActions = function batchActions() {
  for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
    actions[_key] = arguments[_key];
  }

  return { type: BATCH_TYPE, payload: actions };
};

exports.enableBatching = enableBatching;
exports.batchingMiddleware = batchingMiddleware;
exports.batchActions = batchActions;

Object.defineProperty(exports, '__esModule', { value: true });

})));
