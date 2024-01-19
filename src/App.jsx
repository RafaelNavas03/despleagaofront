import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import RegisterForm from './components/registro';
import AdminMenu from './components/adminmenu';
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const renderContent = () => {
    const storedToken = localStorage.getItem('token');
    if (user) {
        return <AdminMenu />;
    }
    return <LoginForm onLogin={handleLogin} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderContent()} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/home" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
