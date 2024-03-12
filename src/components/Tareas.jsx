import React, { Component } from "react";
import './Tareas.css';
import Logo from '../assets/Logo.png'
import Alarm from '../assets/alarm.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilePen, faPenToSquare, faTrash, faTrashAlt, faPrint} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Tareas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [
        { id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
        {id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
        { id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
        { id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
        { id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
        { id: 1, name: '07/03/2024', age: '08/03/2024' , m: 'Reporte de utilidades', s:'UI', p:'En proceso'},
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
          <h1>Tareas Asignadas Pendientes</h1> 
          <br/>
          <button className="btn btn-success" onClick={()=> {this.setState ({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar +</button> 
          <button className="btn btn-print" onClick={()=>{}}><FontAwesomeIcon icon={faPrint}/></button>{"   "}
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
                <th>ID</th>
                <th>Fecha Inical</th>
                <th>Fecha Limite</th>
                <th>Descripcion</th>
                <th>Prioridad</th>
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
                  <td>{item.s}</td>
                  <td>{item.p}</td>
                  <td>
                  <button className="btn btn-orange" onClick={()=>{this.seleccionar(item); this.modalInsertar()}}><FontAwesomeIcon icon={faPenToSquare}/></button>{"   "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
                <div class="modal-header">
                  <h5 class="modal-title">Tarea</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.modalInsertar()}></button>
                </div>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="nombre">Empresa</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Cargo</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Personal</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Fecha inicial</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="equipo">Fecha limite</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.headleChangeModal} value={form?form.equipo: ''}/>
                    <br />
                    <label htmlFor="horaUso"> Descripción de la tarea</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br /> 
                    <label htmlFor="horaUso">Acciones</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Personal de apoyo</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Observaciones</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Potencial $</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="nombreEntre">Plazo</label>
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">CP</option>
                      <option value="Inactivo">MP</option>
                      <option value="Inactivo">LP</option>
                    </select>
                    <br />
                    <label htmlFor="nombreEntre">Prioridad</label>
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">UI</option>
                      <option value="Inactivo">NUI</option>
                      <option value="Inactivo">NIU</option>
                      <option value="Inactivo">NINU</option>
                    </select>
                    <br />
                    <label htmlFor="nombreEntre">Status</label>
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">Por iniciar</option>
                      <option value="Inactivo">En Proceso</option>
                      <option value="Inactivo">Finalizado</option>
                    </select>
                    <br />
                    <label htmlFor="horaUso">Fecha final</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />


                    
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

export default Tareas;
