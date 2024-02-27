/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { getTask } from '../service/api';
import { useParams } from 'react-router-dom';

const singleuserList = () => {
    
    const [tasks, setTask] = useState([]);
    const {id} = useParams()
    
    useEffect(()=>{
      handleSingleUserList();
    },[])

    const handleSingleUserList = async() =>  {
        // console.log(id);
        let response = await getTask(id)
        setTask(response.data)
    }
  return (
    <>
      <div className='container my-5'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id Of Task</th>
            <th scope="col">Name Of Task</th>
            <th scope="col">Name Of The User</th>
             <th scope="col">Department</th> 
          </tr>
        </thead>
        <tbody>
          {tasks.map(task=>(
          <tr key={task._id}>
            <td>{task._id}</td>
            <td>{task.taskname}</td>
            <td>{task.username}</td>
            {/* handleSingleUserList(id) */}
            <td>{task.department}</td> 
          </tr>
          ))
        }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default singleuserList
