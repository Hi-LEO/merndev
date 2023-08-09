const mongoose = require('mongoose')


const DB = `mongodb+srv://${process.env.password}:${process.env.cpassword}@cluster1.svyukxb.mongodb.net/mernstack`
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("not connected"));