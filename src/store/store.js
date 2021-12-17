import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./rootReducer";
import middleware from "./middleware";

const persistConfig = {
  key: "reducer",
  storage: storage,
  //   whitelist: [], // only this list will be persisted
  // blacklist: ["dashboard", "report"], // this list will not be persisted
};

const persistedReducer = persistReducer(persistConfig, reducer);

const configStore = (initialState = {}) => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return {
    persistor: persistStore(store),
    store,
  };
};
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

const { store, persistor } = configStore();
global.store = store;

export { store, persistor };
// export { store }
