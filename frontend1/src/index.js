import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

//localhost: 0f9bcc25-9ab2-42b5-90d2-122588e83383
//beta: a6ff9b4c-9586-4920-a38f-6a77bf39a375
root.render(
  <>
  
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </>
);
