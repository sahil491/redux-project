import { getUser, updateUser } from "actions/Auth/userActions";

import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getUser } from "actions/Auth/userActions";
// import { useDispatch, useSelector } from "react-redux";
const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const user = useSelector((state) => state.user.data);
  console.log(user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const currentUser1 = user.results.find((usr) => usr.id === id);
    if (currentUser1) {
      setName(currentUser1.name);
      setEmail(currentUser1.email);
      setPassword(currentUser1.password);
      setCurrentUser(currentUser1);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    await dispatch(updateUser(id, currentUser, data));
    navigate("/userview");
    // window.location.reload(false);
    // await dispatch(getUser());
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex flex-column">
          <button
            className="btn btn-dark ml-auto my-5"
            onClick={() => navigate("/userview")}
          >
            {/* {JSON.stringify(currentUser)} */}
            Go back
          </button>
          <div className="col-md-6 mx-auto shadow p-5">
            {/* {currentContact ? ( */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={"Name"}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={"Email"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={"password"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
