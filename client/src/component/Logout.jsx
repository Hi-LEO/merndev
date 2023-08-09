import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Logout() {
  const Navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

      },
      credentials: 'include'

    }).then((res) => {
      Navigate('/login', { replace: true })
      if (!res.status != 200) {
        const error = new Error(res.error)
        throw error;
      }
    }).catch((err) => {
      console.log(err)
    })
  })

  return (
    <div> you have Logout</div>
  )
}

export default Logout