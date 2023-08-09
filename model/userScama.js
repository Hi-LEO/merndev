const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const userScama = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  cpassword: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    default: Date.now
  },
  massages: [
    {
      name: {
        type: String,
        require: true
      },
      email: {
        type: String,
        require: true
      },
      phone: {
        type: Number,
        require: true
      },
      massage: {
        type: String,
        require: true
      },
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true
      }
    }
  ]
})


userScama.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
})
// we are generating token using of jwt

userScama.methods.generagteAuthToken = async function () {
  try {
    let tokennew = jwt.sign({ _id: this._id }, process.env.secret);
    this.tokens = this.tokens.concat({ token: tokennew });
    await this.save();
    return tokennew;
  } catch (err) {
    console.log(err)
  }
}

// store the massage in mongodb

userScama.methods.addmassages = async function (name, email, phone, massage) {
  try {
    this.massages = this.massages.concat({ name, email, phone, massage });
    await this.save()
    return this.massages;
  } catch (err) {
    console.log(err)
  }

}

const User = mongoose.model('user', userScama);

module.exports = User;