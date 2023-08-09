import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import About from './component/About'
import Contect from './component/Contect'
import Login from './component/Login'
import Sigup from './component/sigup'
import Errorpage from './component/Errorpage'
import Logout from './component/Logout'
const App = () => {
  return (
    <>
      <Navbar />
      {/* <Home /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contect' element={<Contect />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sigup' element={<Sigup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Errorpage />} />
      </Routes>

    </>

  )
}

export default App