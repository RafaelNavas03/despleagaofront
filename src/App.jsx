const { Header, Content, Footer } = Layout;
import {
  Layout,
  Menu,
  Row,
  Col,
  Image,
  Dropdown,
  Button,
  Badge,
  theme,
  Breadcrumb,
  Tooltip,
} from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./components/MapaUbicacion";
//import Carrusel from "./components/pruebaCarrusel";
//import MenuNavBar from "./components/MenuNavBar";
//import ProfileEditor from "./components/EditarUser";
import LoginForm from "./components/login";
import RegisterForm from "./components/registro";
import AdminMenu from './components/adminmenu';
import MenuCocina from "./components/menucocina";
import Carrusel from "./Clientes/carrusel";
import ShoppingCart from "./Clientes/shopingcart";
import ListProductos from "./Clientes/ListaProductos";
import ItemList from "./Clientes/item";
import React, { useState } from 'react';
import { ShoppingCartProvider } from './context/CarritoContext';
import MostrarMesas from "./Clientes/Reserva";
function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const renderContent = () => {
    const storedToken = localStorage.getItem("token");
    if (user || storedToken) {
      return <AdminMenu />;
    }
    return <LoginForm onLogin={handleLogin} />;
  };

  return (
    <Router>
      <Layout>
        <Content>
          <div>
          <ShoppingCartProvider>
            <Routes>
              {/* Ruta principal para mostrar Carrusel */}
              <Route path="/" element={<Carrusel />} />

              {/* Rutas para otras secciones */}
              <Route path="/Mapa" element={<MapComponent />} />
              <Route path="/home" element={<AdminMenu />} />
              <Route path="/cocina" element={<MenuCocina/>} />
              <Route path="/Menu" element={<ListProductos/>} />
              <Route path="/pr" element={<ItemList/>} />
              <Route path="/Carrito" element={<ShoppingCart/>} />
              <Route path="/Reservaciones" element={<MostrarMesas/>} />
              {/* Rutas para autenticación */}
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/Registro" element={<RegisterForm />} />
            </Routes>
            </ShoppingCartProvider>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
