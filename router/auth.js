const express = require("express")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const authentication = require("../middleware/authentication")
const router = express.Router();
const cors = require("cors")

require("../db/conn")
const User = require("../model/userScama")
router.get('/', async (req, res) => {
  res.send("this is router page");
});

router.post('/register', async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "please fllied the blank" })
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ exist: " Email is already exist" });
    } else if (password != cpassword) {
      return res.status(401).json({ error: "password are not match" })
    } else {
      const user = new User({ name, email, phone, password, cpassword })
      // we are saveing user data in next line
      await user.save();
      return res.status(201).json({ sucess: " success registeration" });


    }


  } catch (err) {
    console.log(err);
  }


})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {

    if (!email || !password) {
      return res.status(408).json({ massage: "not match" })
    }

    const userlogin = await User.findOne({ email: email })
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);



      if (!isMatch) {
        res.status(400).json({ error: "invalid credientials" })
      } else {

        const token = await userlogin.generagteAuthToken();

        res.cookie("six", token, {
          httpOnly: true
        });

        res.status(206).json({ massage: " user sigin successfull" })
      }
    } else {
      res.status(400).json({ error: "invalid credintial" })
    }
  } catch (err) {
    console.log(err)
  }

})



// we are creating about us page in the node js using router

router.get('/about', authentication, (req, res) => {
  res.send(req.rootuser)
})

// wer are creating contect page in node js

router.get('/getdata', authentication, (req, res) => {
  res.send(req.rootuser)
})

// contect use page

router.post('/contect', authentication, async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const massage = req.body.massage;
    // console.log("thils is" + name)
    // console.log("thils is" + email)
    // console.log("thils is" + phone)
    // console.log("thils is" + massage)
    // console.log(req.body)
    if (!name || !email || !phone || !massage) {
      console.log("error in contect page")
      return res.json({ error: "plzz fill the all contect page" })
    }

    const usercontect = await User.findOne({ _id: req.userid });
    if (usercontect) {
      const usermassage = await usercontect.addmassages(name, email, phone, massage);
      await usercontect.save();
      res.status(201).json({ massage: "user contect successful" })
    }

  } catch (err) {
    console.log(err)
  }
})

// I am creating logout page in node js working on srever backend

router.get("/logout", authentication, (req, res) => {
  res.clearCookie('six', { path: '/' })
  res.status(200).send("User logout")
})


module.exports = router;