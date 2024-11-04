import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateUsername = () => {
    const usernameError = !username.match(/^[a-zA-Z0-9]+$/)
      ? "Username must be alphanumeric only"
      : "";
    setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
  };

  const validatePassword = () => {
    const passwordError =
      password.length <= 4 ? "Password must be at least 6 characters long" : "";
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const validate = () => {
    validateUsername();
    validatePassword();
    return !errors.username && !errors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login({ username, password }))
        .unwrap()
        .then(() => {
          navigate("/search");
        })
        .catch((err) => {
          console.error("Login failed:", err);
        });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      validateUsername(); // Validate on change
                    }}
                    onBlur={validateUsername} // Validate on blur
                  />
                  {errors.username && (
                    <small className="text-danger">{errors.username}</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(); // Validate on change
                    }}
                    onBlur={validatePassword} // Validate on blur
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
