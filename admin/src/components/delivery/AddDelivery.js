import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Grid, Segment } from "semantic-ui-react";
import { postDelivery } from "../Api/deliveryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const validateDate = (value) => {
  const selectedDate = new Date(value);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    return "Date of Birth cannot be before today";
  }

  return undefined; // Return undefined if validation passes
};
const validate = (values) => {
  const errors = {};
  if (!values.deliveryDate) {
    errors.deliveryDate = "Required";
  } else {
    const dateError = validateDate(values.deliveryDate);
    if (dateError) {
      errors.deliveryDate = dateError;
    }
  }
  return errors;
};

function AddDelivery() {
  const [isShippingAddress, setShippingAddress] = useState(false);
  const initialValues = {
    status: "pending",
    address: "billingAddress",
  };

  const handleSubmit = async (values) => {
    // Handle form submission, e.g., send data to a server
    values.orderId = "ORD1";
    values.isShippingAddress = isShippingAddress;
    if (!values.isShippingAddress) values.address = "";
    await postDelivery(values);
  };

  const handleAddressTypeChange = (e) => {
    setShippingAddress(e.target.value === "billingAddress" ? false : true);
  };

  return (
    <div className="add-delivery">
      <h1>Add Delivery</h1>

      <Segment className="form-add">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label>Address</label>

              <div
                className="gap-c"
                role="group"
                aria-labelledby="address-label"
              >
                <label className="field-gap">
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="billingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Billing Address
                </label>
                <label className="field-gap">
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="shippingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Shipping Address
                </label>
              </div>

              {isShippingAddress ? (
                <div className="form-group">
                  <label className="field-gap" htmlFor="lastName">
                    Shipping Address
                  </label>
                  <Field
                    type="text"
                    name="shippingAddress"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
              ) : null}

              <label>Status:</label>
              <div
                className="gap-c"
                role="group"
                aria-labelledby="status-label"
              >
                <label className="field-gap">
                  <Field type="radio" name="status" value="pending" />
                  Pending
                </label>
                <label className="field-gap">
                  <Field type="radio" name="status" value="inProgress" />
                  In Progress
                </label>
                <label className="field-gap">
                  <Field type="radio" name="status" value="completed" />
                  Completed
                </label>
              </div>
            </div>

            <div className="form-group gap-c">
              <label className="field-gap" htmlFor="deliveryDate">
                Delivery Date:
              </label>
              <Field type="date" name="deliveryDate" className="form-control" />
              <ErrorMessage
                name="deliveryDate"
                component="div"
                className="error"
              />
            </div>

            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Form>
        </Formik>
      </Segment>
    </div>
  );
}

export default AddDelivery;
