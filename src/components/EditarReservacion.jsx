import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';

const EditarReservacionesForm = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReservacion, setEditingReservacion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    cargarReservaciones();
  }, []);

  const cargarReservaciones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Mesas/listar_reservaciones/');
      if (!response.ok) {
        throw new Error('Error al obtener la lista de reservaciones');
      }

      const data = await response.json();
      setReservaciones(data.reservaciones);
    } catch (error) {
      console.error('Error al obtener la lista de reservaciones:', error);
    }
  };

  const mostrarModalEditar = (reservacion) => {
    setEditingReservacion(reservacion);
    form.setFieldsValue({
      fecha_reserva: reservacion.fecha_reserva,
      hora_reserva: reservacion.hora_reserva,
      estado: reservacion.estado,
    });
    setModalVisible(true);
  };

  const handleEditarReservacion = async () => {
    try {
      const values = await form.validateFields();
      const idReservacion = editingReservacion.id_reservacion;

      const response = await fetch(`http://127.0.0.1:8000/Mesas/editar_reservacion/${idReservacion}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_reserva: values.fecha_reserva,
          hora_reserva: values.hora_reserva,
          estado: values.estado,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al editar la reservación');
      }

      cargarReservaciones();
      setModalVisible(false);
      message.success('Reservación editada exitosamente');
    } catch (error) {
      console.error('Error al editar la reservación:', error);
      message.error('Error al editar la reservación');
    }
  };

  const columnas = [
    {
      title: 'ID de Reservación',
      dataIndex: 'id_reservacion',
      key: 'id_reservacion',
    },
    {
      title: 'Fecha de Reservación',
      dataIndex: 'fecha_reserva',
      key: 'fecha_reserva',
    },
    {
      title: 'Hora de Reservación',
      dataIndex: 'hora_reserva',
      key: 'hora_reserva',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (_, reservacion) => (
        <Space>
          <Button type="primary" onClick={() => mostrarModalEditar(reservacion)}>
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={reservaciones} columns={columnas} rowKey="id_reservacion" />

      <Modal
        title="Editar Reservación"
        visible={modalVisible}
        onOk={handleEditarReservacion}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            label="Fecha de Reservación"
            name="fecha_reserva"
            rules={[{ required: true, message: 'Por favor, ingrese la fecha de reservación' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hora de Reservación"
            name="hora_reserva"
            rules={[{ required: true, message: 'Por favor, ingrese la hora de reservación' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Por favor, ingrese el estado de la reservación' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditarReservacionesForm;
