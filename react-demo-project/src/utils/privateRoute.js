import React from "react";
// import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
// export function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         localStorage.getItem('token') ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/login' }} />
//         )
//       }
//     />
//   );
// }

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  // console.log("auth.token", auth.token);
  if (!auth.token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
