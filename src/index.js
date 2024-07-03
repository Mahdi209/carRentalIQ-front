import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { ColorModeScript } from "@chakra-ui/react";

import store from "./store/store";
import { Flowbite } from "flowbite-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Flowbite>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </I18nextProvider>
      </Flowbite>
    </ChakraProvider>
  </React.StrictMode>
);
