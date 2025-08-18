import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import PageNotFound from './Pages/ErrorPages/NotFound'
// import AboutUs from './Pages/AboutUs/AboutUs'
import SSKSolitaireGuestForm from './Pages/SSKSolitaireGuestForm/SSKSolitaireGuestForm'
import WalkingVisitorForm from './Pages/SSKWalkingVisitorForm/WalkingVisitorForm'
import SportsDetailPage from './Pages/Sports/SportsDetailsPage'
import AboutUsPage from './Pages/AboutUs/AboutUsPage'
import SportsPage from './Pages/Sports/SportsPage'
import AmenitiesPage from './Pages/Amenities/AmenitiesPage'
import AmenityDetailsPage from './Pages/Amenities/AmenityDetailsPage'
import GalleryPage from './Pages/Gallery/GalleryPage'
import MembershipPage from './Pages/Membership/MembershipPage'
import AffiliationsPage from './Pages/Affiliations/AffiliationsPage'
import EventsPage from './Pages/Events/EventsPage'
import ContactPage from './Pages/Contact/ContactPage'
import EventDetailsPage from './Pages/Events/EventDetailsPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about-us' element={<AboutUsPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/sports/:category/:sportSlug" element={<SportsDetailPage />} />
        <Route path='/amenities' element={<AmenitiesPage />} />
        <Route path='/amenities/:amenitySlug' element={<AmenityDetailsPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/membership' element={<MembershipPage />} />
        <Route path='/affiliations' element={<AffiliationsPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:eventSlug' element={<EventDetailsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/ssk-solitaire-guest-form' element={<SSKSolitaireGuestForm />} />
        <Route path='/ssk-walking-visitor-form' element={<WalkingVisitorForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
