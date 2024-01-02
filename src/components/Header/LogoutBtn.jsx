import React from 'react'
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  }

  return (
    <button className='inline-bock px-6 py-2 ' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn