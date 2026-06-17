import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Stats/>
        <HowItWorks/>
    </div>
  )
}

export default Home