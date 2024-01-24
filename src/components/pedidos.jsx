import React from "react";
import {
  Form,
  Select,
  DatePicker,
  Input,
  Checkbox,
  Row,
  Col,
  Modal,
} from "antd";

const DetallesPedidoForm = ({
  proveedores,
  componentes,
  productos,
  modalPedidoVisible,
  setModalPedidoVisible,
  handleCheckboxChange,
  isProductoSelected,
  isComponenteSelected,
}) => {
  // Resto del código
  return (
    <Form>
      <Modal
        title="Realizar Pedido"
        visible={modalPedidoVisible}
        onOk={() => {
          setModalPedidoVisible(false);
        }}
        onCancel={() => setModalPedidoVisible(false)}
      >
        <Form>
          <Form.Item
            label="Seleccionar Proveedor"
            name="proveedor"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un proveedor",
              },
            ]}
          >
            <Select>
              {proveedores.map((proveedor) => (
                <Select.Option
                  key={proveedor.id_proveedor}
                  value={proveedor.id_proveedor}
                >
                  {proveedor.nombreproveedor}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha de Pedido"
            name="fechaPedido"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la fecha de pedido",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(date) =>
                setFechaPedido(date ? date.toISOString() : "")
              }
            />
          </Form.Item>

          <Form.Item
            label="Fecha de Entrega Esperada"
            name="fechaEntregaEsperada"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la fecha de entrega esperada",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(date) =>
                setFechaEntregaEsperada(date ? date.toISOString() : "")
              }
            />
          </Form.Item>

          <Form.Item
            label="Observación del Pedido"
            name="observacionPedido"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la observación del pedido",
              },
            ]}
          >
            <Input.TextArea
              onChange={(e) => setObservacionPedido(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Detalles del Pedido"
            name="detalles_pedidos"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un detalle del pedido",
              },
            ]}
          >
            <Checkbox.Group>
              <Row>
                <Col span={12}>
                  <Checkbox.Group onChange={handleCheckboxChange}>
                    <Checkbox value="producto" disabled={isComponenteSelected}>
                      Producto
                    </Checkbox>
                    <Checkbox value="componente" disabled={isProductoSelected}>
                      Componente
                    </Checkbox>
                  </Checkbox.Group>
                  {isComponenteSelected && (
                    <Form.Item
                      label="Seleccionar Componente"
                      name="componente"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, seleccione un componente",
                        },
                      ]}
                    >
                      <Select>
                        {componentes.map((componente) => (
                          <Select.Option
                            key={componente.id_componente}
                            value={componente.id_componente}
                          >
                            {componente.nombre}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {isProductoSelected && (
                    <Form.Item
                      label="Seleccionar Producto"
                      name="producto"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, seleccione un producto",
                        },
                      ]}
                    >
                      <Select>
                        {productos.map((producto) => (
                          <Select.Option
                            key={producto.id_producto}
                            value={producto.id_producto}
                          >
                            {producto.nombreproducto}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>{" "}
    </Form>
  );
};

export default DetallesPedidoForm;
