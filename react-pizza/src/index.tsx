
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Components/Redux/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElem = document.getElementById("root");
if (rootElem){
  const root = ReactDOM.createRoot(rootElem);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
}