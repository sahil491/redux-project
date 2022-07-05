import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "actions/Auth/authActions";

// import { toast } from "react-toastify";
function Login1() {
  const [validated, setValidated] = useState(false);

  const auth = useSelector((state) => state.auth);
  // console.log(auth);

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    dispatch(signIn(creds.email, creds.password));
    navigate("/userview");
    setCreds({ email: "", password: "" });
  };

  if (auth._id) return <Navigate to="/userview" replace />;

  const onsignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Container>
        <Row style={{ marginTop: "200px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <div
              style={{ border: "0.5px solid black" }}
              className="shadow p-5 mb-5 bg-white "
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      value={creds.email}
                      onChange={(e) =>
                        setCreds({ ...creds, email: e.target.value })
                      }
                      placeholder="email"
                      aria-describedby="inputGroupPrepend"
                      required
                    />

                    <Form.Control.Feedback type="invalid">
                      Please choose a email.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Row>
                    <Form.Text className="text-muted">
                      We will never share your email with anyone else.
                    </Form.Text>
                  </Row>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustomPssword"
                >
                  <Form.Label style={{ marginTop: "20px" }}>
                    Password
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="password"
                      value={creds.password}
                      onChange={(e) =>
                        setCreds({ ...creds, password: e.target.value })
                      }
                      placeholder="password"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a password.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Link to="/forgot/password" className="float-right text-danger">
                  Forgot Password{" "}
                </Link>
                <Row style={{ marginTop: "30px" }}>
                  <Col>
                    <Button
                      style={{ marginLeft: "15px", marginTop: "25px" }}
                      variant="primary"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      style={{ marginLeft: "15px", marginTop: "25px" }}
                      variant="primary"
                      type="submit"
                      onClick={onsignup}
                    >
                      Sign up
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login1;
