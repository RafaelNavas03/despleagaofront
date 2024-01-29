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
        <div>Total: ${totalPrice}</div>
        <button onClick={() => console.log(cart)}>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;