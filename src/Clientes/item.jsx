import React from "react";
import ProductList from "./pr";
import { Navbar } from "./navbar2";
const ItemList = () => {
  return (
    <div className="items-list">
        <Navbar/>
      <ProductList />
    </div>
  );
};

export default ItemList;
