import {Card, Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect, useContext  } from 'react';
import NavBar from './NavBar';
import { Navbar2 } from './navbar2';
import Item from './item2';
import { CartContext } from "../context/CarritoContext";




const ListProductos =()=>{

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const [selectedProduct, setSelectedProduct] = useState(null);




    useEffect(() => {
        // Realizar la solicitud a la API al montar el componente
        fetch('http://127.0.0.1:8000/producto/listar/')
          .then(response => response.json())
          .then(data => setProducts(data.productos))
          .catch(error => console.error('Error fetching products:', error));
      }, []);

      const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

      const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
  setCart((currItems) => {
    const isItemFound = currItems.find((item) => item.id === products.id_producto);

    if (isItemFound) {
      return currItems.map((item) => {
        if (item.id === products.id_producto) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else {
      return [
        ...currItems,
        {
          id: products.id_producto,
          quantity: 1,
          price: parseFloat(selectedProduct.preciounitario),
        },
      ];
    }
  });
};


  const removeItem = () => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === products.id_producto)?.quantity === 1) {
        return currItems.filter((item) => item.id !== products.id_producto);
      } else {
        return currItems.map((item) => {
          if (item.id === products.id_producto) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = () => {
    return cart.find((item) => item.id === products.id_producto)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById();

    return(
        <>
        <NavBar/>
    
        <div style={{ marginTop: '30px', marginLeft: '50px' }}>
          {products.map((product) => (
            <Card
              key={product.id}
              style={{ width: '18rem', cursor: 'pointer' }}
              onClick={() => handleCardClick(product)}
            >
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${product.imagenp}`}
                alt={`Imagen de ${product.nombreproducto}`}
                style={{ width: '100%', height: '270px' }}
              />
              <Card.Body>
                <Card.Title>{product.nombreproducto}</Card.Title>
                <Card.Text>{product.descripcionproducto}</Card.Text>
                <Card.Text>{`$${product.preciounitario}`}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
  
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct && selectedProduct.nombreproducto}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <>
                <img
                  src={`data:image/png;base64,${selectedProduct.imagenp}`}
                  alt={`Imagen de ${selectedProduct.nombreproducto}`}
                  style={{ width: '100%', height: '340px' }}
                />
                <p>{selectedProduct.descripcionproducto}</p>
                <p>{`$${selectedProduct.preciounitario}`}</p>


                <div style={{display:'flex'}}>
                        {quantityPerItem > 0 && (
                          <div style={{padding:'10px'}}>{quantityPerItem}</div>
                        )}


                        {quantityPerItem === 0 ? (
                          <Button onClick={() => addToCart()}>
                            + Añadir al carrito
                          </Button>
                        ) : (
                          <Button  onClick={() => addToCart()}>
                            + Añadir mas
                          </Button>
                        )}

                        {quantityPerItem > 0 && (
                          <Button style={{marginLeft:'10px'}} onClick={() => removeItem()}>
                            - Quitar 
                          </Button>
                        )}
                  </div>
              </>
            )}
                 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          
          </Modal.Footer>
        </Modal>


      </>
    )
}




export default ListProductos;