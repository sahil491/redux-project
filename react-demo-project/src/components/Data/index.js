import React from "react";
import MaterialTable from "material-table";

const Data = () => {
    const data = [
        { name: "jyoti", age: 12 },
        { name: "jyoti", age: 12 },
        { name: "jyoti", age: 12 },
        { name: "jyoti", age: 12 },
    ];
    const columns = [
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
    ];

    return ( <
        div >
        <
        MaterialTable data = { data }
        columns = { columns }
        /> <
        /div>
    );
};
export default Data;

// import BootstrapTable from 'react-bootstrap-table-next';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Data() {

//   const products = [
//     { id: 1, name: 'George', animal: 'Monkey' },
//     { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
//     { id: 3, name: 'Alice', animal: 'Giraffe' },
//     { id: 4, name: 'Alice', animal: 'Tiger' }
//   ];

//   const columns = [
//     { dataField: 'id', text: 'Id' },
//     { dataField: 'name', text: 'Name' },
//     { dataField: 'animal', text: 'Animal' }
//   ];

//   return (
//     <div className="App">
//       <h3>React Bootstrap Table 2</h3>

//       <BootstrapTable keyField='id' data={products} columns={columns} />
//     </div>
//   );
// }

// export default Data;