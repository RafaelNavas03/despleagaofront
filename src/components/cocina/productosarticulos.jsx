import React, { useState, useEffect } from 'react';
import { Card, Row, Col, message } from 'antd';

const ProductosCocina = ({ idcategoria }) => {
    const [productosData, setProductos] = useState([]);
    const [componentesData, setComponentes] = useState([]);
    const [loading, setLoading] = useState(false);

    const listarProductos = async () => {
        try {
            // Obtener todos los productos de la API
            const responseProductos = await fetch('http://127.0.0.1:8000/producto/listar/');
            const data = await responseProductos.json();

            if (data && Array.isArray(data.productos)) {
                const productosFiltrados = idcategoria
                    ? data.productos.filter(producto => producto.id_categoria === idcategoria)
                    : data.productos;
                setProductos(productosFiltrados);  // Corregido: usar productosFiltrados en lugar de data.productos
            } else {
                message.error('La respuesta de la API de productos no tiene el formato esperado.');
            }
        } catch (error) {
            message.error('Hubo un error al realizar la solicitud de productos' + error);
        } finally {
            setLoading(false);
        }
    };

    const listarComponentes = async () => {
        try {
            // Obtener todos los componentes de la API
            const responseComponentes = await fetch('http://127.0.0.1:8000/producto/listarcomponentes/');
            const data = await responseComponentes.json();

            if (data && Array.isArray(data.componentes)) {
                console.log('categoria enviada:'+idcategoria);
                const componentesFiltrados = idcategoria
                    ? data.componentes.filter(componente => componente.id_categoria.id_categoria === idcategoria)
                    : data.componentes;
                setComponentes(componentesFiltrados);
            } else {
                message.error('La respuesta de la API de componentes no tiene el formato esperado.');
            }
        } catch (error) {
            message.error('Hubo un error al realizar la solicitud de componentes' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarProductos();
        listarComponentes();
    }, [idcategoria]); // No es necesario agregar dependencias

    const renderCards = (data, isComponente) => {
        if (!Array.isArray(data)) {
            return null; // o algún otro comportamiento por defecto
        }
        
        return data.map((item, index) => (
            <Col key={index} md={5} style={{ marginBottom: '16px', margin: '0.5%', width: '100%' }}>
                <Card
                    hoverable
                    title={item.nombre || item.nombreproducto}
                    style={{ borderLeft: `7px solid ${getColor(index)}`, borderRadius: '8px' }}
                >
                    <p>{item.descripcion || 'Sin descripción'}</p>
                    <p>{isComponente ? `Tipo: Componente` : `Tipo: Producto`}</p>
                </Card>
            </Col>
        ));
    };

    const getColor = (index) => {
        const colors = ['#722ed1', '#faad14', '#f5222d', '#52c41a', '#1890ff'];
        return colors[index % colors.length];
    };

    return (
        <>
            <Row>
                {renderCards(productosData, false)}
                {renderCards(componentesData, true)}
            </Row>
        </>
    );
};

export default ProductosCocina;
