import React, { useState } from 'react';
import "./CSS/login.css";

export default function Login() {

  const [state, setstate] = useState("Login");
  const [nameset, setnameset] = useState();
  const [passwordset, setpasswordset] = useState();
  const [emailset, setemailset] = useState();
  const [isChecked, setIsChecked] = useState(false); // For checkbox state

  const validateEmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  // Strong password validation function
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const login = async () => {
    if (!validateEmail(emailset)) {
      alert("Email must end with @gmail.com");
      return;
    }

    console.log("login");
    let responsedata;
    await fetch("https://e-commerce-hat0.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailset,
        password: passwordset
      })
    }).then((res) => res.json()).then((data) => responsedata = data);

    if (responsedata.success) {
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    } else {
      alert(responsedata.errors);
    }
  };

  const signup = async () => {
    if (!validateEmail(emailset)) {
      alert("Email must end with @gmail.com");
      return;
    }

    if (!validatePassword(passwordset)) {
      alert("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    console.log("signup");
    let responsedata;
    await fetch("https://e-commerce-hat0.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: nameset,
        email: emailset,
        password: passwordset
      })
    }).then((res) => res.json()).then((data) => responsedata = data);

    if (responsedata.success) {
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    } else {
      alert(responsedata.errors);
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>{state}</h1>
        <div className="login-fields">
          {state === "Sign Up" ? <input onChange={(e) => { setnameset(e.target.value) }} type="text" placeholder='Your Name' /> : null}
          <input onChange={(e) => { setemailset(e.target.value) }} type="Email" placeholder='Email Address' />
          <input onChange={(e) => { setpasswordset(e.target.value) }} type="Password" placeholder='Password' />
        </div>
        <button 
          onClick={() => { state === "Login" ? login() : signup() }} 
          disabled={!isChecked}  // Button is disabled if checkbox is unchecked
          className={isChecked ? "continue-btn" : "continue-btn disabled-btn"}
        >
          Continue
        </button>

        {state === "Sign Up" ? 
          <p className='login-login'>Already have an Account? <span onClick={() => setstate("Login")}>Login here</span></p> 
          : <p className='login-login'>Create an account? <span onClick={() => setstate("Sign Up")}>Click here</span></p>}

        <div className="login-agree">
          <input 
            type="checkbox" 
            onChange={(e) => setIsChecked(e.target.checked)} // Update checkbox state
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
