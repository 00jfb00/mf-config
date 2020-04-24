import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const asyncReducers = {};

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: []
};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    blank: state => state ? state : [],
    ...asyncReducers
  });
}

const persistedReducer = persistReducer(persistConfig, createReducer());
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

store.injectAsyncReducer = (name, asyncReducer) => {
  asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(asyncReducers));
};

export default {
  store,
  persist: persistStore(store)
};
