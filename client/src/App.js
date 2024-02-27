import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './component/Navbar';
import Footer from './component/Footer'
import AddTask from './component/AddTask';
import AddUser from './component/AddUser';
import TaskList from './component/TaskList';
import UserList from './component/UserList';
import SingleuserList from './component/SingleuserList';
import Home from './component/Home';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-task' element={<AddTask/>}/>
          <Route path='/add-user' element={<AddUser/>}/>
          <Route path='/task-list' element={<TaskList/>}/>
          <Route path='/user-list' element={<UserList/>}/>
          <Route path='/task-list/:id' element={<SingleuserList/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
   
  );
}

export default App;
