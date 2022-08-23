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
      if (!email) {
        alert("Please enter your Email");
      }

      if (!password) {
        alert("Please enter your Password");
      }

      setIsLoading(true);
      const response = await axios.post("http://localhost:3002/user/login", {
        email: email,
        password: password,
      });
      console.log("loginresponse >>>", response.data);

      Cookies.set("cookie", response.data.token, {
        expires: 5,
      });

      setTokenCookie(
        Cookies.set("cookie", response.data.token, {
          expires: 5,
        })
      );

      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div>
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

        <div>
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
        {isLoading ? <p>Chargement</p> : <button>Login</button>}

        <Link to="/signup">
          <p className="login-form-p">Pas encore de compte ? Inscris-toi !</p>
        </Link>
        {!tokenCookie && (
          <p>Merci de vous connecter pour voir les offres ou en publier</p>
        )}
      </form>
    </div>
  );
};

export default Login;
