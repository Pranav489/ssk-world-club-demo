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
import AboutUs from './Pages/AboutUs/AboutUs'
import SSKSolitaireGuestForm from './Pages/SSKSolitaireGuestForm/SSKSolitaireGuestForm'
import WalkingVisitorForm from './Pages/SSKWalkingVisitorForm/WalkingVisitorForm'
import Sports from './Pages/Sports/Sports'
import SportsDetailPage from './Pages/Sports/SportsDetailsPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/sports/:category/:sportSlug" element={<SportsDetailPage />} />
        <Route path='ssk-solitaire-guest-form' element={<SSKSolitaireGuestForm />} />
        <Route path='ssk-walking-visitor-form' element={<WalkingVisitorForm />} />
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
