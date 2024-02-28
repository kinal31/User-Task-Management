import React from 'react'
import { useEffect, useState } from 'react';
import { getTasks } from '../service/api';
import Multiselect from 'multiselect-react-dropdown';
import Dropdown from 'react-bootstrap/Dropdown';

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    // const [name, setOptionName] =useState([]);
    const [usernames, setUsernames] = useState([]);
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(3); // Number of tasks to display per page
    const [search,setSearch] = useState("");

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, selectedUsernames,search]);

    const getAllTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
        const uniqueUsernames = Array.from(new Set(response.data.map(task => task.username)));
        //We first extract all usernames from the tasks data.
        //Then, we create a Set from the array of usernames to eliminate duplicates.
        // Finally, we convert the Set back into an array containing only unique usernames. This array is stored in the uniqueUsernames variable, which will be used as options for the Multiselect component.
        setUsernames(uniqueUsernames);
        setSelectedUsernames(uniqueUsernames);
    }

    const filterTasks = () => {
        let filtered = tasks.filter(task => selectedUsernames.includes(task.username));
        if (search.trim() !== '') {
            filtered = filtered.filter(task =>
                task.username.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredTasks(filtered);
    }

    const sortTasksUsername = () => {
        const sorted = [...filteredTasks].sort((a, b) => {
            // Assuming 'username' is the criterion for sorting
            return a.username.localeCompare(b.username);
        });
        setFilteredTasks(sorted);
    }
    const sortTasks = () => {
        const sorted = [...filteredTasks].sort((a, b) => {
            // Assuming 'taskname' is the criterion for sorting
            return a.taskname.localeCompare(b.taskname);
        });
        setFilteredTasks(sorted);
    }
    const sortTasksDepartment = () => {
        const sorted = [...filteredTasks].sort((a, b) => {
            // Assuming 'username' is the criterion for sorting
            return a.department.localeCompare(b.department);
        });
        setFilteredTasks(sorted);
    }

    // console.log(tasks)  

    // Calculate the index of the last task to display on the current page
    const indexOfLastTask = currentPage * tasksPerPage;
    // Calculate the index of the first task to display on the current page
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    // Slice the array of tasks to get the tasks for the current page
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className='m-1'>
                <div className='container d-flex justify-content-between'>
                    <div className="container mt-5 ">
                        <div className="search col-lg-9">
                            <div className="input-group">
                                <input type="search" className="form-control rounded" placeholder="Search by user" aria-label="Search" aria-describedby="search-addon" onChange={(e)=>setSearch(e.target.value)}/>
                                <button type="button" className="btn btn-secondary" data-mdb-ripple-init>search</button>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <h5>Sort By Value</h5>
                        <Dropdown className=' container'>
                            <Dropdown.Toggle className='dropdown_btn btn-secondary' id="dropdown-basic">
                                <i className="fa-solid fa-sort"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={sortTasksUsername}>Username</Dropdown.Item>
                                <Dropdown.Item onClick={sortTasks}>Task</Dropdown.Item>
                                <Dropdown.Item onClick={sortTasksDepartment}>Department</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className='container mt-5'>
                        <Multiselect
                            className="md:w-20rem float-end mb-5"
                            isObject={false}
                            showCheckbox
                            options={usernames}
                            selectedValues={selectedUsernames}
                            onSelect={(selectedList, selectedItem) => setSelectedUsernames(selectedList)}
                            onRemove={(selectedList, removedItem) => setSelectedUsernames(selectedList)}
                            displayValue="Username"
                            placeholder='Filter by Username'
                        />
                    </div>


                </div>

                <div className='container my-5'>
                    <table className="table" border={1.5}>
                        <thead>
                            <tr>
                                <th scope="col">Id Of Task</th>
                                <th scope="col">Name Of Task</th>
                                <th scope="col">Name Of The User</th>
                                <th scope="col">User Id</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task._id}</td>
                                    <td>{task.taskname}</td>
                                    <td>{task.username}</td>
                                    <td>{task.userId}</td>
                                    <td>{task.department}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    <nav className='container'>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
                </div>
                
            </div>
        </>
    )
}

export default TaskList
