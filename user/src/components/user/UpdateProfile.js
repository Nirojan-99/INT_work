import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector((state) => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // Add phone number state
    const [dateOfBirth, setDateOfBirth] = useState(""); // Add date of birth state
    const [address, setAddress] = useState(""); // Add address state
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
  
    const onChangeAvatar = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber); // Add phone number to formData
      formData.append("dateOfBirth", dateOfBirth); // Add date of birth to formData
      formData.append("address", address); // Add address to formData
      formData.append("avatar", avatar);
      dispatch(updateProfile(formData));
    };
  
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber || ""); // Set phone number and handle null case
        setDateOfBirth(user.dateOfBirth || ""); // Set date of birth and handle null case
        setAddress(user.address || ""); // Set address and handle null case
        if (user.avatar) {
          setAvatarPreview(user.avatar);
        }
      }
  
      if (isUpdated) {
        toast("Profile updated successfully", {
          type: "success",
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: () => dispatch(clearUpdateProfile()),
        });
        return;
      }
  
      if (error) {
        toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "error",
          onOpen: () => {
            dispatch(clearAuthError);
          },
        });
        return;
      }
    }, [user, isUpdated, error, dispatch]);
  
    return (
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>
  
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="phone_number_field">Phone Number</label>
              <input
                type="text"
                id="phone_number_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="date_of_birth_field">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth_field"
                className="form-control"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChangeAvatar}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
  
            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
  