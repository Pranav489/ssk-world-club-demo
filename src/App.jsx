import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home  from './Pages/Home/Home'
import PageNotFound from './Pages/ErrorPages/NotFound'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<PageNotFound/>}/>
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
