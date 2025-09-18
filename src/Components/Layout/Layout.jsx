import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import WhatsAppPopup from '../PopUp/WhatsAppPopup'
import ScrollToTop from '../ScrollToTop/ScrollToTop'


const Layout = () => {
  return (
    <div>
    <ScrollToTop/>
    <Navbar/>
    <Outlet/> 
    <WhatsAppPopup/>
    <Footer/>

    </div>
  )
}

export default Layout
