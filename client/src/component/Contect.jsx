import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Contect = () => {
  const [getuser, setuser] = useState({ name: "", email: "", phone: "", massage: "" });
  const Navigate = useNavigate()

  const callcontectpage = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata", {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",

        },
        credentials: 'include'

      })
      const data = await res.json();
      console.log(data)
      setuser({ name: data.name, email: data.email, phone: data.phone });
      if (!res.status === 200) {
        console.log("error")
      }
    } catch (error) {
      console.log(" this is the for the token " + error)
      Navigate("/login")
    }
  }



  useEffect(() => {
    callcontectpage()
  }, [])

  const setdata = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...getuser, [name]: value })
  }

  const senddata = async (e) => {
    e.preventDefault();
    const { name, email, phone, massage } = getuser;
    const res = await fetch("http://localhost:5000/contect", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: 'include',

      body: JSON.stringify({
        name, email, phone, massage
      })
    });
    const data = await res.json();
    if (!data) {
      console.log("message not send");

    } else {
      alert("message send")
      setuser({ ...getuser, massage: '' });
    }

  }



  return (
    <>
      <div className="contectcontainer">
        <form method="POST">

          <div className="box1">

            <div className="row p-5 m-3 ">
              <div className="col  firstinput ">
                <label htmlFor="name" className=''>your name</label>
                <input type="text" id='name' name='name' onChange={setdata} readOnly={true} value={getuser.name} className="form-control text-center  w-75" placeholder="First name" aria-label="First name" />
              </div>
              <div className="col ms-3 firstinput ">
                <label htmlFor="name" className=''>your email</label>
                <input type="text" id='name' name='email' onChange={setdata} readOnly={true} value={getuser.email} className="form-control text-center  w-75" placeholder="First name" aria-label="First name" />
              </div>
              <div className="col ms-3 firstinput ">
                <label htmlFor="name" className=''>your phone</label>
                <input type="text" id='name' name='phone' onChange={setdata} readOnly={true} value={getuser.phone} className="form-control text-center  w-75" placeholder="First name" aria-label="First name" />
              </div>

            </div>

          </div>

          <div className="box2">

            <div className="massagebox">
              <label htmlFor="massage">massage:</label>

              <textarea name="massage" value={getuser.massage} onChange={setdata} id="massage" cols="30" rows="8"></textarea>
            </div>
            <button type='submit' onClick={senddata} id='btn'>submit</button>
          </div>
        </form>

      </div>


    </>
  )
}

export default Contect