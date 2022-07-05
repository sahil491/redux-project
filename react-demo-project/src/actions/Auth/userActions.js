import api from "service/api";

// import axios from "axios";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
export const addUser = (user) => async (dispatch) => {
  // const token = localStorage.getItem("token");
  try {
    const response = await api.post(`/users`, user);

    dispatch({
      type: "ADD_USER",
      payload: response.data.results
    });
    console.log(response.user);
  } catch (error) {
    // console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const getUser = (query="") => async (dispatch) => {
  // const user1 = useSelector((state) => state.user);
  // console.log("users-data", name1)

  try {
    if (localStorage.getItem("token")) {  
      const response = await api.get(`/users${query}`);
     const res = response.data;
      dispatch({
        type: "GET_USER",
        payload: res,
      });
    }
    // users${name}
    // console.log("users", response);
  } catch (error) {
    // console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};
export const getUserById = (id) => async (dispatch) => {
  // const user1 = useSelector((state) => state.user);
  // console.log("users-data", name1)

  try {
    if (localStorage.getItem("token")) {  
      const response = await api.get(`/users/:${id}`,id);
     const res = response.data.id;
      dispatch({
        type: "GET_USER_BY_ID",
        payload: res,
      });
    }
    // users${name}
    // console.log("users", response);
  } catch (error) {
    // console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};




// export const getUser = () => {
//     return (dispatch) => {
//       api
//         .get(`/users`)
//         .then((user) => {
//           dispatch({
//             type: "GET_USER",
//             user,
//           });
//           console.log("users", user);
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//     };
//   };

export const updateUser = (id, previd, data) => async (dispatch) => {
  try {
    const { name, email, password } = data;
    previd.name = name;
    previd.email = email;
    previd.password = password;
    // console.log(previd);
    const response = await api.patch(`/users/${id}`, { ...data });

    dispatch({
      type: "UPDATE_USER",
      data,
    });
    console.log(response);
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/users/${id}`);

    dispatch({
      type: "DELETE_USER",
      id,
    });
    console.log(response);
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

export const getImage = (id, formData) => async (dispatch) => {
  try {
    const response = await api.post(`/users/upload/${id}`, formData);
    console.log("get", response.config.data);
    if (response) {
      dispatch({
        type: "GET_IMAGE",
        formData,
      });
    }
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.CENTER_RIGHT,
    });
  }
};

// export const getUser = () => {
//   return (dispatch, getState) => {
//     // const token = JSON.parse(localStorage.getItem("token"));
//     const token = getState().auth.token;
//     console.log("....", token.tokens.access.token);

//     api
//       .get(`${URL}/users`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((token) => {
//         dispatch({
//           type: "GET_USER",
//           token: token.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
// };

// export const addUser = (user) => {
//     return (dispatch, getState) => {
//       // const token = localStorage.getItem("token");
//       const token = localStorage.getItem("token");
//       console.log(".Addtok", token);

//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       axios
//         .post(`${URL}/users`, user, {
//           headers: headers,
//         })
//         .then((response) => {
//           dispatch({
//             type: "ADD_USER",
//             user,
//           });
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });

//   axios
//     .post(
//       `${URL}/users`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//       user
//     )
//     .then((data) => {
//       dispatch({
//         type: "ADD_USER",
//         user,
//       });
//     })
//     .catch((error) => {
//       console.log(error.response);
//     });

// export const addUser = (user) => {
//     return (dispatch, getState) => {
//       // const token = localStorage.getItem("token");
//       api
//         .post(`/users`, user)
//         .then((response) => {
//           dispatch({
//             type: "ADD_USER",
//             user,
//           });
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//     };
//   };

// export const updateUser = (id, previd, data) => {
//     return (dispatch) => {

//       const { name, email, password } = data;
//       previd.name = name;
//       previd.email = email;
//       previd.password = password;
//       console.log(previd);
//       api
//         .patch(`/users/${id}`, { ...data })
//         .then((user) => {
//           dispatch({
//             type: "UPDATE_USER",
//             user,
//           });
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//     };
//   };

// export const deleteUser = (id) => {
//     return (dispatch) => {

//       api
//         .delete(`/users/${id}`)
//         .then(() => {
//           dispatch({
//             type: "DELETE_USER",
//             id,
//           });
//         })
//         .catch((error) => {
//           console.log(error.response);
//         });
//     };
//   };
