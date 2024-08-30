import React, { useState, useEffect } from 'react'
import "./Listproduct.css"
import cross_icon from "../../assets/cross_icon.png"

export default function Listproduct() {

  const [allproducts, setallproducts] = useState([]);
  const url="https://e-commerce-backend-2iit.onrender.com";

  const fetchinfo = async () => {
    await fetch("https://e-commerce-backend-2iit.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => setallproducts(data))
  }

  useEffect(() => {
    fetchinfo();
  }, [])

  const remove_Product=async(id)=>{
    await fetch("https://e-commerce-backend-2iit.onrender.com/removeproduct",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify({id:id})
    })
    await fetchinfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => {
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img className='listproduct-product-icon' src={url+"/images/"+product.image} alt="" />
            <p>{product.name}</p>
            <p>${product.old_prices}</p>
            <p>${product.new_prices}</p>
            <p>{product.category}</p>
            <img onClick={()=>remove_Product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}
