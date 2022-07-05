import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Reset1 } from "actions/Auth/authActions";
const Reset = () => {
  const [password, setPassword] = useState("");
  const location = useLocation();
  //   const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("location", location);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      password: password,
    };

    // setPassword(e.target.value);
    console.log(data);
    dispatch(Reset1(password, location.search));
    setPassword("");
    if (location.search) {
      navigate("/");
    }
    console.log("data", data);
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
              {/* {searchParams.get("id")} */}
              <h3>Reset Password</h3>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />

              <button className="btn btn-success">Submit</button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reset;
