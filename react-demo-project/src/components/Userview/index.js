import Navbar from "components/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "actions/Auth/userActions";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
const UserView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // console.log("user", user);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUser());
    // window.location.reload(false);
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex flex-column">
          <Link to="/add" className="btn btn-outline-dark my-5 ml-auto w-auto">
            Add User
          </Link>
          <div className="col-md-25 mx-2 my-4">
            <table className="table table-hover">
              <thead className="table-header bg-dark text-white">
                <tr>
                  <th scope="col">Sr. no.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td>
                      <Link
                        type="button"
                        to={`/edit/${data.id}`}
                        className="btn btn-sm btn-primary mt-10 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(data.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
