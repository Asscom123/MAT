import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Login'
import Perfil from './pages/Perfil'
import Sidebar from './Sidebar'
function Nav() {
  return (
    
    <Router>
        <Sidebar>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/perfil' element={<Perfil/>}></Route>
        </Routes>
        </Sidebar>
    </Router>
  )
}

export default Nav