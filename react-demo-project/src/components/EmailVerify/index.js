import { sendVerifyEmail } from "actions/Auth/authActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Jyoti from "components/picture/image.png";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("location", location);
  }, [location]);
  useEffect(() => {
    const token = location.search;
    if (token) {
      dispatch(sendVerifyEmail(token));
      setValidUrl(true);
      //       const token = localStorage.getItem("token");
      // if (token) {
      navigate(`/profile`);
      // }
    } else {
      setValidUrl(false);
    }
  }, []);

  return (
    <>
      <Fragment>
        {validUrl ? (
          <div className="container">
            <img src={Jyoti} className="image" />
            <h1>Email Verified Successfully</h1>
            <Link to="/profile">
              <button className="btn btn-success">Ok</button>
            </Link>
          </div>
        ) : (
          <h1>Page not found</h1>
        )}
      </Fragment>
    </>
  );
};
export default EmailVerify;
