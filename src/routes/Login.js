import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { loginUser } from "../utils/API";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();

  async function submitLogin(event) {
    try {
      event.preventDefault();

      if (!loginUsername && !loginPassword) {
        setErrorMessage("Invalid username or password, try again or register");
      } else {
        setErrorMessage("");

        const user = {
          username: loginUsername,
          password: loginPassword
        }

        const response = await loginUser(user);

        if (response.error) {
          setErrorMessage(response.error.message);
        } else {
          setToken(response.token);
          localStorage.setItem("token", response.token);
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login mt-4" style={{ height: "100vh" }}>

      <h1>Login</h1>

      <Form onSubmit={submitLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "120px" }}>

        <Form.Group>

          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            type="text"
            value={loginUsername}
            onChange={(event) => setLoginUsername(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control
            placeholder="Enter password"
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Login</Button>

      </Form>

    </div>
  )
};

export default Login;