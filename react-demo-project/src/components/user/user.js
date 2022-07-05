import { getUser } from "actions/Auth/userActions";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import styled from '@material-ui/core/styles/styled';
const columns = [
  { field: "sr", headerName: "Sr No.", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 600 },
  { field: "role", headerName: "Role" },
  { field: "action", headerName: "Action" },
];

const Userview3 = () => {
  const user = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    setTableData(user);
  }, [tableData]);

  return (
    <div style={{ height: 700, width: "90%", margin: "90px" }}>
      <h2>Data Table</h2>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Userview3;
