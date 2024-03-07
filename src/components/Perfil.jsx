import React, { Component } from "react";
import './Users.css';
import Logo from '../assets/Logo.png'
import Mensaje from '../assets/messaje.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilePen, faPenToSquare, faTrash, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
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

  render() {
    const {currentDate} = this.state;

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

      </div>
    );
  }
}

export default Perfil;
