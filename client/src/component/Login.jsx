import React, { useState } from 'react'
import Img from '../assets/first.jpg'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

import '../css/Login.css'

const Login = () => {
  const Navigate = useNavigate();
  const [user, setuser] = useState({
    email: "", password: ""
  })

  let name, value;

  const validation = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(value)
    setuser({ ...user, [name]: value })
  }


  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    const res = await fetch("https://tender-shorts-fly.cyclic.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: 'include',
      body: JSON.stringify({
        email, password
      })

    });
    const data = await res;


    if (data.status === 400 || !data) {
      window.alert("invalid candidate")
    } else if (data.status === 206) {
      console.log("Successfull login")
      window.alert("successfull sigin")
      Navigate('/about')
    } else {
      window.alert("fill the data")
    }


  }


  return (
    <>
      <div className="loginform">
        <div className="logincenter">


          <img src={Img} alt="registration" className='loginimg' />


          <div className="">
            <h2>sign up</h2>
            <form method="post">

              <div className='formgroup' >


                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">email</i>
                </label>
                <input type="text" id="name" name='email' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={user.email}
                  onChange={validation}
                  placeholder="your email" />
              </div>
              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">lock</i>
                </label>
                <input type="text" id="name" name='password' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={user.password}
                  onChange={validation}
                  placeholder="Password" />

              </div>
              <input type="submit" onClick={senddata} className='btn btn-primary mt-4 w-50' name='login' id='login' value='Login' />
            </form>

            <NavLink className="nav-link active " aria-current="page" to="/sigup">Create an account</NavLink>

          </div>
        </div>

      </div >

    </>
  )
}

export default Login