import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Image, Avatar, Card, Badge, Tooltip, Divider } from "antd";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Offcanvas,
} from "react-bootstrap";
import imgtomarpedido from "./res/imgtomarpedido.png";

const MenuMesero = () => {
  const { Meta } = Card;
  const tooltipTitle = "Realiza pedidos a las mesas";

  const [currentPage, setCurrentPage] = useState("homemesero");

  const handleCardClick = (page) => {
    console.log("Clicked on:", page);
    setCurrentPage(page);
  };

  const handleAtrasClick = (page) => {
    console.log("Clicked on:", page);
    setCurrentPage("homemesero");
  };

  const cardStyle = {
    width: "100%",
    height: "50%",
    margin: "16px",
    marginLeft: "1px",
    backgroundColor: "#CDEECC",
    border: "1px solid #A4A4A4",
  };

  const titleStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  
  const openNewWindow = () => {
    window.open('/cocina', '_blank'); 
  };

  return (
    <>
      <Row>
        {currentPage === "homemesero" && (
          <>
          <Col xs={24} sm={12} md={5} lg={3}>
              <Badge.Ribbon text="Pedidos">
                <Tooltip title={tooltipTitle}>
                  <Card
                    hoverable
                    style={cardStyle}
                    cover={
                      <Image
                        alt="Pedidos"
                        src={imgtomarpedido}
                        style={{
                          padding: "5%",
                          height: "150px",
                          width: "auto",
                        }}
                        preview={false}
                      />
                    }
                    className="text-center"
                    onClick={() => handleCardClick("pedidos")}
                  >
                    <Meta title={tooltipTitle}></Meta>
                  </Card>
                </Tooltip>
              </Badge.Ribbon>
            </Col>
          </>
        )}
        {currentPage === "pedidos" && (
          <>
            <Row>
              <Col md={12}>
                
              </Col>
            </Row>
          </>
        )}
      </Row>
    </>
  );
};

export default MenuMesero;