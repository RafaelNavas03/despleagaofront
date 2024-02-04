import React, { useContext, useState, useEffect  } from "react";
import {Card, Form,Modal, Button, Row,
  Col} from 'react-bootstrap';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CarritoContext";
import PayPal from "./Paypal";


const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [MostrarModal, setMostrarModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Casa");
  const [showCardForm, setShowCardForm] = useState(false);
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [pagoCompletado, setPagoCompletado] = useState(false); // Nueva variable de estado

 





  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleShowCardForm = () => {
    setShowCardForm(true);
  };
  const cerrarCardForm = () => {
    setShowCardForm(false);
  };
  const HacerClick = () => {
    if (cart.length > 0) {
      setMostrarModal(true);
    }
  };
  const CerrarModalDespuesDePago = () => {
 
    setMostrarModal(false);
    setShowCardForm(false);
    setPagoCompletado(true); // Actualizar el estado después de un pago exitoso

  };
  const CerrarModal = () => {
    setMostrarModal(false);
    setShowCardForm(false); 

  };
  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <>
      <div  style={{ maxWidth: '600px', margin: '0 auto', padding: '20px',}}>
        <div>
          <div style={{ marginTop: '10px', fontSize: '18px' }}>Productos en el carrito: {quantity}</div>
          {cart.length > 0 ? (
          <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', fontSize: '18px', 
                  marginTop:'10px'}}>
                    <img
                      src={`data:image/png;base64,${item.image}`} 
                      alt={`Imagen de ${item.Name}`}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    {item.Name} - Cantidad: {item.quantity} - Precio: ${item.price}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '10px', fontSize: '18px' }}>Total: ${totalPrice}</div>
            <div style={{display: 'flex', justifyContent: 'end' }}>
              <Button 
              onClick={HacerClick}
              style={{
                marginTop: '20px',
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >Hacer pedido</Button>
            </div>
            </>
             ) : (
              <div style={{ marginTop: '20px', fontSize: '18px' }}>No hay productos en el carrito.</div>
            )}
        </div>
      </div>

    <Modal show={MostrarModal} onHide={CerrarModal} size="lg" >
      <Modal.Header closeButton  style={{ borderBottom: 'none' }}>
      </Modal.Header>
      <Row>
        <Col>
        <h5>Hola ✌🏻 </h5>
          <span>Revisa tu dirección y forma de pago antes de comprar.</span>
          <div>Dirección de entrega: {selectedLocation}</div>

  
  <div style={{marginLeft:'10px',  marginTop:'10px' }}>
    <PayPal onSuccess={CerrarModalDespuesDePago}/>
  </div>
</Col>
<Col>
          <span>HOLA :D</span>
  </Col>
      </Row>
 

    </Modal>
      
    </>
  );
};

export default ShoppingCart;