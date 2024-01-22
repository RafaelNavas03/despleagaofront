import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, message, Tooltip, Popconfirm } from 'antd';
import { EditTwoTone, DeleteFilled } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Importa los íconos necesarios

const TipoProducto = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setTiposProductos] = useState([]);
  const [tipoProductoId, setTipoProductoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [opentp, setOpentp] = useState(false);
  const [openetp, setOpenetp] = useState(false);
  const [searchText, setSearchText] = useState('');

  const listarp = async () => {
    try {
      fetch('http://127.0.0.1:8000/producto/listarproductos/')
        .then((response) => response.json())
        .then((data) => setTiposProductos(data.tipos_productos))
        .catch((error) => console.error('Error fetching tipos de productos:', error));
    } catch (error) {
      message.error('Hubo un error al realizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listarp();
  }, []);

  const renderCards = () => {
    return data.map((tipoProducto, index) => (
      <Col key={index} md={8} lg={6} xl={4} style={{ marginBottom: '16px' }}>
        <Card
          hoverable
          title={tipoProducto.tpnombre}
          style={{ borderLeft: `7px solid ${getColor(index)}`, borderRadius: '8px' }}
        >
          <p>{tipoProducto.descripcion || 'Sin descripción'}</p>
        </Card>
      </Col>
    ));
  };

  const getColor = (index) => {
    const colors = ['#1890ff', '#f5222d', '#52c41a', '#faad14', '#722ed1']; 
    return colors[index % colors.length];
  };

  return (
    <Row gutter={[16, 16]}>
      {renderCards()}
    </Row>
  );
};

export default TipoProducto;