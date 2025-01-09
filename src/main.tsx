import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "i18next";
import { UserProvider } from "./context/UserContext.tsx";
import WebApp from "@twa-dev/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
    ,
  </QueryClientProvider>,
);
