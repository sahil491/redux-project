// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import persistState from "redux-localstorage";
// import rootReducer from "reducers/rootReducer";
// import rootSagas from "sagas/rootSaga";

// // Create sagas middleware
// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers =
//   (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       trace: true,
//       traceLimit: 100,
//     })) ||
//   compose;

// export default function configureStore() {
//   const store = createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(sagaMiddleware), persistState("auth"))
//   );
//   // Running sagas
//   sagaMiddleware.run(rootSagas);
//   return store;
// }

// import { createStore, applyMiddleware} from "redux";
// import rootReducer from "reducers/rootReducer";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// import {persistStore, persistReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// const persistConfig = {
//   key : "main-root",
//   storage
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
// const persistor = persistStore(store)
// export default store;
// export {persistor}
