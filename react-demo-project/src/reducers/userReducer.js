import { toast } from "react-toastify";

const initialial = {
  data:[]
}


const userReducer = (state = initialial, action) => {
  // console.log("useraction", action);
  switch (action.type) {
    case "GET_USER":
      // console.log("get", action);
      return {
        ...state,
        data: action.payload,
      };
      case "GET_USER_BY_ID":
      // console.log("get", action);
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_USER":
      toast.success("User has been added", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      // console.log("ac", action.payload);
      return {...state,
        data : action.payload
        };
    case "UPDATE_USER":
      toast.success("User has been updated", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return state.map((user) =>
        user._id === action.token.user.data._id ? action.token.user.data : user
      );
    case "DELETE_USER":
      toast.success("User has been deleted", {
        position: toast.POSITION.CENTER_RIGHT,
      });
      return state.filter((user) => user._id !== action.id);
    case "GET_IMAGE":
      console.log("jhghj", action.image);
      toast("Image updated successfully...", {
        position: toast.POSITION.CENTER_RIGHT,
      });

      return [action.response.data.image, ...state];
    default:
      return state;
  }
};
export default userReducer;
