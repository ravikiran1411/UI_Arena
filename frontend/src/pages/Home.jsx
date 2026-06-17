import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'
import WhyUiArena from '../components/WhyUiArena'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Stats/>
        <HowItWorks/>
        <WhyUiArena/>
    </div>
  )
}

export default Home