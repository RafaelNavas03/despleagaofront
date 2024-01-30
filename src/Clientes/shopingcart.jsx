import React, { useContext } from "react";

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
    <div >
      <div>
        <div>Items in cart: {quantity}</div>
         <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img
                src={`data:image/png;base64,${item.image}`} // Ajusta la propiedad correspondiente
                alt={`Imagen de ${item.Name}`}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              {item.Name} - Cantidad: {item.quantity} - Precio: ${item.price}
            </li>
          ))}
        </ul>
        <div>Total: ${totalPrice}</div>
       
        <button onClick={() => console.log(cart)}>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;