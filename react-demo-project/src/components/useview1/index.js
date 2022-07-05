import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "actions/Auth/userActions";
// import { connect } from "react-redux";
import { Link} from "react-router-dom";
import _ from "lodash";
// import { signIn } from "actions/Auth/authActions";

// import Swal from "sweetalert2";
const UserView = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("ASC");
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteruser, setFilterUser] = useState([]);
  const [items, setItems] = useState([])
  // const location = useLocation();
  
  const user1 = useSelector((state) => state.user.data);
  // console.log("user", user1)
  const dispatch = useDispatch();
  const pageSize = 5;
   
  useEffect(()=>{
    setItems(user1.results)
    dispatch(getUser())
    console.log(items)
  },[])


  // useEffect(() => {
  //   console.log("location", location);
  //   const userview = location.pathname;
  //   console.log("path", `/userview/${pageSize}`)
  // }, [location]);


  useEffect(() => {
    dispatch(getUser());
  }, []);

  // console.log("user", user);
  useEffect(() => {
    dispatch(getUser(query));
    
    // dispatch(getUser("?role=user"));
    setFilterUser(_(user1).slice(0).take(pageSize).value());
  }, []);

  const paginationClick = (pageNo) => {
    // console.log(pageNo)
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPosts = _(user1).slice(startIndex).take(pageSize).value();
    setFilterUser(paginatedPosts);
  };

  // useEffect(()=>{
  //   dispatch(getUser(filteruser))
  // },[])

  useEffect(() => {
    setUser(user1.results);
    setFilterUser(user1.results);
    paginationClick(1);
  }, [user1]);
  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUser());
  };
  const pageCount = user ? Math.ceil(user.length / pageSize) : 0;
  // if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      console.log(sorted);
      setFilterUser(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setFilterUser(sorted);
      console.log(sorted);
      setOrder("ASC");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setFilterUser(
      user.filter(
        (data) =>
          data.name.toLowerCase().includes(query) ||

          data.role.toLowerCase().includes(query)
      )
    );
    // dispatch(getUser(filteruser))
    // dispatch(getUser(`?name=${e.target.value}`));
  };

  const handlePageClick = async (data)=>{
    console.log(data.selected)
    const currentPage = data.selected + 1;
    console.log(currentPage)
    const commentServer = await dispatch(getUser(currentPage))
    setItems(commentServer)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex flex-column">
          <Link to="/add" className="btn btn-outline-dark my-5 ml-auto w-auto">
            Add User
          </Link>
          <div className="col-md-25 mx-2 my-4">
            <input
              style={{ marginTop: 10, marginBottom: 20, width: "40%" }}
              type="text"
              placeholder="search...."
              value={query}
              className="form-control"
              onChange={handleChange}
            />
            <br></br>
            <table className="table table-hover">
              <thead className="table-header bg-dark text-white">
                <tr>
                 
                  <th onClick={() => sorting("name")} scope="col">
                    Name
                  </th>
                  <th scope="col">
                    Email
                  </th>
                  <th onClick={() => sorting("role")} scope="col">
                    Role
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteruser.map((data, index) => (
                  <tr key={index.id}>
                    
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
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                {pages.map((page) => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    onClick={() => paginationClick(page)}
                    className={
                      page === currentPage ? "page-item active" : "page-item"
                    }
                  >
                    <p className="page-link">{page}</p>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ReactPaginate 
      previousLabel={'previous'}
      nextLavbel={'next'}
      breakLabel={'...'}
      pageCount={pages}
      marginPagesDisplayed={3}
      pageRangeDisplayed={6}
      onPageChange={handlePageClick}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
      />
    </div>
  
  );
};

export default UserView;
