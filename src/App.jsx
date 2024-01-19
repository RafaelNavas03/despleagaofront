const { Header , Content, Footer } = Layout;
import { Layout, Menu, Row, Col, Image, Dropdown, Button, Badge, theme, Breadcrumb,Tooltip } from 'antd';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from './components/MapaUbicacion';
import Carrusel from './components/pruebaCarrusel';
import MenuNavBar from './components/MenuNavBar';
import ProfileEditor from './components/EditarUser';
function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

;
  
  return (


    
    <Router>
      
      <Layout>
      <Content >
      <div
        
        
      >
    
    
          <Routes>
          
          <Route path="/" element={<Carrusel/>}/>
          <Route path="/Mapa" element={<MapComponent/>} />
          <Route path="/Carrusel" element={< Carrusel/>}/>
          <Route path="/Menu" element={<MenuNavBar/>} />
          <Route path="/perfil" element={<ProfileEditor/>} />
          </Routes>
          </div>
        </Content>
        
      </Layout>
      
    </Router>
    
  )
}
export default App
