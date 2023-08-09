import React, { useEffect, useState } from 'react'
import Img from '../assets/first.jpg'
import { Navigate, useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
const About = () => {
  const [getuser, setuser] = useState([]);
  const Navigate = useNavigate()



  const callaboutpage = async () => {
    try {
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        credentials: 'include'

      })
      const data = await res.json();
      setuser(data);
      if (!res.status === 200) {
        console.log("error")
      }
    } catch (error) {
      console.log(" this is the for the token " + error)
      Navigate("/login")
    }
  }

  useEffect(() => {
    callaboutpage()
  }, [])

  return (

    <>
      <div className="aboutpage">
        <h1>Welcom to this about page</h1>
        <h4>your emial: <span id='userid'>
          {getuser.email}
        </span>
        </h4>
        <h4>your name: <span id='userid'>{getuser.name}</span> </h4>
        <h4>your phone: <span id='userid'>{getuser.phone}</span></h4>
      </div >


    </>
  )
}

export default About