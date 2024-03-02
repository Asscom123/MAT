import { useCallback } from "react";
import "./FrameComponent.css";
import Logo from '../assets/Logo.png'
import User from '../assets/User.png'
import Password from '../assets/Password.png'

const FrameComponent = () => {
  const onBackgroundRectangleClick = useCallback(() => {
    // Please sync "Dashboard" to the project
  }, []);

  return (
    <div className="frame-parent">
      <div className="frame-container">
        <div className="logo-1-parent">
          <img
            className="logo-1-icon"
            loading="eager"
            alt=""
            src={Logo}
          />
          <div className="usuario-frame">
            <div className="bienvenido">Bienvenido</div>
          </div>
        </div>
      </div>
      <div className="frame-group">
        <div className="rectangle-group">
          <div className="frame-inner" />
          <img
            className="customer-icon"
            loading="eager"
            alt=""
            src={User}
          />
          <b className="usuario">Usuario</b> 
        </div>
        <div className="rectangle-container">
          <div className="rectangle-div" />
          <img
            className="secure-icon"
            loading="eager"
            alt=""
            src={Password}
          />
          <div className="contrasea-wrapper">
            <b className="contrasea">Contraseña</b>
          </div>
        </div>
      </div>
      <div className="init-session-frame">
        <div
          className="background-rectangle"
          onClick={onBackgroundRectangleClick}
        />
        <b className="iniciar-sesin">Iniciar Sesión</b>
      </div>
    </div>
  );
};

export default FrameComponent;