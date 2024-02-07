import React from 'react'
import '../Styles/Login.css'
import user_icon from '../Assets/user.png'
import password_icon from '../Assets/password.png'
import logo from '../Assets/logo.jpg'


function Login() {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>
          <img src={logo} alt=''/>
          <div className="text-b">Bienvenido</div>
        </div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt=''/>
          <input type='email' placeholder='Usuario'/>
        </div>
        
        <div className='input'>
          <img src={password_icon} alt=''/>
          <input type='password' placeholder='Contraseña'/>
        </div>
        
        <div className="submit-container">
          <div className="submit">Iniciar sesión</div>
        </div>
      </div>
    </div>
  )
}

export default Login