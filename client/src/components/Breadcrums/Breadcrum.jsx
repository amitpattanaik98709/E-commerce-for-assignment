import React from 'react'
import "./Breadcrum.css"
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from 'react-router-dom';

export default function Breadcrum({ product }) {
  return (
    <div className='breadcrum'>
      <Link to={"/"}>HOME</Link> <img src={arrow_icon} alt="" /> <Link to={"/"}>Shop</Link>  <img src={arrow_icon} alt="" /> 
      {product?.category || "Loading..."} <img src={arrow_icon} alt="" /> {product?.name || "Loading..."}
    </div>
  );
}
