import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Provider from "./providers/index.tsx";
import GlobalStyles from "./styles/GlobalStyles.tsx";

// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
