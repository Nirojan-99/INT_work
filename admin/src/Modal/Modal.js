import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Modal.css";
import "../Details.jsx";
import { motion } from "framer-motion";
// import nft from "../nft.png";

function Modal({ setOpenModal }) {
  return (
    <>
      <motion.div initial={{ opacity: 0,y:-100,scale:1 }} animate={{ opacity: 1,y:50,scale:1.1 }} transition={{stiffness: 400  }}>
      <div className='overlay'>
      <div onClick={(e) => {e.stopPropagation();}}className='modalContainer'>
          {/* <img src={nft} alt="/" /> */}
          <div className="modalRight">
            <div className="content">
              <p>Do you want a</p>
              <h1>$20 CREDIT</h1>
              <p>for your first tade?</p>
            </div>
            <div className="btnContainer">
              <button className="btnPrimary"><span className="bold">YES</span>, I love NFT's</button>
              <button onClick={() => {setOpenModal(false);}}id="cancelBtn">
                <span className="bold">NO</span>, thanks
              </button>
            </div>
          </div>
        </div>

        {/* <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false);}}> X</button>
        </div>
        <div class="coupon-container">
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <img class="bg" src="images/bg.svg" alt="" />

      <img class="gift" src="images/gift.svg" alt="" />

      <h2>Congratulations!</h2>
      <p>You can get</p>
      <div class="discount">75% off</div>
      <p>Here is your code</p>
      <div class="code">LBSAVE75</div>
      <a href="#" class="btn">Redeem</a>
    </div>

        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
        </div>
      </motion.div>
    </>
  );
}

export default Modal;
