import React, { useEffect } from 'react'
import CartItems from '../components/CartItems/CartItems'


export default function Cart() {
  useEffect(() => {
    if(!localStorage.getItem("auth-token")){
      alert("Please Login First with a valid...")
    }
  }, [])
  
  return (
    <div>
      <CartItems></CartItems>
    </div>
  )
}
