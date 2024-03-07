import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import Documents from './components/RAM';
import RAD from './components/RAD';
import RAM from './components/RAM';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/*'element={
            <Sidebar>
              <Routes>
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/usuarios' element={<Users />} />
                <Route path='/RAD' element={<RAD />} />
                <Route path='/RAM' element={<RAM />} />
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
