import React, { useState, useEffect } from 'react';
import { Space, Table, Form, Card, Input, Pagination, Button, Select, Modal, Upload, Tooltip, Badge, Segmented, Avatar, Checkbox, notification, Drawer, Divider, Watermark, message } from 'antd';
import { Row, Col } from 'react-bootstrap';
import CrearBodegaForm from './crearbodega';
import imgmesas from './res/imgmesas.png';

const EditarBodegaForm = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [bodegas, setBodegas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingBodega, setEditingBodega] = useState(null);
    const [form] = Form.useForm();
    const [selectedOpcion, setSelectedOpcion] = useState('Bodegas');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [openp, setOpenp] = useState(false);
    const columns = [
        {
            title: 'ID de Sucursal',
            dataIndex: 'id_sucursal',
            key: 'id_sucursal',
        },
        {
            title: 'Nombre de la Bodega',
            dataIndex: 'nombrebog',
            key: 'nombrebog',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditar(record)}>Editar</Button>
                </Space>
            ),
        },
    ];
    const onClosep = () => {
        setOpenp(false);
    };

    const Changueopcion = (value) => {
        setSelectedOpcion(value);
    }

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
        cargarBodegas(currentPage); // Reemplazado fetchData con cargarBodegas
        setEditingBodega(null);
        //setInitialFormValues(null); // Asegúrate de que setInitialFormValues esté definida
        setEditModalVisible(false);
    };
    
    const handleGuardar = async () => {
        try {
            if (!editingBodega) {
                console.error('No se ha seleccionado ninguna bodega para editar.');
                return;
            }

            const values = await form.validateFields();
            const response = await fetch(`http://127.0.0.1:8000/bodega/editar/${editingBodega.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                message.success(data.mensaje);
                setVisible(false);
                setEditingBodega(null);
            } else {
                const data = await response.json();
                message.error(data.error || 'Error al editar la bodega');
            }
        } catch (error) {
            console.error('Error al editar la bodega:', error);
        }
    };



    const cargarBodegas = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/bodega/listar/');
            const data = await response.json();
            setBodegas(data.bodegas);
        } catch (error) {
            console.error('Error al obtener la lista de bodegas:', error);
        }
    };

    useEffect(() => {
        form.resetFields();
        if (!editModalVisible) {
            cargarBodegas(currentPage);
        }
    }, []);

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
                            }
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
                                <Table columns={columns} dataSource={bodegas} rowKey="id" />
                                <Modal
                                    title="Editar Bodega"
                                    visible={visible}
                                    onCancel={handleCancelar}
                                    onOk={handleGuardar}
                                    okText="Guardar"
                                    cancelText="Cancelar"
                                >
                                    <Form form={form} layout="vertical">
                                        <Form.Item label="Nombre de la Bodega" name="nombrebog">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Descripción" name="descripcion">
                                            <Input.TextArea />
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