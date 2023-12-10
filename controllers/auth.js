import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Register
export const register = async (req, res) => {
  try {

    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (username.length === 0 || password.lenght === 0) {
      return res.status(404).json({
        messange: 'Password or Username missing',
      })
    }

    if (isUsed) {
      return res.status(402).json({
        messange: 'Person with this username is used',
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username: username,
      password: hash
    })

    await newUser.save()

    res.status(200).json({
      newUser,
      messange: 'Person created'
    })

  } catch (error) {
    res.status(400).json({
      messange: 'Person uncreated'
    })
  }

}

//Login
export const login = async (req, res) => {
  try {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      res.status(404).json({
        messange: 'User is undefined'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.json({
        messange: "Password is not correct"
      })
    }

    const token = jwt.sign({
      id: user._id,
    }, 
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' })

    res.json({
      token,user, messange: "Login is successful"
    })

  } catch (error) {
    res.status(400).json({
      messange: 'Error on server'
    })
  }
}

//Get me
export const getMe = async (req, res) => {
  try {

  } catch (error) {

  }
}
