import { signUp } from "actions/Auth/authActions";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

const Signup = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  // console.log("state", auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    dispatch(signUp(user));
    console.log(user);
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };
  if (auth._id) return <Navigate replace to="/" />;

  return (
    <Container>
      <Row style={{ marginTop: "200px" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <div
            style={{ border: "0.5px solid black" }}
            className="shadow p-5 mb-5 bg-white "
          >
            <h2 style={{ textAlign: "center" }}>Register</h2>
            {/* {auth} */}

            {/* {console.log(errorMessage)} */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationCustomemail">
                <Form.Label style={{ marginTop: "20px" }}>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationCustomPssword">
                <Form.Label style={{ marginTop: "20px" }}>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Row style={{ marginTop: "30px" }}>
                <Col>
                  <Button
                    style={{ marginLeft: "15px", marginTop: "25px" }}
                    variant="primary"
                    type="submit"
                    onClick={() => <Navigate replace to="/" />}
                  >
                    Sign up
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{ marginLeft: "15px", marginTop: "25px" }}
                    variant="primary"
                    type="submit"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
              {/* <Button style={{ marginTop: "15px" }} type="submit">
                Submit
              </Button>
              <Button style={{ marginTop: "15px" }} type="submit">
                cancel
              </Button> */}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
