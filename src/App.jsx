import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='h-[100vh] w-full flex flex-wrap content-between'>
      <div className='w-full block'>
        <Toaster/>
        <Header />
        <main className='my-4'>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App