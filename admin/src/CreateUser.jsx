import React, { useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './form.css';
import './index.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function CreateUser() {
    const formArray = [1, 2, 3,4];
    const [formNo, setFormNo] = useState(formArray[0])
    const [code,setCode] = useState()
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [status,setStatus] = useState()
    const [couponType,setCouponType] = useState()
    const [minOrder,setMinOrder] = useState()
    const [maxOrder,setMaxOrder] = useState()
    const [value,setValue] = useState()
    const [restrictEmail,setEmail] = useState()
    const [noItem,setItem] = useState()
    const [usageLimit,setcartLimit] = useState()
    const [couponQuantity,setQuantity] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [userLimit,setuserLimit] = useState()
    const navigate = useNavigate()

  const next = () => {
    if (formNo === 1 && code && name && description && status) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && value && couponType && startDate && endDate) {
      setFormNo(formNo + 1)
    }else if (formNo === 3 && minOrder && maxOrder && restrictEmail && noItem && usageLimit && couponQuantity && userLimit) {
        setFormNo(formNo + 1)
    }else {
      toast.error('Please fillup all input field')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    if (minOrder && maxOrder && restrictEmail && noItem && usageLimit && couponQuantity && userLimit ) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }

  const Submit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:3001/createUser",{code,name,value,description,status,couponType,minOrder,maxOrder,restrictEmail,noItem,usageLimit,couponQuantity,startDate,endDate,userLimit})
            .then(result => {
                
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Coupon has been successfully created',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
  return (
    <div>
      <ToastContainer />
      {
        formNo === 1 && <div>
        <div className="container">
        
        <form >
        <header>Coupon Creation</header><br></br>
        <div className="form first">
                    <div className="fields">
                        <div className="input-field">
                            <label>Coupon Code  : </label>
                            <input type="text"  onChange={(e) => setCode(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Coupon Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Status</label>
                            <select onChange={(e) => setStatus(e.target.value)} required>
                                <option disabled selected>Select status</option>
                                <option>Activate</option>
                                <option>DeActivate</option>
                            </select>
                        </div>
                        <div class="mb-1">
                            <label for="couponTextarea" class="form-label">Coupon Description</label>
                            <textarea class="form-control " id="couponTextarea"  onChange={(e) => setDescription(e.target.value)} required></textarea>
                            <div class="invalid-feedback">
                                Please enter a description in the textarea.
                            </div>
                        </div>
                    </div> 
                    <div className="text-center">
                            <button className="nextBtn btn btn-primary" id="btnSave" onClick={next}>Next</button>
                             <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        }

        {
          formNo === 2 && <div>
            <div className="container">
         <header>General</header><br></br>
         <form>
         <div className="form first">
         <div className="input-field">
                <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Coupon value</label>
                             <input type="number" onChange={(e) => setValue(e.target.value)}/>
                         </div>
                         <div class="mb-2 col-sm-3">
                             <label for="couponType" class="col-sm-10 col-form-label">Coupon Type</label>
                             <select class="form-select" id='couponType' aria-label="Default select example" onChange={(e) => setCouponType(e.target.value)}>
                                 <option selected>select</option>
                                 <option value="1">percentage coupon</option>
                                 <option value="2">timeperiodcoupon</option>
                                 <option value="3">blackdayCoupon</option>
                             </select>
                         </div>
                         <div className="input-field">
                            <label>Starting Date</label>
                             <input type="date" placeholder="Enter starting date" onChange={(e) => setStartDate(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>Expiry Date</label>
                            <input type="date" placeholder="Enter ending date" onChange={(e) => setEndDate(e.target.value)}/>
                         </div>
                     </div> 
                     <div className="text-center">
                         <button className="backBtn btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="nextBtn btn btn-primary" id="btnSave" onClick={next}>Next</button>
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                 </div>
             </div>
             </div>
         </form>
     </div>   
          </div>
        }

        {
          formNo === 3 && <div>
            <div className="container">
         <header>Usage Limit</header><br></br>
         <form onSubmit={Submit}>
         <div className="form first">
         <div className="input-field">
                 <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Minmum order Amount</label>
                             <input type="number" onChange={(e) => setMinOrder(e.target.value)}/>
                         </div>
                        
                         <div className="input-field">
                             <label>Maximum order Amount</label>
                             <input type="number"  onChange={(e) => setMaxOrder(e.target.value)}/>
                         </div>
                        <div className="input-field">
                            <label>Email Restrictions :</label>
                             <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>Specify the no of cart items the coupon code can be applied</label>
                             <input type="number"  onChange={(e) => setcartLimit(e.target.value)}/>
                         </div>
                         <div className="input-field">
                            <label>coupon Qaunttity</label>
                             <input type="number"   onChange={(e) => setQuantity(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>No of time the user can use this discount</label>
                             <input type="number"  onChange={(e) => setuserLimit(e.target.value)}/>
                         </div>
                     </div> 
                    <div className="text-center">
                    <button className="btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="btn btn-primary" id="btnSave" onClick={finalSubmit}>create coupon</button> 
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                </div>
             </div>
             </div>
         </form>
    </div> 
          </div>
        }
           {
          formNo === 4 && <div>
            <div className="container">
         <header>coupon created</header><br></br>
         <form >
         
         </form>
    </div> 
          </div>
        }
        
      </div>
    
  );
}

export default CreateUser;