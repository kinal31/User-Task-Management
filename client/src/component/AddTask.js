import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { addTask } from '../service/api';



const AddTask = () => {

    const [task, setTask] = useState({
        taskname : '',
        username : '',
        department: ''
    });
    const navigate = useNavigate();

    const onValueChange = (e) => {
        
        //  setTask((task) => return { ...task, [e.target.name]: e.target.value });
        setTask((preve)=>{
            return{
              ...preve,
              [e.target.name] : e.target.value
            }
        })
        console.log(task);
    }
    
    const addTaskDetails = async () => {
       
         // Check if required fields are not empty
    if (!task.taskname.trim() || !task.username.trim()) {
        alert('Please fill in all required fields');
        return;
    }
        await addTask(task);
        navigate('/task-list');
    }

    return (
        <>
            <div className='container my-5'>

                <label htmlFor="name" className='px-1'>Enter Task : </label>
                <input type="text" name='taskname' value={task.taskname} onChange={onValueChange} />
                <br /> <br />
                <label htmlFor="name" className='px-1'>Enter the name of user : </label>
                <input type="text" name='username' value={task.username} onChange={onValueChange} />
                <br /> <br />
                <label htmlFor="name" className='px-1'>Enter Your Department : </label>
                <input type="text" name='department' value={task.department} onChange={onValueChange} />
                <br /> <br />
                <button className='btn-primary' onClick={() => { addTaskDetails() }}>Add Task</button>

            </div>
        </>
    )
}

export default AddTask
