import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ tokenCookie, setTokenCookie }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Gestion des input vide dans le Front
      if (!username) {
        alert("Please enter a Username");
      }

      if (!email) {
        alert("please enter an email");
      }

      if (!password) {
        alert("Please enter a password");
      }

      setIsLoading(true);

      // requete vers le back vers la route signup avec en param username, email, password
      const response = await axios.post("http://localhost:3002/user/signup", {
        username: username,
        email: email,
        password: password,
      });

      // Creation du Cookie
      Cookies.set("cookie", response.data.token, { expires: 5 });

      // Mise a jour du state avec la valeur du token recu
      setTokenCookie(response.data.token);

      // si ok navigation vers la page Characters.js
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup-page">
      <h2>Signup</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="signup-div">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Hulk"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div className="signup-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Hulk@gmail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="signup-div">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Marvel12345"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {isLoading ? <p>Chargement</p> : <button>Signup</button>}

        {/* Lien vers la page Login.js pour le client qui a deja un compte  */}
        <Link to="/login">
          <p className="signup-end">Tu as Déja un compte? Connecte-toi !</p>
        </Link>

        {/* Message au client non connecté */}
        {!tokenCookie && (
          <p>
            Please connect your account to access Comics and Favorites pages
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
