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

      const response = await axios.post("http://localhost:3002/user/signup", {
        username: username,
        email: email,
        password: password,
      });

      //   console.log("response >>>", response.data);

      Cookies.set("cookie", response.data.token, { expires: 5 });

      setTokenCookie(
        Cookies.set("cookie", response.data.token, { expires: 5 })
      );
      navigate("/");

      //   console.log("token >>>", response.data.token);
      //   console.log("message >>>", response.data.name);

      //   console.log("response >>>", response.data);
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

        <Link to="/login">
          <p className="signup-end">Tu as Déja un compte? Connecte-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
