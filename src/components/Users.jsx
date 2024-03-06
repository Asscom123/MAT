import { useCallback, useEffect, useState } from "react";
import './Users.css';
import Logo from '../assets/Logo.png'
import Mensaje from '../assets/messaje.png'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function Users() {
  const initialData = [
    { id: 1, name: 'John', age: 'Vazquez' , m: 'Vazquez', s: true},
    { id: 2, name: 'Doe', age: 'Vazquez', m: 'Vazquez' , s: 'Activo'},
    { id: 3, name: 'Jane', age: 'Vazquez', m:'Vazquez' , s: 'Activo'},
    { id: 4, name: 'Smith', age: 'Vazquez', m:'Vazquez' , s: 'Activo'},
    { id: 5, name: 'Alice', age: 'Vazquez' , m: 'Vazquez', s: 'Activo'},
    { id: 6, name: 'Bob', age: 'Vazquez' ,m: 'Vazquez', s: 'Activo'},
    { id: 7, name: 'Fredy', age: 'Vazquez', m: 'Vazquez' , s: 'Activo'},
    { id: 8, name: 'Alvaro', age: 'Vazquez' ,m: 'Vazquez', s: 'Activo'},
    { id: 9, name: 'Pedro', age: 'Vazquez' ,m :'Vazquez', s: 'Activo'},
    { id: 10, name: 'Pablo', age: 'Vazquez' , m:'Vazquez', s: 'Activo'},
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChange = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === '') {
      // Si la búsqueda está vacía, muestra todos los datos originales
      setData(initialData);
    } else {
      // Filtra los datos basados en el término de búsqueda en cualquier campo
      const filteredData = initialData.filter(item => {
        // Verifica si alguno de los valores de las columnas incluye el término de búsqueda
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setData(filteredData);
    }

    setCurrentPage(1); // Volver a la primera página después de cada cambio de búsqueda
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const toggleSwitch = (index) => {
    const newData = [...data];
    newData[index].s = !newData[index].s;
    setData(newData);
  };




  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const day = date.getDate();
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const formattedDate = `${day < 10 ? '0' + day : day} ${monthNames[monthIndex]} ${year}`;
      setCurrentDate(formattedDate);
    }, 1000); // Actualiza la fecha cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, []);
  
  const onLogo1Click = useCallback(() => {
    // Please sync "Dashboard" to the project
  }, []);

  return (
  
    <div className="prueba1">
      <div className="prueba1-child" />
      <img
        className="logo"
        alt=""
        src={Logo}
        onClick={onLogo1Click}
      />
      <img className="messajes"
        alt=""
        src={Mensaje}
        />
      <div className="fecha">{currentDate}</div>
      <br/>    
      
    
      <div className="container">
      <h1>Usuarios</h1> 
      <br/>
      <button className="btn btn-success ">Agregar +</button> 
      <br/>
      <br/>
      <input
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.m}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`switch-${item.id}`}
                    checked={item.s}
                    onChange={() => toggleSwitch(index)}
                  />
                  <label className="form-check-label" htmlFor={`switch-${item.id}`}></label>
                </div>
              </td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal>
        <ModalHeader>
        </ModalHeader>
        <ModalBody>
            <div className="from-group">

            </div>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
      </Modal>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
      
    </div>
  )
}

export default Users;
