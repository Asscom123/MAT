import React, { Component } from "react";
import './Tareas.css';
import Logo from '../assets/Logo.png'
import Alarm from '../assets/alarm.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilePen, faPenToSquare, faTrash, faTrashAlt, faPrint} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class OrdenesDeCompra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [
        { id: 1, name: '456', age: '73865900' , m: '14-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
        {id: 2, name: '457', age: '977865900' , m: '13-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
        { id: 3, name: '468', age: '986580001', m: '12-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
        { id: 4, name: '469', age: '0055347' , m: '11-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
        { id: 5, name: '470', age: '4365009' , m: '09-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
        { id: 6, name: '471', age: '335665600' , m: '08-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'DIEGO ALBERTO GIMENEZ FREITEZ'},
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

  convertirFormatoFecha(fecha) {
    const partes = fecha.split('-');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

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
          <h1>Ordenes de compra</h1> 
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
                <th>ID</th>
                <th>N° Orden</th>
                <th>N° Factura</th>
                <th>Fecha</th>
                <th>Mayorista</th>
                <th>Ejecutivo</th>
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
                  <button className="btn btn-accion" onClick={()=>{this.seleccionar(item); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faPrint}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={this.state.modalInsertar}>
                <div class="modal-header">
                  <h5 class="modal-title">Orden de compra</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.modalInsertar()}></button>
                </div>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="nombre">N° de Orden</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="fecha">Fecha</label>
                    <input className="form-control" type="date" name="fecha" id="fecha" onChange={this.handleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                    <label htmlFor="nombre">Mayorista</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Ejecutivo</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="equipo">Contacto de pago</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.headleChangeModal} value={form?form.equipo: ''}/>
                    <br />
                    <label htmlFor="horaUso">Correo</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br /> 
                    <label htmlFor="horaUso">Número de pedido</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">N° cliente</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Datos Bancarios</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Cliente Final</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Nº Factura</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    {/* <label htmlFor="nombreEntre">Plazo</label>
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
                    <br /> */}


                    
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

export default OrdenesDeCompra;
