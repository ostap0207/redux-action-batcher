import assert from 'assert';
import sinon from 'sinon';
import {enableBatching, batchingMiddleware, batchActions} from '../src/index';

describe('batchingMiddleware', () => {
  let dispatch;
  let next;

  beforeEach(() => {
    next = sinon.stub();
    dispatch = batchingMiddleware()(next);
  });

  context('when receives batch actions', () => {
    const BATCH_START_ACTION = {type: '@@REDUX-ACTION-BATCHER.BATCH_START'};
    const BATCH_END_ACTION = {type: '@@REDUX-ACTION-BATCHER.BATCH_END'};

    beforeEach(() => {
      dispatch(batchActions(
        {type: 'action1'},
        {type: 'action2'}
      ));
    });

    it('sends BATCH_START action before batch actions', () => {
      assert.deepEqual(next.firstCall.args[0], BATCH_START_ACTION);
    });

    it('sends batch actions between BATCH_START and BATCH_END actions', () => {
      assert.deepEqual(next.secondCall.args[0], {type: 'action1'});
      assert.deepEqual(next.thirdCall.args[0], {type: 'action2'});
    });

    it('sends BATCH_END action after batch actions', () => {
      assert.deepEqual(next.lastCall.args[0], BATCH_END_ACTION);
    });
  });

  context('when receives other actions', () => {
    const otherAction = {type: 'other-action'};

    it('sends other actions', () => {
        dispatch(otherAction);
        assert(next.calledOnce);
        assert(next.calledWith(otherAction));
    });
  });
});
