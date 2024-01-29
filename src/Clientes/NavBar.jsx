
import React, { useState } from 'react';
import {Container, Nav ,Modal ,Navbar, NavDropdown} from 'react-bootstrap'
import logo from '../assets/images/descargar.jpg'
import LoginForm from '../components/login';
import { Link } from 'react-router-dom';
import RegistroForm from '../components/registro';

const NavBar =()=>{

    const navbarStyle = {
        backgroundColor: '#88b8df',  
        borderRadius: '15px',
        margin: '10px',
        marginLeft: '10px',
      };
    
      const logoStyle = {
        width: '40px', 
        borderRadius: '50%', 
        marginRight: '10px',
      };
      const [MostrarModal, setMostrarModal] = useState(false);
      const [Logeado, setLogeado] = useState(false);
      const [ModalRegistroVisible, setModalRegistroVisible] = useState(false);

      const HacerClick = () => {
        setMostrarModal(true);
      };
    
      const CerrarModal = () => {
        setMostrarModal(false);
        setModalRegistroVisible(false)

      };


      const IniciarSesion = (userData) => {
        setLogeado(true);
        setMostrarModal(false);
        console.log('Usuario ha iniciado sesión:', userData);
      };

      

      const RegresarAlLogin = () => {
        setModalRegistroVisible(false);
        setMostrarModal(true);
      };

     


  return(
<>
  <Navbar expand="lg" style={navbarStyle}>
    <Container>
      <Navbar.Brand href="#home">
      <img src={logo} alt="Logo" style={logoStyle} />
      Hamburguesas al carbon  
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
    <Container>
    <Navbar.Collapse className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href="/Menu">Menú</Nav.Link>
          {Logeado &&<NavDropdown title="Perfil" style={{ marginLeft: 'auto', fontSize: '16px' }}>
              <NavDropdown.Item href="/Perfil" style={{marginLeft: 'auto', fontSize: '14px' }}>Ver perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" style={{ fontSize: '14px' }}>
                Cerrar sesion
              </NavDropdown.Item>
            </NavDropdown>}
          {Logeado && <Nav.Link href="/Reservaciones">Reservaciones</Nav.Link>}
       
          {Logeado && <Nav.Link>Puntos</Nav.Link>}

          {Logeado && <Nav.Link href="/Carrito">Carrito</Nav.Link>}
         
          {!Logeado && <Nav.Link onClick={HacerClick}>Iniciar sesión</Nav.Link>}
    
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

     {/* Modal */}
     <Modal show={MostrarModal} onHide={CerrarModal}>
        <Modal.Header closeButton  style={{ borderBottom: 'none' }}>
        </Modal.Header>
        <Modal.Body>
        <LoginForm onLogin={IniciarSesion }  />
        </Modal.Body>
      </Modal>

      <Modal show={ModalRegistroVisible} onHide={CerrarModal}>
        <Modal.Header closeButton  style={{ borderBottom: 'none' }}>
        </Modal.Header>
        <Modal.Body>
        <RegistroForm onGoBackToLogin={RegresarAlLogin} />
        </Modal.Body>
      </Modal>
</>


    )
}

export default NavBar;