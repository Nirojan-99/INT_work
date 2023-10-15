import React, { useRef, useState } from 'react'
import Paypal from './PayPal';
import PopupForm from './PopUpCashOnDelivery';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FaDownload } from "react-icons/fa6";
function PaymentDetails({ isEnabled }) {
  const [checkout, setCheckOut] = useState(false);

/// pdf 
const pdfRef = useRef()
const downloadPDF = ()=> {
  const input = pdfRef.current;
  html2canvas(input).then((canvas) =>
  {
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4', true);
   const pdfWidth = pdf.internal.pageSize.getWidth(); 
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio =Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 30;
  pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  pdf.save('invoice.pdf');
  });
  }




  //pop up form
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }
  console.log("isPopupOpen:", isPopupOpen)


  // handle checkbox change in payment method(PayPal,cash on delivery)
  const [isDivEnabled, setIsDivEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsDivEnabled(!isDivEnabled);
  };

//scroll bar 
 
  const containerStyle = {
    width: 'auto', // Set the width of the container
    height: '800px', // Set the height of the container
    overflow: 'scroll', // Add a scroll bar when content overflows
    
  };


  return (
    <div style={containerStyle}>
      {isEnabled ? (
        <div>





          <div className="card mb-4">
            <div className="card-body1">
              <div class="input-group">
                <input type="text" className="form-control" placeholder='Code/Coupon' />
                <button class="btn   btn-secondary" type="button" >Apply</button>
              </div> 
            </div>
          </div>




          <div className="card mb-4" >
            <div className="card-body1"ref={pdfRef}>
              <h3 className="h6">Check Out summary</h3>
              <div className="billing">
                <div className="d-flex justify-content-between mt-4"><span>Subtotal</span><span className="font-weight-bold"> US $120</span></div>
                <div className="d-flex justify-content-between mt-2"><span>Offer</span><span className="font-weight-bold">- US $15</span></div>
                <div className="d-flex justify-content-between mt-2"><span>Shipping Charge</span><span className="font-weight-bold">+ US $5</span></div>

                <hr />
                <div className="d-flex justify-content-between mt-1"><span className="font-weight-bold">Grand Total</span><span className="font-weight-bold text-success">US $110</span></div>
              </div>
            </div>
                 <div className='text-center mt-4 ml-2'>
                 <button onClick={downloadPDF}  className='btn btn-outline-secondary btn-sm'> <FaDownload/></button> 
                 </div>
          </div>




          <div className="form-check mb-3 form-switch">
            <input className="form-check-input" type="checkbox" role="switch" checked={isDivEnabled} onChange={handleCheckboxChange} />
            <h6 className="mb-0">Accepts Terms & Conditions</h6>
          </div>
          <div className={isDivEnabled ? 'enabled' : 'disabled-div'}  >

            <div class="card-body">
              <h5 class="card-title mb-3" style={{ color: '#035708' }}>cash on Delivery</h5>
              <p class="card-text">A type of transaction where the recipient pays for a good at the time of delivery rather than using credit.</p>
              <button className="btn btn-sm btn-primary" style={{ backgroundColor: '#00334e' }} onClick={togglePopup}>PlaceOrder</button>
              {isPopupOpen && <PopupForm closePopup={togglePopup}  />}
            </div>
          </div>

          <div className={isDivEnabled ? 'enabled' : 'disabled-div'}>

            <div class="card-body">
              <h5 class="card-title mb-3" style={{ color: '#035708' }}>pay with PayPal</h5>
              <p class="card-text">You will be redirected to the PayPal website to process your card payment. PayPal secures your payment and protect your financial information with strong encryption tools.</p>
              {checkout ? (
                <Paypal />

              ) : (
                <button className="btn btn-sm btn-primary  " style={{ backgroundColor: '#00334e' }}
                  onClick={() => {
                    setCheckOut(true);
                  }} >
                  PlaceOrder</button>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div>



          <div className="card mb-4">
            <div className="card-body1">
              <div class="input-group">
                <input type="text" className="form-control" placeholder='Code/Coupon' />
                <button class="btn   btn-secondary" type="button" >Apply</button>
              </div> 
            </div>
          </div>

        </div>
      )}
    </div>

  )
}

export default PaymentDetails
