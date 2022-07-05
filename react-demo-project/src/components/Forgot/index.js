import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { Forget } from "actions/Auth/authActions";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email };
    console.log(data);
    dispatch(Forget(email));
    setEmail("");
  };
  const changeSubmit = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/reset-password?token=${token}`);
    }
  };
  const changeCancel = () => {
    navigate("/");
  };
  return (
    <Container>
      <Row style={{ marginTop: "200px" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <div
            style={{ border: "0.5px solid black" }}
            className="shadow p-5 mb-5 bg-white "
          >
            <form onSubmit={handleSubmit}>
              <label>Forgot Password</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <button onClick={changeSubmit} className="btn btn-success">
                Submit
              </button>
              <button
                onClick={changeCancel}
                style={{ marginLeft: "15px" }}
                className="btn btn-success "
              >
                cancel
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
