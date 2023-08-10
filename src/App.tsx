import "./App.css";
import { PipedAPI } from "piped-api";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import TrendingPage from "./pages/trending";
import { NavbarComponent } from "./components/navbar";
import ChannelPage from "./pages/channel";
import { useState } from "react";
import SearchPage from "./pages/search";

declare global {
  interface Window {
    piped_api: PipedAPI;
  }
}
function App() {
  window.piped_api = new PipedAPI();
  const [key, setKey] = useState(Math.random());

  window.addEventListener("reRenderPage", () => {
    setKey(Math.random());
  });

  return (
    <HashRouter key={key}>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Navigate to="/trending" />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/trending" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
