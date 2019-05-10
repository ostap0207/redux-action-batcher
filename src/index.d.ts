declare module 'redux-action-batcher' {
    import { Action, Dispatch, Middleware, Reducer } from 'redux';
    export const enableBatching: <S>(reducer : Reducer<S>) => (state: S, action: any) => S;
    export const batchingMiddleware: Middleware;
    export function batchActions 
    <A extends Action>(actions: A): Action;
    export function batchActions 
    <A,B extends Action>(action1: A, action2: B): Action;
    export function batchActions 
    <A, B, C extends Action>(action1: A, action2: B, action3: C): Action;
    export function batchActions 
    <A, B, C, D extends Action>(action1: A, action2: B, action3: C, action4: D): Action;
    export function batchActions 
    <A, B, C, D, E extends Action>(action1: A, action2: B, action3: C, action4: D, action5: E): Action;
    export function batchActions 
    <A, B, C, D, E, F extends Action>(action1: A, action2: B, action3: C, action4: D, action5: E, action6: F): Action;
    export function batchActions
    <A, B, C, D, E, F, G extends Action>(action1: A, action2: B, action3: C, action4: D, action5: E, action6: F, action7: G): Action;
    export function batchActions
    <A, B, C, D, E, F, G, H extends Action>(action1: A, action2: B, action3: C, action4: D, action5: E, action6: F, action7: G, action8: H): Action;
    }
