import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getUser,deleteUser} from "actions/Auth/userActions";
import { Link } from "react-router-dom";
// import _ from "lodash";


function Sort(){
    const user1 = useSelector((state) => state.user.data);
    // console.log("user", user1)
    const [items, setItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(5)
    const dispatch = useDispatch();
  // sorting
  


    useEffect(()=>{
        if(user1 && user1.results){
        setItems(user1.results)
        // const count = user1.results.length;  
        // console.log(count)
        
        setPageCount(user1.totalPages)
        // console.log(items) 
        }
      },[user1])  
      useEffect(()=>{ 
        dispatch(getUser(`?limit=5`)) 
        setLimit(5)
      },[]) 
      const handlePageClick = async (data)=>{ 
       
        console.log(data.selected)
        const currentPage = data.selected + 1;  
        // console.log(currentPage)
        var qrString = `?limit=${limit}&page=${currentPage}`;

        await dispatch(getUser(qrString))
       
        // setItems(commentServer)
        // console.log("commen",setItems(commentServer))
      }  
    //   Delete user
      const handleDelete = async (id) => {
      //  console.log("gg", data.selected)
        await dispatch(deleteUser(id));
       var qrString = `?limit=${limit}` 
        await dispatch(getUser(qrString));
      };

     
   
    return(
        <div>
            <Navbar />
            <Link to="/add" className="btn btn-outline-dark my-5 ml-auto w-auto">
            Add User
          </Link>
            <div className="container">
              
        <div className="row d-flex flex-column"></div>
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody> 
      {
      items &&    
      items.map((item, index)=>(
    <tr key={index.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td><Link
                        type="button"
                        to={`/edit/${item.id}`}
                        className="btn btn-sm btn-primary mt-10 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                      </td>
    </tr>
      ))}
  </tbody>
</Table>
</div>

            <ReactPaginate 
      previousLabel={'previous'}

      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={pageCount}
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
    )
}
export default Sort;