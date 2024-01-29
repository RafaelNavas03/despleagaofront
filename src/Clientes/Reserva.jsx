import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, DatePicker, Select, Space, Modal, Button } from 'antd';

const { Option } = Select;

const MostrarMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pageSize = 8; // Número de tarjetas por página

  const obtenerMesas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Mesas/ver_mesas/');
      if (!response.ok) {
        throw new Error('Error al obtener las mesas');
      }

      const data = await response.json();
      setMesas(data.mesas.filter(mesa => mesa.activa === '1'));
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  useEffect(() => {
    obtenerMesas();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (mesa) => {
    setSelectedMesa(mesa);
    setModalVisible(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (value) => {
    setSelectedHour(value);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleReserveClick = () => {
    // Agrega lógica para realizar la reserva aquí
    console.log('Reservar mesa', selectedMesa.id_mesa);
    console.log('Fecha seleccionada', selectedDate && selectedDate.format('YYYY-MM-DD'));
    console.log('Hora seleccionada', selectedHour);

    // Cerrar el modal después de la reserva
    setModalVisible(false);
  };

  const paginatedMesas = mesas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Determinar el tamaño de las columnas de acuerdo al tamaño de la fila
  let colSize = Math.floor(24 / Math.min(paginatedMesas.length, 3));

  return (
    <>
      <Row gutter={16}>
        {paginatedMesas.map((mesa) => (
          <Col key={mesa.id_mesa} xs={24} sm={colSize} md={colSize} lg={colSize} style={{ marginBottom: '16px' }}>
            <Card title={`Mesa ${mesa.id_mesa}`} onClick={() => handleCardClick(mesa)}>
              <p>Observación: {mesa.observacion}</p>
              <p>Estado: {mesa.estado}</p>
              <p>Activa: {mesa.activa === '1' ? 'Sí' : 'No'}</p>
              <p>Máx. Personas: {mesa.max_personas}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        total={mesas.length}
        onChange={handlePageChange}
        pageSize={pageSize}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />

      <Modal
        title={`Reservar Mesa ${selectedMesa && selectedMesa.id_mesa}`}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleReserveClick}>
            Reservar
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <DatePicker onChange={handleDateChange} placeholder="Seleccione una fecha" style={{ marginBottom: '8px' }} />
          <Select onChange={handleHourChange} placeholder="Seleccione una hora" style={{ width: '100%', marginBottom: '16px' }}>
            <Option value="09:00">09:00 AM</Option>
            <Option value="12:00">12:00 PM</Option>
            <Option value="18:00">06:00 PM</Option>
          </Select>
          <p>Fecha seleccionada: {selectedDate && selectedDate.format('YYYY-MM-DD')}</p>
          <p>Hora seleccionada: {selectedHour}</p>
        </Space>
      </Modal>
    </>
  );
};

export default MostrarMesas;
