// import axios from "axios";
import api from "service/api";
import { toast } from "react-toastify";

export const signUp = (user) => async (dispatch) => {
  try {
    const response = await api.post(`/auth/register`, user).then((token) => {
      localStorage.setItem("token", token.data.tokens.access.token);

      localStorage.setItem("token2", token.data.tokens.refresh.token);
      localStorage.setItem("name", token.data.user.name);
      // console.log("token", token);
      dispatch({
        type: "SIGN_UP",
        token: token.data,
      });
      console.log(response);
    });
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await api
      .post(`/auth/login`, { email, password })
      .then((token) => {
        localStorage.setItem("token", token.data.tokens.access.token);
        localStorage.setItem("token2", token.data.tokens.refresh.token);
        localStorage.setItem("name", token.data.user.name);
        console.log("token", token);
        dispatch({
          type: "SIGN_IN",
          token: token.data,
        });
        console.log(response);
      });
  } catch (error) {
    console.log(error.response);

    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("token2");
  localStorage.removeItem("name");
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const refreshToken = (accessToken) => async (dispatch) => {
  const storedToken = localStorage.getItem("token2");
  // console.log(storedToken);
  try {
    // const response = await api
    //   .post(`/auth/refresh-tokens`)
    const token = await api.post(`/auth/refresh-tokens`, {
      refreshToken: storedToken,
    });
    // console.log("token2", token);
    localStorage.setItem("token", token.data.access.token);
    localStorage.setItem("token2", token.data.refresh.token);
    // console.log("refresh", token);
    dispatch({
      type: "REFRESH_TOKEN",
      payload: accessToken,
    });
  } catch (error) {
    // console.log(error.response);

    toast.error(error.response?.data, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const Forget = (email) => async (dispatch) => {
  try {
    const response = await api.post(`/auth/forgot-password`, {
      email,
    });
    if (response) {
      dispatch({
        type: "FORGOT_PASSWORD",
        payload: response,
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const Reset1 = (password, token) => async (dispatch) => {
  // const resetToken = localStorage.setItem("token");
  try {
    const response = await api.post(`/auth/reset-password${token}`, {
      password,
    });
    if (response) {
      dispatch({
        type: "RESET_PASSWORD",
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const SendEmail = () => async (dispatch) => {
  try {
    const response = await api.post(`/auth/send-verification-email`);
    if (response) {
      dispatch({
        type: "SEND_VERIFICATION_EMAIL",
        payload: response,
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const sendVerifyEmail = (token) => async (dispatch) => {
  try {
    const response = await api.post(`/auth/verify-email${token}`);
    if (response) {
      dispatch({
        type: "VERIFY_EMAIL",
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

// export const signUp = (user) => {
//   return (dispatch) => {
//     api
//       .post(`/auth/register`, user)
//       .then((token) => {
//         localStorage.setItem("token", token.data.tokens.access.token);
//         console.log("token", token);
//         dispatch({
//           type: "SIGN_UP",
//           token: token.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response);
//         toast.error(error.response?.data, {
//           position: toast.POSITION.BOTTOM_CENTER.RIGHT,
//         });
//       });
//   };
// };

// export const signIn = (email, password) => {
//   return (dispatch) => {
//     api
//       .post(`/auth/login`, { email, password })
//       .then((token) => {
//         localStorage.setItem("token", token.data.tokens.access.token);

//         dispatch({
//           type: "SIGN_IN",
//           token: token.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response);

//         toast.error(error.response?.data, {
//           position: toast.POSITION.BOTTOM_RIGHT,
//         });
//       });
//   };
// };
