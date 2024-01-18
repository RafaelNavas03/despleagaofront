import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

const CrearInventario = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Si se proporciona 'id_producto', se asume que es un producto
      if (values.id_producto) {
        formData.append('id_producto', values.id_producto);
      }

      // Si se proporciona 'id_componente', se asume que es un componente
      if (values.id_componente) {
        formData.append('id_componente', values.id_componente);
      }

      // Otros campos del formulario
      formData.append('id_bodega', values.id_bodega);
      formData.append('id_um', values.id_um);
      formData.append('stock_minimo', values.stock_minimo);

      // Hacer la solicitud a la API con los datos del formulario
      const response = await fetch('http://127.0.0.1:8000/Inventario/crearinventario/', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      console.log('Respuesta de la API:', responseData);
      // Puedes manejar la respuesta de la API aquí
      notification.success({
        message: 'Inventario creado exitosamente',
      });
    } catch (error) {
      console.error('Error al crear inventario:', error);
      notification.error({
        message: 'Error al crear inventario',
        description: 'Hubo un problema al enviar los datos al servidor.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="id_bodega" label="ID de Bodega" rules={[{ required: true, message: 'Por favor ingrese el ID de la bodega' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="id_producto" label="ID de Producto">
        <Input />
      </Form.Item>
      <Form.Item name="id_componente" label="ID de Componente">
        <Input />
      </Form.Item>
      <Form.Item name="id_um" label="ID de UM" rules={[{ required: true, message: 'Por favor ingrese el ID de la unidad de medida' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="stock_minimo" label="Stock Mínimo" rules={[{ required: true, message: 'Por favor ingrese el stock mínimo' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear Inventario
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CrearInventario;
