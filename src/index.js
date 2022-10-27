import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from './store';
import { Provider } from 'react-redux';
import "./styles.css";

import App from "./App";

// var go = function() {
//   var event = document.createEvent('Event');
//   event.initEvent('grab_documents');
//   document.dispatchEvent(event);
// }

document.addEventListener("is_wellybox_extension_exist", function(event) {
  console.log('event: ', event.detail.exist);
});



// setInterval(()=> {
//   console.log('yes!')
//   go();
// }, 1000)
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);