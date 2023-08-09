const jwt = require("jsonwebtoken")
const usre = require('../model/userScama')

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.six;
    const verifytoken = jwt.verify(token, process.env.secret)

    const rootuser = await usre.findOne({ _id: verifytoken._id, "tokens.token": token })
    if (!rootuser) {
      throw new Error(("User not Found"));
    }
    req.token = token;
    req.rootuser = rootuser;
    req.userid = rootuser.id;
    next();

  } catch (error) {
    res.status(401).send("unauthorized : No token")
    console.log(error)
  }

}


module.exports = authentication;