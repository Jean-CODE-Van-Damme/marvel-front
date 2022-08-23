import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CommicsWithCharacters from "./pages/ComicsWithCharacters";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faListAlt, faHeart);

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [favoriteArrayCharacter, setFavoriteArrayCharacter] = useState([]);
  return (
    <div>
      <Router>
        <Header
          name={name}
          setName={setName}
          title={title}
          setTitle={setTitle}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                name={name}
                setName={setName}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                favoriteArray={favoriteArray}
                setFavoriteArray={setFavoriteArray}
                favoriteArrayCharacter={favoriteArrayCharacter}
                setFavoriteArrayCharacter={setFavoriteArrayCharacter}
              />
            }
          />

          <Route
            path="/comics"
            element={
              <Comics
                title={title}
                setTitle={setTitle}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                favoriteArray={favoriteArray}
                setFavoriteArray={setFavoriteArray}
              />
            }
          />

          <Route
            path="/comics/:characterId"
            element={<CommicsWithCharacters />}
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favoriteArray={favoriteArray}
                setFavoriteArray={setFavoriteArray}
                favoriteArrayCharacter={favoriteArrayCharacter}
                setFavoriteArrayCharacter={setFavoriteArrayCharacter}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
