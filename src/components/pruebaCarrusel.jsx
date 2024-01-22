import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import BottomBar2 from "../components/BottomBar2";
import BestSellersComponent from "../components/mejoresPro";
import god from "../assets/images/god1.jpg";
import god2 from "../assets/images/god3.jpg";
import god3 from "../assets/images/god2.jpg";
import logo from "../assets/images/descargar.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import MyNavbar from "../components/NavBar2";
import Lottie from "react-lottie";
import A from "../assets/lottis/A.json";
import B from "../assets/lottis/C.json";

const bestSellers = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripción del producto 1",
    imageSrc: god,
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2",
    imageSrc: logo,
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción del producto 3",
    imageSrc: god2,
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripción del producto 4",
    imageSrc: god3,
  },
];

const Carrusel = () => {
  const [avisos, setAvisos] = useState([]);

  // Función para obtener los avisos principales de la API
  const fetchAvisosPrincipales = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/avisos/avisos/");
      const data = await response.json();
      setAvisos(data.avisos_principales);
    } catch (error) {
      console.error("Error al obtener los avisos principales", error);
    }
  };

  useEffect(() => {
    fetchAvisosPrincipales();
  }, []); // Se ejecutará solo una vez al montar el componente

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: B,
  };

  return (
    <>
      <MyNavbar />
      <Carousel>
        {avisos.map((aviso) => (
          <Carousel.Item>
            <img
              className="w-full  h-80 object-cover"
              src={`data:image/png;base64, ${aviso.imagen}`}
              alt={aviso.titulo}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
              <h3 className="text-lg font-semibold">{aviso.titulo}</h3>
              <p className="mt-2">{aviso.descripcion}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="flex justify-center p-4">
        <Card style={{ width: "18rem" }}>
          <Lottie className="w-2 h-2" options={defaultOptions} />

          <Card.Body>
            <div className="flex justify-center ">
              <Button
                variant="outline-danger"
                className="transition-transform transform hover:scale-105"
              >
                Ver todas las promociones
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="mb-4 mt-10 ml-4 mr-4  p-6 b">
        <h2 className="text-2xl font-semibold text-center mb-4 relative">
          Productos más vendidos
          <span className="block h-px bg-gray-700 w-full absolute bottom-0"></span>
        </h2>
        <BestSellersComponent products={bestSellers} />
      </div>
      <BottomBar2 />
    </>
  );
};

export default Carrusel;
