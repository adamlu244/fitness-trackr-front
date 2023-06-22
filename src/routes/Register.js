import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/API";
import { Button, Form } from "react-bootstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate])

  async function submitRegistration(event) {
    try {
      event.preventDefault();

      if (!username) {
        setErrorMessage("Username is required");
      } else if (password.length < 8) {
        setErrorMessage("Password is too short, must be a minimum of 8 characters");
      } else if (password !== confirmPassword) {
        setErrorMessage("Passwords must match");
      } else {
        setErrorMessage("");
        const user = {
          username,
          password
        }
        const response = await registerUser(user);
        if (response.error) {
          setErrorMessage(response.error.message);
        } else {
          localStorage.setItem("token", response.token);
          setToken(response.token);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-4" style={{ height: "100vh" }}>

      <h1>Register</h1>

      <Form onSubmit={submitRegistration} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "120px" }}>

        <Form.Group>

          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Username</Form.Label>
          <Form.Control
            placeholder="Enter a username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control
            placeholder="Enter a password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Confirm Password</Form.Label>
          <Form.Control
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Register</Button>

      </Form>

    </div>
  )
};

export default Register;