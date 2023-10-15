import React from 'react';
import { Link } from 'react-router-dom';
import { get } from './request';
import withRouteUtil from './withRouteUtil';

class ViewSupplier extends React.Component {
    state = {
        supplier: {},
    };

    async componentDidMount() {
        const params = this.props.params;
        const supplier = await get(`supplier/${params.id}`);
        this.setState({ supplier });

        // Open the modal when the component mounts
        this.openModal();
    }

    // Function to open the modal
    openModal() {
        const modal = new window.bootstrap.Modal(document.getElementById('supplierModal'));
        modal.show();
    }

    render() {
        const { supplier } = this.state;

        return (
            <div className="container mt-5">
                {/* Modal */}
                <div className="modal fade" id="supplierModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#00334E', color: 'white' }}>
                                <h5 className="modal-title" id="exampleModalLabel">Supplier Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Supplier Details */}
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Supplier Name:</strong> {supplier.name}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Supplier Company:</strong> {supplier.company}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Supplier Address:</strong> {supplier.address}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Supplier Product:</strong> {supplier.category}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Supplier Mobile:</strong> {supplier.phone}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Supplier Email:</strong> {supplier.email}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to List Button */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Link
        className="btn mb-3"
        to="/list"
        style={{
            backgroundColor: '#00334E',
            color: 'white',
            padding: '20px', // Adjust the padding to make the button bigger
            borderRadius: '10px', // Adjust the border radius for rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a shadow
            textDecoration: 'none', // Remove default link underline
            display: 'inline-block', // Ensure the link behaves like a block-level element
        }}
    >
        Back to List
    </Link>
</div>


            </div>
        );
    }
}

export default withRouteUtil(ViewSupplier);
