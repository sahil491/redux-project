import { addUser, getUser } from "actions/Auth/userActions";
import { Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";

const AddUser = () => {
  const [validated, setValidated] = useState(false);
  const auth = useSelector((state) => state.auth);

  console.log(auth);
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [role, setRole] = useState("")
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e,data) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      navigate("/userview");
    }
    setValidated(true);
    e.preventDefault();
    // const data = {name,email,role}
    // console.log(data)
    // console.log(user);
    dispatch(addUser(user));

    setUser({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    console.log("data",data)
    // navigate("/userview");
    const qrString = `?limit=5`
    dispatch(getUser(qrString));
    // if (auth.token) return <Navigate replace to="/userview" />;
  };

  const oncancel = () => {
    navigate("/userview");
  };
  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <h1 className="text-center text-dark py-3 display-2">Add User</h1>
        <div className="row">
          <div className="col-md-6 p-5 mx-auto shadow">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="validationCustomUsername">
                {/* <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label> */}
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ marginTop: "20px" }}
                    type="text"
                    placeholder="Username"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    name is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationCustomemail">
                {/* <Form.Label style={{ marginTop: "20px" }}>Email</Form.Label> */}
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ marginTop: "20px" }}
                    type="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    email is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationCustomPssword">
                {/* <Form.Label style={{ marginTop: "20px" }}>Password</Form.Label> */}
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ marginTop: "20px" }}
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    password is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomrole">
                {/* <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label> */}
                <InputGroup hasValidation>
                  <Form.Control
                    style={{ marginTop: "20px" }}
                    type="text"
                    placeholder="Role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    user is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <div style={{ marginTop: "20px" }} className="form-group">
                <input
                  className="btn btn-block btn-dark"
                  type="submit"
                  value="Add User"
                />
              </div>
              <div className="form-group">
                <input
                  onClick={oncancel}
                  className="btn btn-block btn-primary"
                  type="submit"
                  value="Cancel"
                />
              </div>
              {/* <Button style={{ marginTop: "15px" }} type="submit">
                Submit
              </Button>
              <Button style={{ marginTop: "15px" }} type="submit">
                cancel
              </Button> */}
            </Form>

            {/* 

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                 
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
               
                <input
                  className="form-control"
                  type="text"
                  placeholder="Role"
                  
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input
                  className="btn btn-block btn-dark"
                  type="submit"
                  value="Add User"
                />
              </div>
              <div className="form-group">
                <input
                  onClick={oncancel}
                  className="btn btn-block btn-primary"
                  type="submit"
                  value="Cancel"
                />
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
