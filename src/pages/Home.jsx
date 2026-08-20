import React from 'react'
import Hero from '../components/Hero'
import SushiShowcase from '../components/SushiShowCase'
import WhyUs from '../components/WhyUs'
import AboutUs from '../components/About'
import FollowInstagram from '../components/FollowUs'
import FAQ from '../components/Faq'
import CTA from '../components/CTA'



const Home = () => {
  return (
    <div>
      <Hero/>
      <AboutUs/>
      <SushiShowcase/>
      <WhyUs/>
      <FollowInstagram/>
      <FAQ/>
      <CTA/>
    </div>
  )
}

export default Home
