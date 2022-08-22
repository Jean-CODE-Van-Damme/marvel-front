import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CommicsWithCharacters from "./pages/ComicsWithCharacters";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <Router>
        <Header title={title} setTitle={setTitle} />
        <Routes>
          <Route
            path="/"
            element={<Characters title={title} setTitle={setTitle} />}
          />

          <Route
            path="/comics"
            element={<Comics title={title} setTitle={setTitle} />}
          />

          <Route
            path="/comics/:characterId"
            element={<CommicsWithCharacters />}
          />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
