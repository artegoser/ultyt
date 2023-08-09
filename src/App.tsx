import "./App.css";

import { NextUIProvider } from "@nextui-org/react";
import { PipedAPI } from "piped-api";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import TrendingPage from "./pages/trending";
import { NavbarComponent } from "./components/navbar";
import ChannelPage from "./pages/channel";

declare global {
  interface Window {
    piped_api: PipedAPI;
  }
}
function App() {
  window.piped_api = new PipedAPI();

  return (
    <NextUIProvider>
      <HashRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Navigate to="/trending" />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
        </Routes>
      </HashRouter>
    </NextUIProvider>
  );
}

export default App;
