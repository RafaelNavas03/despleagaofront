import React, { useContext } from "react";
import {Card, Modal, Button} from 'react-bootstrap';
import { CartContext } from "../context/CarritoContext";

const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <div  style={{ maxWidth: '600px', margin: '0 auto', 
     padding: '20px',
   
}}>
      <div>
        <div style={{ marginTop: '10px', fontSize: '18px' }}>Productos en el carrito: {quantity}</div>
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
      </div>
    </div>
  );
};

export default ShoppingCart;