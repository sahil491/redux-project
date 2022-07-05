import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import App from "containers/App";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers/rootReducer";
import thunk from "redux-thunk";
// import configureStore from './store';
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// const store = configureStore();
toast.configure();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// initialize firebase for push notification.
// initializeFirebase();
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BEsBewuGG1j0DvOr65lpGnMXHGWwqwvrLCn5VAIZ0M6v9EAGX0EfNgQ7AGDrpXfFZIt8IhPUJteObE3Gnb9XL9s");

// if(!localStorage.getItem("notification-token")){
// 	askForPermissionToReceiveNotifications();
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//   .then(function(registration) {
//     console.log('Registration successful, scope is:', registration.scope);
//   }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err);
//   });
// }
