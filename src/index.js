const PREFIX = '@@REDUX-ACTION-BATCHER';
const BATCH_TYPE = `${PREFIX}.BATCH`;
const START_TYPE = `${PREFIX}.BATCH_START`;
const END_TYPE = `${PREFIX}.BATCH_END`;

let actionsToBatch = [];
let shouldBatchActions;
const enableBatching = (reduce) => function batchingReducer(state, action) {
  if (action.type === START_TYPE) {
    shouldBatchActions = true;
    return state;
  } else if (action.type === END_TYPE) {
    shouldBatchActions = false;
    const newState = actionsToBatch.reduce(batchingReducer, state);
    actionsToBatch = [];
    return newState;
  } else if (shouldBatchActions) {
    actionsToBatch.push(action);
    return state;
  }

  return reduce(state, action);
};

const batchingMiddleware = () => (next) => (action) => {
  if (action.type === BATCH_TYPE) {
    next({type: START_TYPE});
    action.payload.forEach((batchedAction) => {
      next(batchedAction);
    });
    return next({type: END_TYPE});
  }
  return next(action);
};

const batchActions = (...actions) => ({type: BATCH_TYPE, payload: actions});

export {enableBatching, batchingMiddleware, batchActions};
