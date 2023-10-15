import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { fetchDeliveries } from "../Api/deliveryApi";
import EditModal from "./EditModal";
import { Segment, Table } from "semantic-ui-react";
import AdminDashBoard from "../Employee/AdminDashBoard";
const AllDelivery = () => {
  const [editDone,setEditDone]=useState(false);
  const [loading,setLoading]=useState(false);
  const getDelivery = async () => {
    const data = await fetchDeliveries();
    setDeliveries(data);
  };
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    getDelivery();
  }, []);

  const handleEditDone=()=>{
    setEditDone(true);
  }

  const handleDeleteDone=()=>{
    setEditDone(true);
  }
  
  useEffect(()=>{
    setLoading(true);
    if(editDone){
      getDelivery();
    }
    setEditDone(false);
    setLoading(false);
  },[editDone])

  return (
    <div className="container mt-5">
       <AdminDashBoard/>
       <div className="mt-3 delivery-case">
        <Link className="btn btn-success" to="/add-delivery">
          ADD DELIVERY
        </Link>
      </div>

<div className="table-format">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Delivery Id</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>ACTION</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {deliveries.map((delivery) => (
            <>
              <Table.Row key={delivery._id}></Table.Row>
              <Table.Cell>{delivery._id}</Table.Cell>
              <Table.Cell>{delivery.address}</Table.Cell>
              <Table.Cell>{delivery.status.toUpperCase()}</Table.Cell>
              <Table.Cell>
                {" "}
                <EditModal data={delivery} handleEditDone={handleEditDone} />
                <DeleteModal deliveryId={delivery._id} handleDeleteDone={handleDeleteDone}  />
                {/* <ModalExampleModal/> */}
              </Table.Cell>
              <Table.Row />
            </>
          ))}
        </Table.Body>
      </Table>
      </div>
     
    </div>
  );
};

export default AllDelivery;
