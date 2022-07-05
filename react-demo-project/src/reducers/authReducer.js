import { toast } from "react-toastify";
// import jwtDecode from "jwt-decode"
// import { object } from "prop-types";
// import { POSITION } from/ "react-toastify/dist/utils";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  _id: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
    case "SIGN_IN":
    // case "SIGN_UP":
      // console.log("signup");
      toast("welcome...", {
        position: toast.POSITION.CENTER_RIGHT,
      });

      // console.log("action", action);

      return {
        ...initialState,
        token: action.token,
        name: action.token.user.name,
        email: action.token.user.email,
        _id: action.token.user.id,
      };
    case "SIGN_UP":
      return {
        ...initialState,
        token: action.token,
        name: action.token.user.name,
        email: action.token.user.email,
        _id: action.token.user.id,
      };
    case "SIGN_OUT":
      localStorage.removeItem("token");
      localStorage.removeItem("token2");
      localStorage.removeItem("name");
      toast("User Logged Out...", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return {
        token: null,
        name: null,
        email: null,
        _id: null,
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        accessToken: payload,
      };
    case "FORGOT_PASSWORD":
      toast("Email sent...", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return {
        ...initialState,
        response: payload,
      };
    case "RESET_PASSWORD":
      toast("Password has been reset...", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return {
        ...initialState,
        payload,
      };
    case "SEND_VERIFICATION_EMAIL":
      toast("Email sent...", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return {
        ...initialState,
        response: payload,
      };
    case "VERIFY_EMAIL":
      toast("Email verified successfully...", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return {
        ...initialState,
        payload,
      };

    default:
      return state;
  }
};
export default authReducer;
