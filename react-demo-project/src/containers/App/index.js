import Signup from "components/Home/Signup";
import Login1 from "components/Login";
// import UserView from "components/Userview";
import Navbar from "components/Navbar";
import { loadUser, refreshToken } from "actions/Auth/authActions";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { interceptor } from "utils/interceptor";
import PrivateRoute from "utils/privateRoute";
import AddUser from "components/AddUser";
import EditUser from "components/EditUser";
import UserView1 from "components/useview1";
import Userview3 from "components/user/user";
import ForgotPassword from "components/Forgot";
import Reset from "components/Reset";
import Profile from "components/Profile";
import EmailVerify from "components/EmailVerify";
import Paginate from "components/Paginate";
import Sort from "components/Sort";
// import Data from "components/Data";

// import HomeContainer from 'containers/Home/homeContainer';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser);
    dispatch(refreshToken());
  }, [dispatch]);
  interceptor();
  return (
    <Fragment>
      <Routes>
        {/* <Route path="/hg" element={<Navbar />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login1 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<Reset />} />

        <Route
          path="/uservie"
          element={
            <PrivateRoute>
              <UserView1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PrivateRoute>
              <EmailVerify />
            </PrivateRoute>
          }
        />
        <Route
          path="/userview3"
          element={
            <PrivateRoute>
              <Userview3 />
            </PrivateRoute>
          }
        />

<Route
          path="/user"
          element={
            <PrivateRoute>
              <Sort />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/data"
          element={
            <PrivateRoute>
              <Data />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/userview"
          element={
            <PrivateRoute>
              <Paginate />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}
