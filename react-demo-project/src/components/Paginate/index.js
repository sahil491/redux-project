import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { Form,Col, Row, Table, Container } from "react-bootstrap";
import { getUser,deleteUser} from "actions/Auth/userActions";
import { Link } from "react-router-dom";

// import _ from "lodash";


function Paginate(){
    const user1 = useSelector((state) => state.user.data);
    // console.log("user", user1)
    const [items, setItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(5)
    const dispatch = useDispatch();
  // sorting
  const [sortValueasc, setSortValueAsc] = useState()
  const [sortValuedesc, setSortValueDesc] = useState()
     const sortOptions = ["name","email","role","isEmailVerified"]
// Search
const [value, setValue] = useState("")


// useEffect(()=>{
//   console.log("id",user1.results)
//   dispatch(getUserById(user1.results))
// })

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
// sorting
      const handleSortAsc = async (e)=>{
        const value=e.target.value;
        var qrString = `?limit=${limit}&sortBy=${value}:asc` 
        
        setSortValueAsc(value)
        dispatch(getUser(qrString))
      }
      const handleSortDesc = async (e)=>{
        const value=e.target.value;
        var qrString = `?limit=${limit}&sortBy=${value}:desc` 
        
        setSortValueDesc(value)
        dispatch(getUser(qrString))
      }
// filter
      // const handleFilter = async (value)=>{
        
      //   var qrString = `?limit=${limit}&sortBy=${value}:asc` 
        
        
      //   dispatch(getUser(`${qrString}`))
      // }
      // Search
      const handleSearch = (e)=>{
        e.preventDefault();
        var qrString = `?name=${value}`
        dispatch(getUser(qrString))
        setItems(items)
        
      }
      // Reset
      const handleReset = async ()=> {
        var qrString = `?limit=${limit}`
       
        await dispatch(getUser(qrString))
        setValue('')
      }
    return(
        <div>
          
            <Navbar />
            <Container>
            <Link to="/add" className="btn btn-outline-dark my-5 ml-auto w-auto">
            Add User
          </Link>
            <div className="container">
              <Row>
                <Form className="input-group" onSubmit={handleSearch}>
                    <input type="text" className="form-control" placeholder="Search...." value={value} onChange={(e)=>setValue(e.target.value)}></input>
                    <Col md={{ span: 3 }}> 
                    <Col>
                 <button className="btn btn-success" >Search</button>
                 <button className="btn btn-warning" style={{marginLeft:"2px"}} onClick={()=> handleReset()}>Reset</button>
                 </Col>
                </Col>
                </Form>
                <Row style={{marginTop:"20px", marginLeft:"550px"}}>
    <Col md={{ span: 2, offset: 3 }}><h5>Sort By:Asc</h5>
                  <Form.Select onChange={handleSortAsc}
                  value={sortValueasc} aria-label="Default select example">
                  
                    <option>Please Select Value</option>
                    {sortOptions.map((item,index)=>(
                      <option style={{BackgroundColor:"black"}} key={index} value={item}>{item}</option>
                    ))}
                    
                  
                  </Form.Select></Col>
    <Col md={{ span: 2, offset: 4 }}><h5>Sort By:Desc</h5>
                  <Form.Select onChange={handleSortDesc}
                  value={sortValuedesc} aria-label="Default select example">
                  
                    <option>Please Select Value</option>
                    {sortOptions.map((item,index)=>(
                      <option key={index} value={item}>{item}</option>
                    ))}
                    
                  
                  </Form.Select></Col>
  </Row>
                
                {/* <Col md={{ span: 3, offset: 3 }}><h5>Filter By Status</h5>
                 <button className="btn btn-success" onClick={()=> handleFilter('true')}>Active</button>
                 <button className="btn btn-warning" style={{marginLeft:"2px"}} onClick={()=> handleFilter('false')}>click</button>
                </Col> */}

              </Row>
        <div style={{marginTop:"10px"}} className="row d-flex flex-column"></div>
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      {/* <th>Verified Email</th> */}
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
      {/* <td>{item.isEmailVerified}</td> */}
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
      </Container>
        </div>
    )
}
export default Paginate;