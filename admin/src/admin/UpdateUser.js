import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../actions/userActions";
import { clearError, clearUserUpdated } from "../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // New field
    const [dateOfBirth, setDateOfBirth] = useState(""); // New field
    const [address, setAddress] = useState(""); // New field

    const { id:userId } = useParams();
    
    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
    const {  user:authUser } = useSelector(state => state.authState);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('phoneNumber', phoneNumber); // New field
        formData.append('dateOfBirth', dateOfBirth); // New field
        formData.append('address', address); // New field
        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {
        if(isUserUpdated) {
            toast('User Updated Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])

    useEffect(() => {
        if(user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setPhoneNumber(user.phoneNumber || ""); // New field
            setDateOfBirth(user.dateOfBirth || ""); // New field
            setAddress(user.address || ""); // New field
        }
    }, [user])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Email</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Role</label>
                                <select disabled={user._id === authUser._id } value={role} onChange={e => setRole(e.target.value)} className="form-control" id="category_field">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            {/* New fields */}
                            <div className="form-group">
                                <label htmlFor="phone_number_field">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number_field"
                                    className="form-control"
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date_of_birth_field">Date of Birth</label>
                                <input
                                    type="text"
                                    id="date_of_birth_field"
                                    className="form-control"
                                    onChange={e => setDateOfBirth(e.target.value)}
                                    value={dateOfBirth}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address_field">Address</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    onChange={e => setAddress(e.target.value)}
                                    value={address}
                                />
                            </div>
                            {/* End of new fields */}
                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}
