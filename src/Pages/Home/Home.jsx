import React from 'react'
import HeroSection from './HeroSection';
import SportsFacilities from './SportsFacilities';
import RoomsPreview from './RoomPreview';
import DiningExperience from './DiningExperience';
import LuxuryAmenities from './LuxuryAmenities';
import MembershipTiers from './MembershipTiers';
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
      {/* <MembershipTiers/> */}
      <SignatureEvents/>
      <VideoTestimonials/>
      <PartnershipsSection/>
      <ImmersiveCTA/>
      <RoomsPreview/>
      <DiningExperience/>
    </div>
  )
}

export default Home
