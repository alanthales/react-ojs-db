import ojsDb from "ojs-db";

const DataProxies = ojsDb.DbProxies;

const combineReducers = (reducers) => {
  const nextState = {},
    reducerFunctions = {},
    reducersKeys = Object.keys(reducers);

  reducersKeys.forEach(reducerKey => {
    if (typeof reducers[reducerKey] === "function") {
      reducerFunctions[reducerKey] = reducers[reducerKey];
    }
  });

  const reducerFunctionsKeys = Object.keys(reducerFunctions);

  return (state = {}, action) => {
    reducerFunctionsKeys.forEach(reducerKey => {
      const reducer = reducerFunctions[reducerKey];
      nextState[reducerKey] = reducer(state[reducerKey], action);
    });

    return nextState;
  };
};

const createStore = (rootReducer, proxy, opts) => {
  const db = new ojsDb.DbFactory(proxy, opts);

  let state = {},
    listeners = [];

  const getState = () => state;

  async const dispatch = (action) => {
    let nextState = rootReducer(state, action);

    if (typeof nextState === "function") {
      nextState = await reducer(dispatch, getState, db);
    }

    state = nextState;
    listeners.forEach(listener => listener(state));
  };

  const subscribe = listener => {
    let index = listeners.push(listener);
    return () => listeners.splice(index, 1);
  };

  return {
    getState,
    dispatch,
    subscribe
  };
};

export { combineReducers, createStore, DataProxies };