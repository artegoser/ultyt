import "./App.css";

import { NextUIProvider } from "@nextui-org/react";
import { PipedAPI } from "piped-api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trending from "./pages/trending";
import { NavbarComponent } from "./components/navbar";

declare global {
  interface Window {
    piped_api: PipedAPI;
  }
}
function App() {
  window.piped_api = new PipedAPI(); //"https://ytapi.dc09.ru");

  return (
    <NextUIProvider>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Navigate to="/trending" />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
