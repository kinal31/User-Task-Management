import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import { getUsers,deleUser,getTask } from '../service/api';
import { FiAlignJustify } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosArrowDropdownCircle } from "react-icons/io"

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(4); // Number of tasks to display per page
    const navigate = useNavigate();
    useEffect(() => {
      getAllUsers();
  }, []);

  const getAllUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
  }

  // console.log(users);

  const handleDelete = async(id) =>{
    await deleUser(id);
      getAllUsers();
    
  }

  const handleButton = async(id) =>{
    await getTask(id);
    navigate(`/task-list/${id}`);
    // console.log("Response");
  }

  const sortTasksUsername = () => {
    const sorted = [...users].sort((a, b) => {
        // Assuming 'username' is the criterion for sorting
        return a.name.localeCompare(b.name);
    });
    setUsers(sorted);
  }

  const sortTasksDepartment = () => {
      const sorted = [...users].sort((a, b) => {
          // Assuming 'username' is the criterion for sorting
          return a.department.localeCompare(b.department);
      });
      setUsers(sorted);
  }

   // Calculate the index of the last task to display on the current page
   const indexOfLastTask = currentPage * tasksPerPage;
   // Calculate the index of the first task to display on the current page
   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
   // Slice the array of tasks to get the tasks for the current page
   const currentTasks = users.slice(indexOfFirstTask, indexOfLastTask);

   const handlePageChange = (pageNumber) => {
       setCurrentPage(pageNumber);
   }
  return (
    <>
    <div className="container my-5">
              <h5>Sort By Value</h5>
              <Dropdown className=' container'>
                <Dropdown.Toggle className='dropdown_btn btn-secondary' id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={sortTasksUsername}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={sortTasksDepartment}>Department</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
      <div className='container my-5'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id Of Users</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Department</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map(user=>(
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.department}</td>
            <td><RiDeleteBin5Fill onClick={()=>handleDelete(user._id)} /> </td>
            <td><FiAlignJustify onClick={()=>{handleButton(user._id)}} component={Link} to={`/task-list/${user._id}`} /> </td>
                  
          </tr>
          ))
        }
        </tbody>
      </table>
      <nav className='container'>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(users.length / tasksPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
            </nav>
    </div>
    </>
  )
}

export default UserList
