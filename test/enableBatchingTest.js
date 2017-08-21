import assert from 'assert';
import sinon from 'sinon';
import {enableBatching} from '../src/index';

describe('enableBatching', () => {
  const BATCH_START = {type: '@@REDUX-ACTION-BATCHER.BATCH_START'};
  const BATCH_END = {type: '@@REDUX-ACTION-BATCHER.BATCH_END'};
  const action = {type: 'action'};
  const state = 'state';
  let reducer;
  let batchingReducer;

  beforeEach(() => {
    reducer = sinon.stub();
    batchingReducer = enableBatching(reducer);
  });

  context('when BATCH_START action comes', () => {
    beforeEach(() => {
      batchingReducer(state, BATCH_START);
    });

    context('when any action comes', () => {
      beforeEach(() => {
        batchingReducer(state, action);
      });

      it('does not pass it to internal reducer', () => {
        assert(reducer.notCalled);
      });

      context('when BATCH_END action comes', () => {
        beforeEach(() => {
          batchingReducer(state, BATCH_END);
        });

        it('passes previously received actions ', () => {
          assert(reducer.calledWith(state, action));
        });
      });
    });
  });

  context('when any action comes', () => {
    beforeEach(() => {
      batchingReducer(state, action);
    });

    it('passes it to internal reducer', () => {
      assert(reducer.calledWith(state, action));
    });
  });
});
