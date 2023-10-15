import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Orders from "./Orders";
// import CreateUser from "./CreateUser";
// import UpdateUser from "./UpdateUser";
// import Luckyspinner from "./luckyspinner";
// import Details from "./Details";
// import Spincrud from "./components/SpinnerCrud/Spincrud";
// import Popup from "./Modal/popup";
// import Model2 from "./components/model2/Model2";
import Login from "./components/Employee/Login";
import SignUp from "./components/Employee/SignUp";
import AdminHome from "./components/Employee/AdminHome";
import AllSalesExecutive from "./components/Employee/AllSalesExecutives";
import AddSalesExecutive from "./components/Employee/AddSalesExecutives";
import AddDeliveryDriver from "./components/Employee/AddDeliveryDriver";
import UpdateSalesExecutive from "./components/Employee/UpdateSalesExecutive";
import AllDeliveryDriver from "./components/Employee/AllDeliveryDrivers";
import UpdateDeliveryDriver from "./components/Employee/UpdateDeliveryDriver";
import SalesExecutiveReport from "./components/Employee/SalesExecutiveReport";
import DeliveryDriverReport from "./components/Employee/DeliveryDriverReport";
import SalesExecutiveHome from "./components/SalesExecutive/SalesExecutiveHome";
import DeliveryDriverHome from "./components/DeliveryDriver/DeliveryDriverHome";
import ViewProfileDD from "./components/DeliveryDriver/DeliveryDriverViewProfile";
import ViewProfileSE from "./components/SalesExecutive/SalesExecutiveViewProfile";
import ApplyForLeaveSE from "./components/SalesExecutive/ApplyForLeaveSE";
import ApplyForLeaveDD from "./components/DeliveryDriver/ApplyForLeaveDD";
import ViewLeaveSE from "./components/SalesExecutive/SalesExecutiveViewLeave";
import ViewLeaveDD from "./components/DeliveryDriver/DeliveryDriverViewLeave";
import AllLeave from "./components/Employee/AllLeaves";
import PaymentPage from "../src/components/Payment/Payment";
import ListSupplier from "./components/Supplier/ListSupplier";
import AddSupplier from "./components/Supplier/AddSupplier";
import ViewSupplier from "./components/Supplier/ViewSupplier";
import AddDelivery from "./components/delivery/AddDelivery";
import Editstud from "./components/delivery/Editstud";
import Viewstud from "./components/delivery/Viewstud";
import AllDelivery from "./components/delivery/AllDelivery";

import Dashboard from "./admin/Dashboard";
import UserList from "./admin/UserList";
import UpdateUser from "./admin/UpdateUser";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/order" element={<Orders />}></Route>
          {/* TODO:change path */}
          {/* <Route path='/create' element={<CreateUser/>}></Route>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
            <Route path='/lucky' element={<Luckyspinner/>}></Route>
            <Route path='/view/:id' element={<Details/>}></Route>
            <Route path='/spincrud' element={<Spincrud/>}></Route>
            <Route path='/popup' element={<Popup/>}></Route>
            <Route path='/popup2' element={<Model2/>}></Route> */}
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adhome" element={<AdminHome />} />
          <Route exact path="/addse" element={<AddSalesExecutive />} />
          <Route exact path="/adddd" element={<AddDeliveryDriver />} />
          <Route exact path="/allse" element={<AllSalesExecutive />} />
          <Route
            exact
            path="/updatese/:id"
            element={<UpdateSalesExecutive />}
          />
          <Route exact path="/alldd" element={<AllDeliveryDriver />} />
          <Route
            exact
            path="/updatedd/:id"
            element={<UpdateDeliveryDriver />}
          />
          <Route exact path="/reportse" element={<SalesExecutiveReport />} />
          <Route exact path="/reportdd" element={<DeliveryDriverReport />} />
          <Route exact path="/sehome" element={<SalesExecutiveHome />} />
          <Route exact path="/ddhome" element={<DeliveryDriverHome />} />
          <Route exact path="/viewse" element={<ViewProfileSE />} />
          <Route exact path="/viewdd" element={<ViewProfileDD />} />
          <Route exact path="/applyse" element={<ApplyForLeaveSE />} />
          <Route exact path="/applydd" element={<ApplyForLeaveDD />} />
          <Route exact path="/allleave" element={<AllLeave />} />
          <Route exact path="/leavese" element={<ViewLeaveSE />} />
          <Route exact path="/leavedd" element={<ViewLeaveDD />} />
          <Route exact path="/payment" element={<PaymentPage />} />
          <Route path="/list" element={<ListSupplier />} />
          <Route path="/add" element={<AddSupplier />} />
          <Route path="/edit/:id" element={<AddSupplier />} />
          <Route path="/view/:id" element={<ViewSupplier />} />
          <Route path="/delivery" element={<AllDelivery />} />
          <Route path="/add-delivery" element={<AddDelivery />} />
          <Route path="/editstud/:id" element={<Editstud />} />
          <Route path="/viewstud/:id" element={<Viewstud />} />
          {/*  */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
