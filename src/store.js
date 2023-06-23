import { createStore } from "redux";

import { combinedRed } from "./reducers/combinedReducer";

const store = createStore(
  combinedRed,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;