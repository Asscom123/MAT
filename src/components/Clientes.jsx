import React, { Component } from "react";
import './Tareas.css';
import Logo from '../assets/Logo.png'
import Alarm from '../assets/alarm.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { AiFillEye } from "react-icons/ai";
import { faFilePen, faPenToSquare, faTrash, faTrashAlt, faPrint, faEye} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [
        { id: 1, name: 'MUNICIPIO DE TUXTLA GUTIÉRREZ', age: 'Carlos Orsoe Morales Vázquez' , m: 'Presidente', s:'Juan Carlos Miranda', p:'Compras', c:'compras@gmail.com', t:'9618464900', c2:'Maria Avendaño Pineda', p2:'Contadora', co2:'mariaTuxtla@gmail.com', t2:'9926547083'},
        { id: 2, name: 'ZOOMAT', age: 'Federico Alvarez del Toro' , m: 'Director General', s:'Alondra Ramos Gómez', p:'Contadora', c:'alondrazommat@gmail.com', t:'9618464900', c2:'Miguel Adrian Ramos', p2:'Contador', co2:'miguelzommattuxtla@gmail.com', t2:'9926547083'},
      ],
      data: [],
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 5,
      currentDate: "",
      modalView: false,
      clienteSeleccionado: null
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


  seleccionarCliente = (cliente) => {
    this.setState({ clienteSeleccionado: cliente, modalView: true });
  };

  

  // Método para cerrar el modal
  cerrarModal = () => {
    this.setState({ modalView: false });
  };

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

  convertirFormatoFecha(fecha) {
    const partes = fecha.split('-');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  render() {
    const { data, searchTerm, currentPage, itemsPerPage, currentDate ,modalView, clienteSeleccionado, form} = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
   

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <div className="personal">
        <div className="personal-child" />
        <img
          className="personal-logo"
          alt=""
          src={Logo}
          onClick={this.onLogo1Click}
        />
        <img className="messajes"
          alt=""
          src={Alarm}
          />
        <div className="fecha">{currentDate}</div>
        <br/>    

        <div className="container">
          <h1>Clientes</h1> 
          <br/>
          <button className="btn btn-success" onClick={()=> {this.setState ({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar +</button> 
          
          <br/>
          <br/>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={this.handleChange}
            className="form-control mb-3"
          />
          <table className="table table-striped  bg-info">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Cliente</th>
                <th>Titular</th>
                {/* <th>Correo</th>
                <th>Mayorista</th>
                <th>Teléfono</th>
                <th>Creador</th> */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  {/* <td>{item.m}</td>
                  <td>{item.s}</td>
                  <td>{item.p}</td>
                  <td>{item.a}</td> */}
                  <td>
                  <button className="btn btn-orange" onClick={()=>{this.seleccionar(item); this.modalInsertar()}}><FontAwesomeIcon icon={faPenToSquare}/></button>{"   "}
                  <button className="btn btn-danger btn-separate" onClick={()=>{this.seleccionar(item); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrash}/></button>
                  <button className="btn btn-primary btn-separate" onClick={() => {this.seleccionarCliente(item); this.setState({modalView: true})}}><FontAwesomeIcon icon={faEye} style={{color: "#ffffff"}} /></button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

{/* Modal para visualizar un cliente*/}
<Modal className="modal-xl modal-dialog modal-dialog-centered modal-dialog-scrollable" isOpen={modalView}>
  <div className="modal-content">
    <div className="modal-header">
      <h4 className="modal-title">Cliente</h4>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.cerrarModal}></button>
    </div>
    <div className="modal-body">
      
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Titular</th>
              <th>Cargo</th>
              
            </tr>
          </thead>
          <tbody>
            {clienteSeleccionado && (
              <tr key={clienteSeleccionado.id}>
                <td>{clienteSeleccionado.name}</td>
                <td>{clienteSeleccionado.age}</td>
                <td>{clienteSeleccionado.m}</td>
                
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h6 class="text-primary-emphasis" >Información de Contacto 1</h6>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puesto</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clienteSeleccionado && (
              <tr key={clienteSeleccionado.id}>
                <td>{clienteSeleccionado.s}</td>
                <td>{clienteSeleccionado.p}</td>
                <td>{clienteSeleccionado.c}</td>
                <td>{clienteSeleccionado.t}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h6 class="text-primary-emphasis">Información de Contacto 2</h6>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puesto</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clienteSeleccionado && (
              <tr key={clienteSeleccionado.id}>
                <td>{clienteSeleccionado.c2}</td>
                <td>{clienteSeleccionado.p2}</td>
                <td>{clienteSeleccionado.co2}</td>
                <td>{clienteSeleccionado.t2}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Titular</th>
              <th>Cargo</th>
              
            </tr>
          </thead>
          <tbody>
            {clienteSeleccionado && (
              <tr key={clienteSeleccionado.id}>
                <td >{clienteSeleccionado.name}</td>
                <td>{clienteSeleccionado.age}</td>
                <td>{clienteSeleccionado.m}</td>
                
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h6 class="text-primary-emphasis" >Contacto de cobranza</h6>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puesto</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clienteSeleccionado && (
              <tr key={clienteSeleccionado.id}>
                <td>{clienteSeleccionado.s}</td>
                <td>{clienteSeleccionado.p}</td>
                <td>{clienteSeleccionado.c}</td>
                <td>{clienteSeleccionado.t}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</Modal>



          

          <Modal isOpen={this.state.modalInsertar}>
                <div class="modal-header">
                <h4 className="modal-title">Cliente</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.modalInsertar()}></button>
                </div>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="nombre">Cliente</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="fecha">Titular</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                    <label htmlFor="nombre">Cargo</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Contacto 1</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="equipo">Puesto</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.headleChangeModal} value={form?form.equipo: ''}/>
                    <br />
                    <label htmlFor="horaUso">Correo</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Teléfono</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Contacto 2</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br /> 
                    <label htmlFor="equipo">Puesto</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.headleChangeModal} value={form?form.equipo: ''}/>
                    <br /> 
                    <label htmlFor="horaUso">Correo</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Teléfono</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                  </div>
                  
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPost()}>Guardar</button>
                  </div>:
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPut()}>Actualizar</button>
                  </div>
                  }
                    
                </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                <div class="modal-header">
                  <h5 class="modal-title">Personal</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.setState({modalEliminar: false})}></button>
                </div>
                  <ModalBody>
                    Estás seguro que deseas eliminar el registro de uso
               </ModalBody>
               <ModalFooter>
                <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.form.id)}>Sí</button>
                <button className="btn btn-success" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
                </Modal>


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

export default Clientes;
