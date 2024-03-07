import React, { Component } from "react";
import './Users.css';
import Logo from '../assets/Logo.png'
import Mensaje from '../assets/messaje.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilePen, faPenToSquare, faPrint, faTrash, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class RAM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [
        { id: 1, name: 'Edgar', age: '10' , m: 'Marzo', s: '2024'},
        { id: 2, name: 'Montserrat', age: '07', m: 'Marzo' , s: '2024'},
        { id: 3, name: 'Luis', age: '09', m:'Febrero' , s: '2024'},
        { id: 4, name: 'Armando', age: '02', m:'Febrero' , s: '2024'},
        { id: 5, name: 'Alice', age: '14' , m: 'Enero', s: '2024'},
        { id: 6, name: 'Bob', age: '13' ,m: 'Enero', s: '2024'},
      ],
      data: [],
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 5,
      currentDate: ""
    };
  }

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id:'',
      name:'',
      age:'',
      m:'',
      s:'',
      tipoModal:''
    }
  }
  modalInsertar = () =>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  headleChangeModal = async e => {
    e.persist ();
    await this.setState({
      form:{
        ...this.state.from,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form)
  }

  seleccionar = (item) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id:'',
        name:'',
        age:'',
        m:'',
        s:'',
      }
    })
  }

  componentDidMount() {
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
      this.setState({ currentDate: formattedDate });
    }, 1000);

    this.setState({ intervalId: intervalId, data: this.state.originalData });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleChange = event => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });

    const { originalData } = this.state;

    if (searchTerm.trim() === '') {
      // Si la búsqueda está vacía, muestra todos los datos originales
      this.setState({ data: originalData });
    } else {
      // Filtra los datos basados en el término de búsqueda en cualquier campo
      const filteredData = originalData.filter(item => {
        // Verifica si alguno de los valores de las columnas incluye el término de búsqueda
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ data: filteredData });
    }

    this.setState({ currentPage: 1 }); // Volver a la primera página después de cada cambio de búsqueda
  };

  paginate = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  toggleSwitch = index => {
    const { data } = this.state;
    const newData = [...data];
    newData[index].s = !newData[index].s;
    this.setState({ data: newData });
  };

  onLogo1Click = () => {
    // Please sync "Dashboard" to the project
  };

  render() {
    const { data, searchTerm, currentPage, itemsPerPage, currentDate , form} = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <div className="prueba1">
        <div className="prueba1-child" />
        <img
          className="logo"
          alt=""
          src={Logo}
          onClick={this.onLogo1Click}
        />
        <img className="messajes"
          alt=""
          src={Mensaje}
          />
        <div className="fecha">{currentDate}</div>
        <br/> 

        <div className="container">
          <h1 >REPORTES RAM</h1> 
          <br/>
          
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={this.handleChange}
            className="form-control mb-3"
          />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Personal</th>
                <th>Día</th>
                <th>Mes</th>
                <th>Año</th>
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
                  <td>{item.s}</td>
                  <td>
                  <button className="btn btn-print" onClick={()=>{this.seleccionar(item); this.modalInsertar()}}><FontAwesomeIcon icon={faPrint}/></button>{"   "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        

          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => this.paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>   
       
       
      </div>
    );
  }
}

export default RAM;
