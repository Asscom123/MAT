import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Perfil from './components/pages/Perfil';
import Sidebar from './components/Sidebar';
import Users from './components/Users';

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
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
