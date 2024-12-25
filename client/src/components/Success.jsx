import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Success() {

  return (
    <div className="flex justify-center min-h-screen items-center bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-3xl font-bold text-green-600 mt-4">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
        <p className="mt-2 text-gray-600">Order placed successfully.</p>
        <div className="mt-6">
          <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}