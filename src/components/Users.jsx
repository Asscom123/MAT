import { useCallback } from "react";
import './Users.css';
import Logo from '../assets/Logo.png'

function Users() {
  const onLogo1Click = useCallback(() => {
    // Please sync "Dashboard" to the project
  }, []);

  return (
  
    <div className="prueba1">
      <div className="prueba1-child" />
      <img
        className="logo-1-icon"
        alt=""
        src={Logo}
        onClick={onLogo1Click}
      />
     
      <br />
      <button className="btn btn-success ">Agregar</button>
      
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Cubículo</th>
              <th>Número de Cubiculo</th>
              <th>Energia Electrica</th>
              <th>Infraestructura</th>
              <th>Acciones</th>
            </tr>
          </thead>
        </table>
      
    </div>
    
  )
}

export default Users