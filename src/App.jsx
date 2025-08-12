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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about-us' element={<AboutUsPage />} />
        <Route path="/sports" element={<SportsPage />} />
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
