
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { lazy , Suspense } from 'react'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const Challenges = lazy(()=> import('./pages/Challenges'))
const ChallengeDetails = lazy(()=> import('./pages/ChallengeDetails'))
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const Login = lazy(()=>import('./pages/Login'))
const Profile = lazy(()=> import('./pages/Profile'))
const Leaderboard = lazy(()=>import('./pages/Leaderboard'))


const App = () => {
  return (
    <div className=''>
      <ToastContainer />
      <Navbar />

      <Suspense 
      fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>}
      >
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/challenges' element={<Challenges/>} />
          <Route path='/challengedetails/:id' element={<ChallengeDetails/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>} />
        </Routes>
      </Suspense>

      


      <Footer/>
        
    </div>
  )
} 

export default App