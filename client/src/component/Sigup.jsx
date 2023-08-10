import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Img from '../assets/first.jpg'

const Sigup = () => {
  const Navigate = useNavigate();
  const [User, setUser] = useState({
    name: "", email: "", phone: "", password: "", cpassword: "",
  })


  let name, value;

  const entervalue = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...User, [name]: value })
  }

  const postdata = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = User;

    const res = await fetch("https://tender-shorts-fly.cyclic.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, password, cpassword
      })

    });
    const data = await res;

    if (data.status === 422 || !data) {
      window.alert("fill the blank data")
    } else if (data.status === 400) {
      window.alert("email is already register")

    } else if (data.status === 401) {
      window.alert("password is not match")
    } else {
      window.alert("registration successfull")
      Navigate('/login')
    }


  }

  return (
    <>
      <div className="main">


        <div className="container">
          <div className="leftsigup ">
            <form method='POST'>
              <h2 className='m-3 fw-bolder'>sign up</h2>
              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">person</i>
                </label>
                <input type="text" id="name" name='name' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={User.name}
                  onChange={entervalue}
                  placeholder="your name" />
              </div>

              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">mail</i>
                </label>
                <input type="email" id="name" name='email' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={User.email}
                  onChange={entervalue}
                  placeholder="your email" />
              </div>

              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">phone</i>
                </label>
                <input type="text" id="name" name='phone' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={User.phone}
                  onChange={entervalue}
                  placeholder="your phone no" />
              </div>



              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">lock</i>
                </label>
                <input type="text" id="name" name='password' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={User.password}
                  onChange={entervalue}
                  placeholder="set password" />
              </div>

              <div className='formgroup' >
                <label for="name" className="col-form-label">
                  <i className="material-icons iconcss">lock_open</i>
                </label>
                <input type="text" id="name" name='cpassword' className="form-control shadow-none border-opacity-25" autoComplete='off'
                  value={User.cpassword}
                  onChange={entervalue}
                  placeholder="comform password" />
              </div>
              <input type="submit" onClick={postdata} className='btn btn-primary mt-4 w-50' name='signup' id='signup' value='register' />
            </form>
          </div>
          <div className="rightimg">
            <figure>
              <img src={Img} alt="registration" className='imgcontrol' />
            </figure>
            <NavLink to='/login' className='signup-image-link ' >Login Here</NavLink>
          </div>


        </div>
      </div>

    </>
  )
}

export default Sigup