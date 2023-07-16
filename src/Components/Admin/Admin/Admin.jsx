import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Admin.css";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import swal from "sweetalert";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === process.env.REACT_APP_ADMIN_EMAIL &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      // User successfully logged in
      swal("Success", "User logged in successfully!", "success");
      setIsLoggedIn(true);
    } else {
      // Invalid credentials
      swal("Error", "Invalid email or password", "error");
    }
  };

  return (
    <div className="login">
      {!isLoggedIn ? (
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="login-box">
              <h2 className="login-title">Login</h2>
              <h1 className="text-center text-white mb-3">Login</h1>

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="input-field mb-3"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  className="mt-3 ps-5 pe-5 submit-button text-center"
                  id="submit-button"
                  type="submit"
                  block={`${true}`}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <AdminDashboard></AdminDashboard>
      )}
    </div>
  );
};

export default Login;
