import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  const[mobile,setmobile]=useState(false);

  return (
    <header className='py-3 shadow bg-slate-900 w-[100%] text-white'>
      <Container>
        <nav className='flex flex-row justify-between px-6'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div>

          <ul className={` z-10 flex flex-col md:flex-row md:static md:justify-end items-center absolute ${ mobile ? "top-12" : "top-[-100%]" } left-0 md:bg-transparent  bg-slate-900 w-full ease-in-out md:py-0 py-6`} >
            {navItems.map((item)=> item.active ? (
              <li key={item.name} className="inline-bock px-8 py-1 duration-200 mx-2 hover:bg-orange-500 rounded-md">
                <button onClick={()=>navigate(item.slug)} >{item.name}</button>
              </li>
            ) : null)}
        

          {
            authStatus && (
            <li className='duration-200 hover:bg-slate-700 rounded-sm ml-4 bg-orange-500 my-2 w-[100px] '>
              <LogoutBtn />
            </li>
            )
          }
          
          </ul>

          <button className='md:hidden block' onClick={()=>{setmobile(!mobile)}}>{ !mobile ? "=" : "X"}</button>

        </nav>
      </Container>

    </header>
  )
}

export default Header