import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import Modals from "../../components/Model2/Modals";
import { useState, useEffect } from "react";

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h3>Lanka Opticals</h3>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};
