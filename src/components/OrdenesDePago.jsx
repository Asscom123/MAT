import React, { Component } from "react";
import './Tareas.css';
import Logo from '../assets/Logo.png'
import Alarm from '../assets/alarm.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { FaRegFilePdf } from "react-icons/fa";
import { faFilePen, faPenToSquare, faTrash, faTrashAlt, faPrint} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class OrdenesDePago extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalData: [
        { id: 1, name: '456', age: '73865900' , m: '14-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Juan Alvarez', pdf: <FaRegFilePdf />},
        {id: 2, name: '457', age: '977865900' , m: '13-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Luis Ferrera'},
        { id: 3, name: '468', age: '986580001', m: '12-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Luis Ferrera'},
        { id: 4, name: '469', age: '0055347' , m: '11-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Juan Alvarez'},
        { id: 5, name: '470', age: '4365009' , m: '09-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Luis Ferrera'},
        { id: 6, name: '471', age: '335665600' , m: '08-03-2023', s:'GRUPO LOMA DEL NORTE S.A DE C.V', p:'Juan Alvarez'},
      ],
      datosTabla: [
        { id: 1, nombre: 'Laptop HP', clienteF: 'Alfredo',cantidad:'1', descripcion: 'Core i5', precio:'9500' },
        { id: 2, nombre: 'Monitor HP', clienteF: 'Luis',cantidad:'2', descripcion: '24 pulgadas', precio:'3500' }
      ],
      nuevoDato: { id: '', nombre: '', clienteF: '',cantidad:'', descripcion: '', precio:''  },
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
      docEnCarpeta: false,
     pedido: false,
     PRONE: false,
     Cotizacion: false,
     Contrato: false,
     selectedFile: null,
      tipoModal:''
    }
  }

  
  modalInsertar = () =>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  modalInsertarMayorista = () =>{
    this.setState({ modalInsertarMayorista: true });
  }

  // Método para ocultar el segundo modal mayorista
  cerrarModalMayorista = () => {
    this.setState({ modalInsertarMayorista: false });
  };

  toggleModalMayorista = () => {
    this.setState(prevState => ({
      modalInsertarMayorista: !prevState.modalInsertarMayorista
    }));
  };


  modalInsertarCliente = () =>{
    this.setState({ modalInsertarCliente: true });
  }

  // Método para ocultar el segundo modal Cliente
  cerrarModalCliente = () => {
    this.setState({ modalInsertarCliente: false });
  };

  toggleModalCliente = () => {
    this.setState(prevState => ({
      modalInsertarCliente: !prevState.modalInsertarCliente
    }));
  };

  handleChangePDF = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }
  handleChangeCheckModal = (event) => {
    const { name, checked } = event.target;
    this.setState(prevState => ({
        form: {
            ...prevState.form,
            [name]: checked
        }
    }));
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

  modalSiguiente = () => {
    this.setState({ modalSiguiente: true });
  };
  
  // Método para ocultar el segundo modal
  cerrarModalSiguiente = () => {
    this.setState({ modalSiguiente: false });
  };

  convertirFormatoFecha(fecha) {
    const partes = fecha.split('-');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  toggleModalSiguiente = () => {
    this.setState(prevState => ({
      modalSiguiente: !prevState.modalSiguiente
    }));
  };

  // Función para agregar una fila a la tabla
  agregarFila = () => {
    const { datosTabla, nuevoDato } = this.state;
    const newData = [...datosTabla, nuevoDato];
    this.setState({ datosTabla: newData });
  };

  // Función para eliminar una fila de la tabla
  eliminarFila = id => {
    const newData = this.state.datosTabla.filter(item => item.id !== id);
    this.setState({ datosTabla: newData });
  };

  // Función para manejar cambios en los inputs de la nueva fila
  handleChangeNuevoDato = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      nuevoDato: {
        ...prevState.nuevoDato,
        [name]: value
      }
    }));
  };

  render() {
    const { data, searchTerm, currentPage, itemsPerPage, currentDate , form} = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const { modalSiguiente, datosTabla, nuevoDato } = this.state;

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
          <h1>Orden de pago</h1> 
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
                <th>N° Orden</th>
                <th>N° Factura</th>
                <th>Fecha</th>
                <th>Mayorista</th>
                <th>Ejecutivo Asscom</th>
                <th>Factura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.m}</td>
                  <td>{item.s}</td>
                  <td>{item.p}</td>
                  <td>{item.pdf}</td>
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
                
                  <label htmlFor="nombreEntre">Mayorista</label>
                   <div className="d-flex align-items-center">
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">Mayorista1</option>
                      <option value="Inactivo">Mayorista2</option>
                      <option value="Inactivo">Mayorista3</option>
                      </select>
                      <button type="button" class="btn btn-outline-success" onClick={()=> {this.setState ({form: null, tipoModal: 'insertarMayorista'}); this.modalInsertarMayorista()}}>+</button>
                   </div>
              <br/>
                    
              
                    <label htmlFor="fecha">Número de pedidio</label>
                    <input className="form-control" type="" name="fecha" id="fecha" onChange={this.handleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                    <label htmlFor="nombreEntre">Cliente Final</label>
                    <div className="d-flex align-items-center">
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">Cliente1</option>
                      <option value="Inactivo">Cliente2</option>
                      <option value="Inactivo">Cliente3</option>
                    </select>
                    <button type="button" class="btn btn-outline-success" onClick={()=> {this.setState ({form: null, tipoModal: 'insertarCliente'}); this.modalInsertarCliente()}}>+</button>
                    </div>
                    <br/>
                    
                    <label htmlFor="factura">Nº Factura</label>
                    <input className="form-control" type="file" name="factura" id="factura" accept=".pdf"onChange={this.handleChangePDF} />
                    
                    <br />
                    {this.state.selectedFile && (
                    <div>
                      <p>Archivo seleccionado: {this.state.selectedFile.name}</p>
                    </div> )}
                    <br />
                   
                  </div>
                  
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={this.modalSiguiente}>Siguiente</button>
                  </div>:
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPut()}>Actualizar</button>
                  </div>
                  }
                    
                </ModalFooter>
                </Modal>
{/* Tabla de la OP */}
                <Modal className="modal-dialog modal-lg" isOpen={modalSiguiente}>
              <div class="modal-header">
                  <h5 class="modal-title">Orden de compra</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.toggleModalSiguiente}></button>
                </div>
                  <div className="modal-body">
                    <table className="table">
                      <thead>
                        <tr>
                          {/* <th>ID</th> */}
                          <th>Cotización / Nombre</th>
                          <th>Cliente final</th>
                          <th>Cantidad</th>
                          <th>Descripción del producto</th>
                          <th>Precio unitario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datosTabla.map(item => (
                          <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.nombre}</td>
                            <td>{item.clienteF}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.precio}</td>
                            <td>
                              <button className="btn btn-danger" onClick={() => this.eliminarFila(item.id)}>Eliminar</button>
                            </td>
                          </tr>
                        ))}
                        {/* Agregar fila */}
                        <tr>
                          {/* <td><input type="text" name="id" className="form-control" value={nuevoDato.id} onChange={this.handleChangeNuevoDato} /></td> */}
                          <td><input type="text" name="nombre" className="form-control" value={nuevoDato.nombre} onChange={this.handleChangeNuevoDato} /></td>
                          <td><input type="text" name="clienteF" className="form-control" value={nuevoDato.clienteF} onChange={this.handleChangeNuevoDato} /></td>
                          <td><input type="text" name="cantidad" className="form-control" value={nuevoDato.cantidad} onChange={this.handleChangeNuevoDato} /></td>
                          <td><input type="text" name="descripcion" className="form-control" value={nuevoDato.descripcion} onChange={this.handleChangeNuevoDato} /></td>
                          <td><input type="text" name="precio" className="form-control" value={nuevoDato.precio} onChange={this.handleChangeNuevoDato} /></td>
                          <td>
                            <button className="btn btn-success" onClick={this.agregarFila}>Agregar</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <label htmlFor="fecha">Flete</label>
                    <input className="form-control" type="" name="fecha" id="fecha" onChange={this.handleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                    <label htmlFor="fecha">Tiempo de entrega</label>
                    <input className="form-control" type="" name="fecha" id="fecha" onChange={this.handleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                  </div>
                  
                  <div class="d-grid gap-12 col-4 mx-auto">
                  <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPost()}>Guardar</button>
                  </div>
                  <br/>
                
            
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

{/* Modal de Mayoristas*/}
                <Modal isOpen={this.state.modalInsertarMayorista}>
                <div class="modal-header">
                  <h5 class="modal-title">Mayorista</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.toggleModalMayorista()}></button>
                </div>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="fecha">Ejecutivo</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form ? form.fecha : ''} />
                    <br />
                    <label htmlFor="nombre">Contacto de pago</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">RFC</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.headleChangeModal} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="equipo">Cliente</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.headleChangeModal} value={form?form.equipo: ''}/>
                    <br />
                    <label htmlFor="horaUso">Correo</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br /> 
                    <label htmlFor="nombreEntre">Banco</label>
                    <select className="form-select" name="nombreEntre" id="nombreEntre" onChange={this.headleChangeModal} value={form ? form.nombreEntre : ''}>
                      <option value="">Selecciona</option>
                      <option value="Activo">Banco1</option>
                      <option value="Inactivo">Banco2</option>
                      <option value="Inactivo">Banco3</option>
                    </select>
                    <br /> 
                    <label htmlFor="horaUso">Número de cuenta</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Clave bancaria</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Convenio CIE</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Días de crédito</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Días de pronto pago</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="horaUso">Teléfono</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.headleChangeModal} value={form?form.horaUso:''}/>
                    <br />
                    
                    <br />
                  </div>
                  
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertarMayorista'?
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPost()}>Guardar</button>
                  </div>:
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPut()}>Actualizar</button>
                  </div>
                  }
                    
                </ModalFooter>
                </Modal>

{/*Modal de Cliente */}
                <Modal isOpen={this.state.modalInsertarCliente}>
                <div class="modal-header">
                  <h5 class="modal-title">Cliente</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>this.toggleModalCliente()}></button>
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
                  {this.state.tipoModal=='insertarCliente'?
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPost()}>Guardar</button>
                  </div>:
                  <div class="d-grid gap-12 col-4 mx-auto">
                    <button class="btn btn-lg btn-success" type="button" onClick={()=>this.peticionPut()}>Actualizar</button>
                  </div>
                  }
                    
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

export default OrdenesDePago;
