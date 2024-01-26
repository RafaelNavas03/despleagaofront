import React, { useState, useEffect } from 'react';
import { Card, Row, Col, message, Drawer, InputNumber, Select, Button } from 'antd';

const { Option } = Select;

const CocinaFuncion = ({ componente }) => {
    const [cantidad, setCantidad] = useState(1);
    const [bodega, setBodega] = useState('');
    const [costoTotal, setCostoTotal] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [bodegas, setBodegas] = useState([]);

    useEffect(() => {
        console.log(componente);
        fetch('http://127.0.0.1:8000/bodega/listar/')
            .then(response => response.json())
            .then(data => setBodegas(data.bodegas))
            .catch(error => console.error('Error fetching bodegas:', error)); if (componente && componente.detalle) {
                const initialItems = componente.detalle.detalle.map(item => ({
                    key: item.id_componentehijo.id.toString(),
                    title: item.id_componentehijo.nombre,
                    quantity: item.cantidadhijo,
                }));
                setSelectedItems(initialItems);
                const costoIndividual = componente.costo || 0; // Asegúrate de tener la propiedad correcta
                setCostoTotal(cantidad * costoIndividual);
            }
    }, [cantidad, componente]);

    const handlePreparar = () => {
        // Lógica para preparar el componente
        // Puedes enviar la información relevante a tu backend aquí
        message.success(`Preparando ${cantidad} ${componente.nombre} en ${bodega}`);
    };



    return (
        <>
            <Row>
                {componente && (
                    <Col md={24}>
                        <>
                            <Row>
                                {componente.detalle && (
                                    <Col md={12} style={{ padding: '2%' }}>

                                        <Card title={`Ensamble de ${componente.nombre}`} style={{ minHeight: '500px' }}>
                                            <p>Para preparar {componente.detalle.padrecant} </p>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Nombre</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedItems.map(item => (
                                                        <tr key={item.key}>
                                                            <td>-</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                {item.quantity}

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Card>


                                    </Col>
                                )}
                                <Col md={12} style={{ padding: '2%' }}>
                                    <Card title="Preparación" style={{ minHeight: '300px', marginTop: '16px' }}>
                                        <label>Cantidad: </label>
                                        <InputNumber
                                            min={1}
                                            value={cantidad}
                                            onChange={(value) => setCantidad(value)}
                                            style={{ marginRight: '16px' }}
                                        />
                                        <br />
                                        <label>Bodega:</label>
                                        <Select
                                            style={{ width: '100%', marginBottom: '16px' }}
                                            value={bodega || (bodegas.length > 0 ? bodegas[0].nombrebog : null)}
                                            onChange={(value) => setBodega(value)}
                                        >
                                            {bodegas.map(bodega => (
                                                <Option key={bodega.id_bodega} value={bodega.nombrebog}>
                                                    {bodega.nombrebog}
                                                </Option>
                                            ))}
                                        </Select>
                                        <br />

                                        <Button type="primary" onClick={handlePreparar}>
                                            Preparar
                                        </Button>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                        <table className="table" border={'1px'}>


                        </table>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default CocinaFuncion;
