import User from '../models/User.js'
import bcrypt from 'bcryptjs'


//Register
export const register = async (req,res) => {
    try {
      
      const { username, password } = req.body

      const isUsed = await User.findOne({username})

      if(isUsed){
        return res.status(402).json({
          messange: 'Person with this username is used',
        })
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, sait)

      const newUser = new User({
        username,
        password: hash
      })

      await newUser.save()

      res.status(200).json({
          messange: 'Person created'
      })

    } catch (error) {
        console.log(error)
    }

}

//Login
export const login = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

//Get me
export const getMe = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}
