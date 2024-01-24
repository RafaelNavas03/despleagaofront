import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Select,
  DatePicker,
  Input,
  InputNumber,
  message,
} from "antd";

const { Option } = Select;

const RealizarPedido = ({ visible, onClose }) => {
  const [proveedores, setProveedores] = useState([]);
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [productos, setProductos] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const responseProveedores = await fetch(
          "http://127.0.0.1:8000/Proveedores/listar_proveedor/"
        );
        const dataProveedores = await responseProveedores.json();
        setProveedores(dataProveedores.proveedores);
      } catch (error) {
        console.error("Error al obtener la lista de proveedores:", error);
      }
    };

    const obtenerUnidadesMedida = async () => {
      try {
        const responseUnidadesMedida = await fetch(
          "http://127.0.0.1:8000/producto/listarum/"
        );
        const dataUnidadesMedida = await responseUnidadesMedida.json();
        setUnidadesMedida(dataUnidadesMedida.unidades_medida);
      } catch (error) {
        console.error(
          "Error al obtener la lista de unidades de medida:",
          error
        );
      }
    };

    const obtenerProductos = async () => {
      try {
        const responseProductos = await fetch(
          "http://127.0.0.1:8000/producto/listar/"
        );
        const dataProductos = await responseProductos.json();
        setProductos(dataProductos.productos);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    };

    const obtenerComponentes = async () => {
      try {
        const responseComponentes = await fetch(
          "http://127.0.0.1:8000/producto/listarcomponentes/"
        );
        const dataComponentes = await responseComponentes.json();
        setComponentes(dataComponentes.componentes);
      } catch (error) {
        console.error("Error al obtener la lista de componentes:", error);
      }
    };

    obtenerProveedores();
    obtenerUnidadesMedida();
    obtenerProductos();
    obtenerComponentes();
  }, []);

  const handleTipoSeleccionadoChange = (value) => {
    setTipoSeleccionado(value);
    form.setFieldsValue({
      id_producto: undefined,
      id_componente: undefined,
    });
  };

  const onFinish = (values) => {
    console.log("Detalles del Pedido:", values.detalles_pedido);
    handlePedidoSubmit(values);
    onClose();
  };

  const realizarPedido = async (bodega) => {
    setModalPedidoVisible(true);
    setModalRealizarPedidoVisible(true);
  };

  const handlePedidoSubmit = async (pedidoData) => {
    try {
      const idBodega = bodega.id_bodega; // Obtener el ID de la bodega actual
      const response = await fetch(
        `http://127.0.0.1:8000/Inventario/crearinventario/${idBodega}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedidoData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        message.success(data.mensaje);
      } else {
        const data = await response.json();
        message.error(data.error);
      }

      // Cerrar los modales después de enviar el pedido
      setModalPedidoVisible(false);
      setModalRealizarPedidoVisible(false);
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      message.error("Error al realizar el pedido");
    }
  };

  return (
    <Modal
      title="Realizar Pedido"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Enviar Pedido
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Proveedor"
          name="id_proveedor"
          rules={[{ required: true, message: "Seleccione un proveedor" }]}
        >
          <Select placeholder="Seleccione un proveedor">
            {proveedores.map((proveedor) => (
              <Option
                key={proveedor.id_proveedor}
                value={proveedor.id_proveedor}
              >
                {proveedor.nombreproveedor}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha del Pedido" name="fecha_pedido">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="Fecha de Entrega Esperada"
          name="fecha_entrega_esperada"
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="Tipo de Pedido"
          name="tipo_pedido"
          rules={[{ required: true, message: "Seleccione el tipo de pedido" }]}
        >
          <Select
            placeholder="Seleccione el tipo de pedido"
            onChange={handleTipoSeleccionadoChange}
          >
            <Option value="producto">Producto</Option>
            <Option value="componente">Componente</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Detalles del Pedido"
          name="detalles_pedido"
          rules={[
            {
              required: true,
              message: "Ingrese al menos un detalle de pedido",
              validator: (_, value) => {
                if (!tipoSeleccionado) {
                  return Promise.reject("Seleccione el tipo de pedido");
                }

                if (tipoSeleccionado === "producto" && !value?.id_producto) {
                  return Promise.reject("Seleccione un producto");
                }

                if (
                  tipoSeleccionado === "componente" &&
                  !value?.id_componente
                ) {
                  return Promise.reject("Seleccione un componente");
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          {tipoSeleccionado === "producto" && (
            <>
              <Form.Item
                label="Producto"
                name="id_producto"
                rules={[{ required: true, message: "Seleccione un producto" }]}
              >
                <Select placeholder="Seleccione un producto">
                  {productos.map((producto) => (
                    <Option
                      key={producto.id_producto}
                      value={producto.id_producto}
                    >
                      {producto.nombreproducto}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
          {tipoSeleccionado === "componente" && (
            <>
              <Form.Item
                label="Componente"
                name="id_componente"
                rules={[
                  { required: true, message: "Seleccione un componente" },
                ]}
              >
                <Select placeholder="Seleccione un componente">
                  {componentes.map((componente) => (
                    <Option
                      key={componente.id_componente}
                      value={componente.id_componente}
                    >
                      {componente.nombre}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Unidad de Medida"
            name="id_um"
            rules={[
              { required: true, message: "Seleccione una unidad de medida" },
            ]}
          >
            <Select placeholder="Seleccione una unidad de medida">
              {unidadesMedida.map((um) => (
                <Option key={um.id_um} value={um.id_um}>
                  {um.nombre_um}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="cantidad_pedido"
            rules={[{ required: true, message: "Ingrese la cantidad" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Costo Unitario"
            name="costo_unitario"
            rules={[{ required: true, message: "Ingrese el costo unitario" }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>{" "}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RealizarPedido;