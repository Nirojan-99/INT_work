import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom";

import axios from "axios"; // Import Axios for making HTTP requests

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // State to store order status
  const [orderStatus, setOrderStatus] = useState("");

  // Function to place an order
  const placeOrder = async () => {
    // Prepare the order data according to orderSchema
    const orderData = {
      customerId: "YOUR_CUSTOMER_ID", // Replace with the actual customer ID
      orderDate: new Date(),
      // products: Object.entries(cartItems)
      //   .filter(([productId, quantity]) => quantity > 0)
      //   .map(([productId, quantity]) => ({
      //     productId,
      //     quantity,
      //   })),
      orderTotal: totalAmount,
    };

    try {
      // Send a POST request to your server's API endpoint
      const response = await axios.post(
        "http://localhost:8070/orders",
        orderData
      );

      // Handle the response from the server
      if (response.status === 201) {
        // Order placed successfully
        setOrderStatus("Order placed successfully!");
        checkout(); // Clear the cart
        // navigate("/");
        Swal.fire({
          title: "Order placed successfully!",
          icon: "success",
        });
      } else {
        // Handle other response statuses (e.g., validation errors)
        setOrderStatus("Order failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or server errors
      setOrderStatus("Order failed. Please try again later.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          const quantity = cartItems[product.id];
          if (quantity !== 0) {
            return (
              <CartItem data={product} quantity={quantity} key={product.id} />
            );
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={placeOrder}>Place Order</button>
          {orderStatus && <p>{orderStatus}</p>}
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
