import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, post, put } from './request';
import withRouteUtil from './withRouteUtil';
import AdminDashBoard from '../Employee/AdminDashBoard';

const Input = ({ name, label, onChange, value, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={`${name} ${label}`} className="form-label">
        {label}
      </label>

      <input
        type="text"
        className="form-control"
        id={`${name} ${label}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

class AddSupplier extends Component {
  state = {
    createRequest: {},
    id: '',
    errors: {}, // Added to keep track of validation errors
  };

  async componentDidMount() {
    const params = this.props.params;
    const id = params.id;

    if (id) {
      this.setState({ id });

      const createRequest = await get(`supplier/${id}`);

      this.setState({ createRequest });
    }
  }

  handleInput(name, value) {
    const createRequest = { ...this.state.createRequest };
    const errors = { ...this.state.errors };

    // Basic email validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[name] = 'Invalid email format';
      } else {
        delete errors[name]; // Clear the error if validation passes
      }
    }

    // Basic phone number validation (assuming it should have exactly 10 digits)
    if (name === 'phone') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        errors[name] = 'Invalid phone number (must be 10 digits)';
      } else {
        delete errors[name]; // Clear the error if validation passes
      }
    }

    // Category validation
    if (name === 'category') {
      if (!value) {
        errors[name] = 'Please select a category';
      } else {
        delete errors[name]; // Clear the error if validation passes
      }
    }

    // Update the state with input value and errors
    createRequest[name] = value;
    this.setState({ createRequest, errors });
  }

  async addSupplier() {
    // Check for validation errors before submitting
    if (Object.keys(this.state.errors).length === 0) {
      const supplier = await post('supplier', this.state.createRequest);
      this.props.navigate('/adhome');
    } else {
      console.log('Validation errors. Cannot submit.');
    }
  }

  async updateSupplier() {
    // Check for validation errors before submitting
    if (Object.keys(this.state.errors).length === 0) {
      const supplier = await put('supplier', this.state.createRequest);
      this.props.navigate('/list');
    } else {
      console.log('Validation errors. Cannot submit.');
    }
  }

  render() {
    const { id, createRequest = {}, errors } = this.state;

    return (
      <div>
        <AdminDashBoard></AdminDashBoard>


        {/* <div className="container mt-5">
          <div className="mx-auto w-50 shadow p-5">
            <h3 className="mt-5">Fill the Details</h3> */}

            <div className="container mt-5" style={{ backgroundColor: '' }}>
  <div className="mx-auto w-50 shadow p-5" style={{ backgroundColor: '#D8E3E7' }}>
    <h3 className="mt-5" style={{ color: '#00334E' }}>Fill the Details</h3>


            <Input
              name="name"
              label="Supplier Name"
              value={createRequest['name']}
              onChange={(value) => this.handleInput('name', value)}
              error={errors['name']}
            />

            <Input
              name="company"
              label="Supplier Company"
              value={createRequest['company']}
              onChange={(value) => this.handleInput('company', value)}
              error={errors['company']}
            />

            <Input
              name="phone"
              label="Phone Number"
              value={createRequest['phone']}
              onChange={(value) => this.handleInput('phone', value)}
              error={errors['phone']}
            />

            <Input
              name="email"
              label="Email"
              value={createRequest['email']}
              onChange={(value) => this.handleInput('email', value)}
              error={errors['email']}
            />

            <Input
              name="address"
              label="Address"
              value={createRequest['address']}
              onChange={(value) => this.handleInput('address', value)}
            />

            <div onChange={(event) => this.handleInput('category', event.target.value)}>
              <label className="form-label">Product Category</label> <br />

              <input
                type="radio"
                value="Glasses"
                name="gender"
                checked={createRequest.category === 'Glasses'}
              />{' '}
              Glasses
              <br />

              <input
                type="radio"
                value="Sun Glasses"
                name="gender"
                checked={createRequest.category === 'Sun Glasses'}
              />{' '}
              Sun Glasses
              <br />

              <input
                type="radio"
                value="Lens"
                name="gender"
                checked={createRequest.category === 'Lens'}
              />{' '}
              Lens
              <br />
            </div>

            {errors['category'] && <small className="text-danger">{errors['category']}</small>}

            {id && (
              <button className="mt-3 btn " onClick={this.updateSupplier.bind(this)} style={{ backgroundColor: '#00334e ' ,color:'white' }}>
                Update
              </button>
            )}

            {!id && (
              <button className="mt-3 btn " onClick={this.addSupplier.bind(this)} style={{ backgroundColor: '#00334e ' ,color:'white' }}>
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouteUtil(AddSupplier);
