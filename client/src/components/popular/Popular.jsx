import React, { useEffect, useState } from 'react'
import "./Popular.css"
import Item from '../item/Item'

export default function Popular() {

  const [popularproducts, setpopularproducts] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-backend-2iit.onrender.com/popularinwomen")
    .then((res)=>res.json())
    .then((data)=>setpopularproducts(data));
  }, [])
  

  return (
    <div className='popular'>
      <h1> POPULAR IN WOMEN </h1>
      <hr />
      <div className="popular-item">
        {popularproducts.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_prices} old_price={item.old_prices}></Item>
        })}
      </div>
    </div>
  )
}
