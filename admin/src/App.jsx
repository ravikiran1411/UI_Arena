import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";

import AddChallenge from './pages/AddChallenge'
import ListChallenge from './pages/ListChallenge'
import Navbar from './components/Navbar'
import UpdateChallenge from './pages/UpdateChallenge';

export const backendUrl = import.meta.env.VITE_BACKEND;

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('adminToken') || "")

  useEffect(()=>{
    if (token) {
      localStorage.setItem('adminToken',token)
    } else {
      localStorage.removeItem('adminToken')
    }
  },[token])

  return (
    <div>

      <ToastContainer/>
      {
        token === "" ? <Login setToken={setToken}/> : 

        <div>
          <Navbar setToken={setToken}/>
          <Routes>
            <Route path='/' element={<AddChallenge token={token}/>}/>
            <Route path='/list' element={<ListChallenge token={token} />} />
            <Route path='/update/:id' element={<UpdateChallenge/>} />
          </Routes>
        </div>
        
      }
    </div>
  )
}

export default App