import {Card, Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect, Drawer  } from 'react';
import NavBar from './NavBar';





const ListProductos =()=>{
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { carrito, agregarAlCarrito } = useCarritoContext(); 



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
              </>
            )}
                 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleAgregarAlCarrito}>
            Agregar al Carrito
          </Button>
          </Modal.Footer>
        </Modal>


      </>
    )
}




export default ListProductos;