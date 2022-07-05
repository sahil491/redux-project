import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "actions/Auth/authActions";
import { useDispatch} from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { getUserById } from "actions/Auth/userActions";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  const user = localStorage.getItem("name");
  // const { name } = auth;
  // console.log("uuu",auth);
  // useEffect(()=>{
  //   dispatch(getUserById(auth.id))
  // })
  function onLogout(e) {
    e.preventDefault();
    dispatch(signOut());
    navigate("/");
  }
  return (
    <div className="col-md-12 bg-dark py-2">
      <nav className="navbar bg-dark navbar-dark text-white px-2 py-2 flex items-center">
        {/* <h2 className="font-bold text-lg mr-4">{user}</h2> */}
        <NavDropdown
          style={{
            backgroundColor: "white",
            fontSize: "20px",
            borderRadius: "15px",
          }}
          title={user}
          id="username"
        >
          <LinkContainer to="/profile">
            <NavDropdown.Item style={{ borderRadius: "15px" }}>
              profile
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <div>
          <button onClick={onLogout} className="btn btn-danger px-2 mr-4">
            logout
          </button>
        </div>
      </nav>
    </div>
  );
};

// const mapStateToProps = (state) =>{
//   return {
//     isAuthenticated : isAuthenticated(state),
//   }
// }
export default Navbar;
// export default connect(mapStateToProps) (Navbar);
