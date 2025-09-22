import React from 'react'
import HeroSection from './HeroSection';
import SportsFacilities from './SportsFacilities';
import LuxuryAmenities from './LuxuryAmenities';
import PartnershipsSection from './PartnershipsSection';
import SignatureEvents from './SignatureEvents';
import VideoTestimonials from './VideoTestimonials';
import ImmersiveCTA from './ImmersiveCTA';
import AboutUsSection from './AboutUs';



const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUsSection/>
      <SportsFacilities/>
      <LuxuryAmenities/>
      <SignatureEvents/>
      <VideoTestimonials/>
      <PartnershipsSection/>
      <ImmersiveCTA/>
    </div>
  )
}

export default Home
