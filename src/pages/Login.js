import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ tokenCookie, setTokenCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Gestion de l absence de donnees en input dans le Front
      if (!email) {
        alert("Please enter your Email");
      }

      if (!password) {
        alert("Please enter your Password");
      }

      setIsLoading(true);
      // requete vers le back vers la route login avec en param : email et password
      const response = await axios.post("http://localhost:3002/user/login", {
        email: email,
        password: password,
      });
      console.log("loginresponse >>>", response.data);

      // Creation du Cookie
      Cookies.set("cookie", response.data.token, {
        expires: 5,
      });

      // Mise a jour du state avec le token recu
      setTokenCookie(response.data.token);

      // si ok navigation vers la route Characters.js
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="login-div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Hulk@gmail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="login-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Marvel12345"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {isLoading ? <p>Chargement</p> : <button>Login</button>}

        {/* Lien vers la page signup si le client n a pas encore de compte  */}
        <Link to="/signup">
          <p className="login-end">Pas encore de compte ? Inscris-toi !</p>
        </Link>
        {/* Message pour le client non connecte  */}
        {!tokenCookie && (
          <p>
            Please connect your account to access Comics and Favorites pages
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
