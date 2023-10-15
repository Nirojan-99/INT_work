// CartItem.js
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  // Function to handle quantity change and invoke the callback
  const handleQuantityChange = (newQuantity) => {
    updateCartItemCount(newQuantity, id);
    props.onQuantityChange(id, newQuantity); // Invoke the callback
  };

  return (
    <div className="cartItem">
      <img src={productImage} alt={`${productName} image`} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
        {/* Pass the quantity to Cart component */}
        {props.quantity && <p>Quantity: {props.quantity}</p>}
      </div>
    </div>
  );
};
