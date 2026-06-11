
import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Challenges from './pages/Challenges'
import ChallengeDetails from './pages/ChallengeDetails'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Leaderboard from './pages/Leaderboard'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/challenges' element={<Challenges/>} />
        <Route path='/challengedetails/:id' element={<ChallengeDetails/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>} />
      </Routes>
        
    </div>
  )
} 

export default App