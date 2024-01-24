import React, { useState, useEffect } from "react";
import {
  InputNumber,
  DatePicker,
  Space,
  Table,
  Form,
  Card,
  Input,
  Pagination,
  Button,
  Select,
  Modal,
  Upload,
  Tooltip,
  Badge,
  Segmented,
  Avatar,
  Checkbox,
  notification,
  Drawer,
  Divider,
  Watermark,
  message,
} from "antd";
import { Row, Col } from "react-bootstrap";
import CrearBodegaForm from "./crearbodega";
import imgmesas from "./res/imgmesas.png";

const EditarBodegaForm = () => {
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [bodegas, setBodegas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingBodega, setEditingBodega] = useState(null);
  const [form] = Form.useForm();
  const [selectedOpcion, setSelectedOpcion] = useState("Bodegas");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openp, setOpenp] = useState(false);
  const [modalPedidoVisible, setModalPedidoVisible] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [isProductoSelected, setIsProductoSelected] = useState(false);
  const [isComponenteSelected, setIsComponenteSelected] = useState(false);
  const [componentes, setComponentes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const detallesPedido = form.getFieldValue("detalles_pedido");

  useEffect(() => {
    const obtenerListas = async () => {
      try {
        // Obtener lista de proveedores
        const responseProveedores = await fetch(
          "http://127.0.0.1:8000/Proveedores/listar_proveedor/"
        );
        const dataProveedores = await responseProveedores.json();
        setProveedores(dataProveedores.proveedores);

        // Obtener lista de componentes
        const responseComponentes = await fetch(
          "http://127.0.0.1:8000/producto/listarcomponentes/"
        );
        const dataComponentes = await responseComponentes.json();
        setComponentes(dataComponentes.componentes);

        // Obtener lista de unidades de medida
        const responseUnidadesMedida = await fetch(
          "http://127.0.0.1:8000/producto/listarum/"
        );
        const dataUnidadesMedida = await responseUnidadesMedida.json();
        setUnidadesMedida(dataUnidadesMedida.unidades_medida);
      } catch (error) {
        console.error(
          "Error al obtener la lista de proveedores, componentes o unidades de medida:",
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

    obtenerListas();
    obtenerProductos();
  }, []);

  const realizarPedido = async (bodega) => {
    setModalPedidoVisible(true);
  };

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

  useEffect(() => {
    cargarBodegas();
  }, [currentPage]);

  const mostrarModalEditar = (bodega) => {
    setEditingBodega(bodega);
    form.setFieldsValue({
      nombrebog: bodega.nombrebog,
      descripcion: bodega.descripcion,
      id_sucursal: bodega.id_sucursal.toString(),
    });
    setModalEditarVisible(true);
  };

  const handleCheckboxChange = (checkedValues) => {
    setIsProductoSelected(checkedValues.includes("producto"));
    setIsComponenteSelected(checkedValues.includes("componente"));
  };
  const manejarEdicion = async () => {
    try {
      const valores = await form.validateFields();
      const idBodega = editingBodega.id_bodega; // Cambiado a id_bodega

      await fetch(`http://127.0.0.1:8000/bodega/editar/${idBodega}/`, {
        method: "POST",
        body: new URLSearchParams({
          nombrebog: valores.nombrebog,
          descripcion: valores.descripcion,
          id_sucursal: valores.id_sucursal,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Actualizar la tabla después de la edición
      cargarBodegas();
      setModalEditarVisible(false);

      // Mostrar mensaje de éxito
      message.success("Bodega editada exitosamente");
    } catch (error) {
      console.error("Error al editar la bodega:", error);
      // Mostrar mensaje de error
      message.error("Error al editar la bodega");
    }
  };

  const cargarBodegas = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/bodega/listar/?page=${currentPage}`
      );
      const data = await response.json();
      setBodegas(data.bodegas);
      setTotal(data.total);
    } catch (error) {
      console.error("Error al obtener la lista de bodegas:", error);
    }
  };

  

  const columnas = [
    {
      title: "Sucursal ID",
      dataIndex: "id_sucursal",
      key: "id_sucursal",
    },
    {
      title: "Nombre",
      dataIndex: "nombrebog",
      key: "nombrebog",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (_, bodega) => (
        <>
          <Button type="primary" onClick={() => mostrarModalEditar(bodega)}>
            Editar
          </Button>
          <Button
            type="primary"
            onClick={() => realizarPedido(bodega)}
            style={{ marginLeft: "8px" }}
          >
            Realizar Pedido
          </Button>
        </>
      ),
    },
  ];

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
                value: "Bodegas",
              },
            ]}
            value={selectedOpcion}
            onChange={Changueopcion}
          />
        </Col>
        {selectedOpcion === "Bodegas" && (
          <>
            <Divider>Control bodegas</Divider>
            <Col md={12}>
              <Button
                type="primary"
                style={{ width: "100%", margin: "2%" }}
                onClick={showDrawerp}
              >
                Crear nueva bodega
              </Button>
            </Col>
            <Col md={12}>
              <Row>
                <Table
                  dataSource={bodegas}
                  columns={columnas}
                  rowKey="id_sucursal"
                />
                <Modal
                  title="Editar Bodega"
                  visible={modalEditarVisible}
                  onOk={manejarEdicion}
                  onCancel={() => setModalEditarVisible(false)}
                >
                  <Form form={form}>
                    <Form.Item
                      label="Nombre"
                      name="nombrebog"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, ingrese el nombre",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Descripción"
                      name="descripcion"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, ingrese la descripción",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {/* Campo oculto para id_sucursal */}
                    <Form.Item name="id_sucursal" style={{ display: "none" }}>
                      <Input type="hidden" />
                    </Form.Item>
                  </Form>
                </Modal>
                {/*Aqui empieza el relajo*/}
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
                      name="id_proveedor"
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
                      name="fecha_pedido"
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
                      name="fecha_entrega_esperada"
                      rules={[
                        {
                          required: true,
                          message:
                            "Por favor, ingrese la fecha de entrega esperada",
                        },
                      ]}
                    >
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(date) =>
                          setFechaEntregaEsperada(
                            date ? date.toISOString() : ""
                          )
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Observación del Pedido"
                      name="observacion_pedido"
                      rules={[
                        {
                          required: true,
                          message:
                            "Por favor, ingrese la observación del pedido",
                        },
                      ]}
                    >
                      <Input.TextArea
                        onChange={(e) => setObservacionPedido(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Detalles del Pedido"
                      name="detalles_pedido"
                      rules={[
                        {
                          required: true,
                          message:
                            "Por favor, seleccione un detalle del pedido",
                        },
                      ]}
                    >
                      <Checkbox.Group>
                        <Row>
                          <Col span={12}>
                            <Checkbox.Group onChange={handleCheckboxChange}>
                              <Checkbox
                                value="producto"
                                disabled={isComponenteSelected}
                              >
                                Producto
                              </Checkbox>
                              <Checkbox
                                value="componente"
                                disabled={isProductoSelected}
                              >
                                Componente
                              </Checkbox>
                            </Checkbox.Group>

                            {isProductoSelected && (
                              <>
                                <Form.Item
                                  label="Seleccionar Producto"
                                  name="producto"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, seleccione un producto",
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

                                <Form.Item
                                  label="Seleccionar Unidad de Medida"
                                  name="unidadMedidaProducto"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, seleccione una unidad de medida",
                                    },
                                  ]}
                                >
                                  <Select>
                                    {unidadesMedida.map((um) => (
                                      <Select.Option
                                        key={um.id_um}
                                        value={um.id_um}
                                      >
                                        {um.nombre_um}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>

                                <Form.Item
                                  label="Cantidad Disponible (Producto)"
                                  name="cantidadDisponibleProducto"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, ingrese la cantidad disponible",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>

                                <Form.Item
                                  label="Costo Unitario (Producto)"
                                  name="costoUnitarioProducto"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, ingrese el costo unitario",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </>
                            )}

                            {isComponenteSelected && (
                              <>
                                <Form.Item
                                  label="Seleccionar Componente"
                                  name="componente"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, seleccione un componente",
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

                                <Form.Item
                                  label="Seleccionar Unidad de Medida"
                                  name="unidadMedidaComponente"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, seleccione una unidad de medida",
                                    },
                                  ]}
                                >
                                  <Select>
                                    {unidadesMedida.map((um) => (
                                      <Select.Option
                                        key={um.id_um}
                                        value={um.id_um}
                                      >
                                        {um.nombre_um}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>

                                <Form.Item
                                  label="Cantidad Disponible (Componente)"
                                  name="cantidadDisponibleComponente"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, ingrese la cantidad disponible",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>

                                <Form.Item
                                  label="Costo Unitario (Componente)"
                                  name="costoUnitarioComponente"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor, ingrese el costo unitario",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Form>
                </Modal>
              </Row>
              <Pagination
                current={currentPage}
                total={total}
                onChange={handlePageChange}
                pageSize={8}
                style={{ marginTop: "16px", textAlign: "center" }}
              />
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
