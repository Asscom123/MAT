import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil';
import Sidebar from './components/Sidebar';
import SidebarPersonal from './components/SidebarPersonal'; // Importa el SidebarPersonal
import Users from './components/Users';
import Documents from './components/RAM';
import RAD from './components/RAD';
import RAM from './components/RAM';
import Tareas from './components/Tareas';

function App() {
  // Supongamos que tienes una variable en tu estado que indica si el usuario es administrador o personal
  const [isAdmin, setIsAdmin] = useState(false); // Cambia el estado según el tipo de usuario

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/*' element={
          isAdmin ? ( // Si el usuario es administrador
            <Sidebar>
              <Routes>
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/usuarios' element={<Users />} />
                <Route path='/RAD' element={<RAD />} />
                <Route path='/RAM' element={<RAM />} />
              </Routes>
            </Sidebar>
          ) : ( // Si el usuario es personal
            <SidebarPersonal> 
              <Routes>
                <Route path='/tareas' element={<Tareas />} />
              </Routes>
            </SidebarPersonal>
          )
        }/>
      </Routes>
    </Router>
  );
}

export default App;
