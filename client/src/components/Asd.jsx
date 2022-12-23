import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Missions from './missions/Missions';
import {Table} from './Table';

const Asd = () => {
let location = useLocation();
  
const [user, setUser] = useState(location.state);
// const [columns, setColumns] = useState([]);
// const [data, setData] = useState([]);

// useEffect(() => {
//   buildColumns();
// },[]);

// useEffect(() => {
//   if(columns.length > 0) 
//     buildData();
// },[columns]);

// const buildColumns = () => {
//   if(user){
//     let dddd = [];
//     for(let i = 0; i < Object.keys(user).length; i++) {
//       let a = {path:Object.keys(user)[i], name:Object.keys(user)[i]};
//       dddd.push(a);
//     }
//     setColumns(dddd);
//   }
// }

// const buildData = () => {
//   if(user){
//     let sss = {};
//     for(let i = 0; i < Object.keys(user).length; i++) {
//       let asdasd = columns[i].name;
//       let t = Object.values(user)[i];
//       sss = {...sss, [asdasd]: t};
//     }
//     setData([sss]);
//   }
// }


//console.log(location.state.user)
// const columns = [
//   { path: "id",   name: "ID" },
//   { path: "name", name: "Name" },
//   { path: "age",  name: "Age" },
//   { path: "favFruit",  name: "fruit" },
// ];

// const data = [
//   { id: 1, name: 'Kate',  age: 25, favFruit: '🍏' },
//   { id: 2, name: 'Tom',   age: 23, favFruit: '🍌' },
//   { id: 3, name: 'Ann',   age: 26, favFruit: '🍊' },
//   { id: 4, name: 'Jack',  age: 21, favFruit: '🍒' }
// ];

return (
  <div>
    {/* <Table id="id" columns={columns} data={data} /> */}
    <Missions
      missions={user}
    />
  </div>
);
}

export default Asd;