import React,{useState} from 'react'
import logo from './UTM.png';
import { NavLink } from 'react-router-dom'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
  } from 'mdb-react-ui-kit';

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <MDBNavbar expand='lg' light style={{backgroundColor: "#e3f2fd"}} >
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>
        <img src={logo} width="30" height="30" alt=""/>UTM
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
                <NavLink className="nav mx-3" style={{textDecoration: "none", color: "black"}} to='/add-user'>Add User</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <NavLink className="nav mx-3" style={{textDecoration: "none", color: "black"}} to='/add-task'>Add Task</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <NavLink className="nav mx-3" style={{textDecoration: "none", color: "black"}} to='/user-list'>User's List</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <NavLink className="nav mx-3" style={{textDecoration: "none", color: "black"}} to='/task-list'>Task's List</NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  )
}

export default Navbar
