import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Avatar, Select, Pagination, Input } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const RealizarPedidoMesa = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]); // Agregamos estado para los productos
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Número de elementos por página
  const [cantidadProductos, setCantidadProductos] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cliente/ver_clientes/")
      .then((response) => response.json())
      .then((data) => setClientes(data.clientes))
      .catch((error) => console.error("Error fetching clientes:", error));

    fetch("http://127.0.0.1:8000/producto/listar/")
      .then((response) => response.json())
      .then((data) => setProductos(data.productos))
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  const columnsClientes = [
    {
      title: "Cliente",
      dataIndex: "snombre",
      key: "cliente",
      render: (text, record) => (
        <>
          <Avatar icon={<UserOutlined />} />
          <span
            style={{ marginLeft: 8 }}
          >{`${record.snombre} ${record.capellido}`}</span>
        </>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "ctelefono",
      key: "ctelefono",
    },
    {
      title: "Acción",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleSelectCliente(record)}>
          Seleccionar
        </Button>
      ),
    },
  ];

  const columnsProductos = [
    {
      title: "Nombre",
      dataIndex: "nombreproducto",
      key: "nombreproducto",
    },
    {
      title: "Precio",
      dataIndex: "preciounitario",
      key: "preciounitario",
    },
    {
      title: "Puntos",
      dataIndex: "puntosp",
      key: "puntosp",
    },
    {
      title: "Imagen",
      dataIndex: "imagenp",
      key: "imagenp",
      render: (text) => (
        <Avatar
          src={`data:image/jpeg;base64,${text}`} // Asegúrate de que el formato de la imagen sea correcto
          size={64}
          shape="square"
        />
      ),
    },
    {
      title: "Cantidad",
      dataIndex: "id_producto",
      key: "cantidad",
      render: (idProducto) => (
        <Input
          type="number"
          min={0}
          value={cantidadProductos[idProducto] || 0}
          onChange={(e) => handleCantidadChange(idProducto, e.target.value)}
        />
      ),
    },
  ];

  const handleCantidadChange = (idProducto, cantidad) => {
    // Actualizar el estado de cantidadProductos
    setCantidadProductos((prevCantidadProductos) => ({
      ...prevCantidadProductos,
      [idProducto]: cantidad,
    }));
  };

  const handleSelectCliente = (cliente) => {
    // Puedes manejar la lógica de selección del cliente aquí
    console.log("Cliente seleccionado:", cliente);
  };

  const handleTipoPedidoChange = (value) => {
    // Puedes manejar la lógica de cambio de tipo de pedido aquí
    console.log("Tipo de pedido seleccionado:", value);
  };

  const handleMetodoPagoChange = (value) => {
    // Puedes manejar la lógica de cambio de método de pago aquí
    console.log("Método de pago seleccionado:", value);
  };

  const handleEstadoPedidoChange = (value) => {
    // Puedes manejar la lógica de cambio de estado del pedido aquí
    console.log("Estado del pedido seleccionado:", value);
  };

  const paginatedData = clientes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Modal
      visible={visible}
      title="Realizar Pedido"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          <ShoppingOutlined /> Realizar Pedido
        </Button>,
      ]}
    >
      <Form form={form}>
        <Table
          dataSource={paginatedData}
          columns={columnsClientes}
          rowKey="id_cliente"
          pagination={false}
        />
        <Pagination
          current={currentPage}
          total={clientes.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16, textAlign: "center" }}
        />
        <Form.Item label="Tipo de pedido" name="tipo_de_pedido">
          <Select
            placeholder="Selecciona el tipo de pedido"
            style={{ width: "100%" }}
            onChange={handleTipoPedidoChange}
          >
            <Option value="D">A domicilio</Option>
            <Option value="R">A retirar</Option>
            <Option value="L">En local</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Método de pago" name="metodo_de_pago">
          <Select
            placeholder="Selecciona el método de pago"
            style={{ width: "100%" }}
            onChange={handleMetodoPagoChange}
          >
            <Option value="E">En efectivo</Option>
            <Option value="T">Transferencia</Option>
            <Option value="X">Tarjeta</Option>
            <Option value="F">Fraccionado</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Estado del pedido" name="estado_del_pedido">
          <Select
            placeholder="Selecciona el estado del pedido"
            style={{ width: "100%" }}
            onChange={handleEstadoPedidoChange}
          >
            <Option value="O">Ordenado</Option>
            <Option value="P">En proceso</Option>
            <Option value="C">En Camino</Option>
            <Option value="E">Pedido Entregado</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Fecha de pedido"
          name="fecha_pedido"
          initialValue={dayjs().format("YYYY-MM-DD HH:mm:ss")}
        >
          <Input readOnly />
        </Form.Item>
        {/* Sección para mostrar productos */}
        <Table
          dataSource={productos}
          columns={columnsProductos}
          rowKey="id_producto"
          pagination={false}
        />
      </Form>
    </Modal>
  );
};
export default RealizarPedidoMesa;