import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
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
  const [tokenCookie, setTokenCookie] = useState(Cookies.get("cookie") || null);
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
          tokenCookie={tokenCookie}
          setTokenCookie={setTokenCookie}
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
                tokenCookie={tokenCookie}
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
                tokenCookie={tokenCookie}
                setTokenCookie={setTokenCookie}
              />
            }
          />

          <Route
            path="/comics/:characterId"
            element={
              <CommicsWithCharacters
                tokenCookie={tokenCookie}
                setTokenCookie={setTokenCookie}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                tokenCookie={tokenCookie}
                setTokenCookie={setTokenCookie}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                tokenCookie={tokenCookie}
                setTokenCookie={setTokenCookie}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                tokenCookie={tokenCookie}
                setTokenCookie={setTokenCookie}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
