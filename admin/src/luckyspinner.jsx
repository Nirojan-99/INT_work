import React,{Fragment} from 'react'
import Spinner from './components/Spinner/Spinner'
import SpinnerMessage from './components/SpinnerMessage/SpinnerMessage'
import powerbar from './images/powerbar.svg'
import './App.css';


const luckyspinner = () => {
  return (
    <div>
      <div className="SpinnerSection">
        <Spinner />
        <div className="powerbar-container">
          <img src={powerbar} alt="Power Bar"/>
        </div>
        <SpinnerMessage />
      </div>
    </div>
  )
}

export default luckyspinner
