import React, { useState, useEffect } from 'react';
import { Space, Table, Form, Card, Input, Pagination, Button, Select, Modal, Upload, Tooltip, Badge, Segmented, Avatar, Checkbox, notification, Drawer, Divider, Watermark, message } from 'antd';
import { Row, Col } from 'react-bootstrap';
import CrearBodegaForm from './crearbodega';
import imgmesas from './res/imgmesas.png';

const EditarBodegaForm = () => {
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [bodegas, setBodegas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingBodega, setEditingBodega] = useState(null);
    const [form] = Form.useForm();
    const [selectedOpcion, setSelectedOpcion] = useState('Bodegas');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [openp, setOpenp] = useState(false);

    const onClosep = () => {
        setOpenp(false);
    };

    const Changueopcion = (value) => {
        setSelectedOpcion(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const showDrawerp = () => {
        setOpenp(true);
    };

    const handleEditar = (record) => {
        form.setFieldsValue(record);
        setEditingBodega(record.id ? record : null);
        setVisible(true);
        setEditModalVisible(true);
    };

    const handleCancelar = () => {
        fetchData(currentPage);
        setEditingProductId(null);
        setInitialFormValues(null);
        setEditModalVisible(false);
    };
    
    const manejarEdicion = async () => {
        try {
            const valores = await form.validateFields();
            const idBodega = editingBodega.id_bodega; // Cambiado a id_bodega
    
            await fetch(`http://127.0.0.1:8000/bodega/editar/${idBodega}/`, {
                method: 'POST',
                body: new URLSearchParams({
                    nombrebog: valores.nombrebog,
                    descripcion: valores.descripcion,
                    id_sucursal: valores.id_sucursal,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            // Actualizar la tabla después de la edición
            cargarBodegas();
            setModalEditarVisible(false);
    
            // Mostrar mensaje de éxito
            message.success('Bodega editada exitosamente');
        } catch (error) {
            console.error('Error al editar la bodega:', error);
            // Mostrar mensaje de error
            message.error('Error al editar la bodega');
        }
    };

    const cargarBodegas = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/bodega/listar/?page=${currentPage}`);
            const data = await response.json();
            setBodegas(data.bodegas);
            setTotal(data.total);
        } catch (error) {
            console.error('Error al obtener la lista de bodegas:', error);
        }
    };

    useEffect(() => {
        form.resetFields();
        if (!editModalVisible) {
            cargarBodegas(currentPage);
        }
    }, [bodegas]);

    return (
        <div>
            <Row>
                <Col md={12}>
                    <Segmented
                        options={[
                            {
                                label: (
                                    <Tooltip title="Bodegas">
                                        <div style={{ padding: 4 }}>
                                            <Avatar shape="square" src={imgmesas} size="large" />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Bodegas',
                            },
                        ]}
                        value={selectedOpcion}
                        onChange={Changueopcion}
                    />
                </Col>
                {selectedOpcion === 'Bodegas' && (
                    <>
                        <Divider>Control bodegas</Divider>
                        <Col md={12}>
                            <Button type="primary" style={{ width: '100%', margin: '2%' }} onClick={showDrawerp}>
                                Crear nueva bodega
                            </Button>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Table dataSource={bodegas} columns={columnas} rowKey="id_sucursal" />

                                <Modal
                                    title="Editar Bodega"
                                    visible={modalEditarVisible}
                                    onOk={manejarEdicion}
                                    onCancel={() => setModalEditarVisible(false)}
                                >
                                    <Form form={form}>
                                        <Form.Item label="Nombre" name="nombrebog" rules={[{ required: true, message: 'Por favor, ingrese el nombre' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Descripción" name="descripcion" rules={[{ required: true, message: 'Por favor, ingrese la descripción' }]}>
                                            <Input />
                                        </Form.Item>
                                        {/* Campo oculto para id_sucursal */}
                                        <Form.Item name="id_sucursal" style={{ display: 'none' }}>
                                            <Input type="hidden" />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </Row>
                            <Pagination current={currentPage} total={total} onChange={handlePageChange} pageSize={8} style={{ marginTop: '16px', textAlign: 'center' }} />
                        </Col>
                    </>
                )}
            </Row>
            <Drawer
                title="Crear Bodega"
                width={720}
                onClose={onClosep}
                open={openp}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <CrearBodegaForm />
            </Drawer>
        </div>
    );
};

export default EditarBodegaForm;
