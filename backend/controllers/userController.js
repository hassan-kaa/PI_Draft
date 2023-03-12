let UserModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authenticateToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      req.userId = decoded.userId;
      getUser(req,res);
    });
  }
  
const getUser=(req, res) => {
    UserModel.findById(req.userId).then((data)=>{
      res.json(data)
    }).catch(err=>res.status(400).json(err))
  }

const getAllUsers=(req,res)=>{
    UserModel.find().then((data)=>res.json(data)).catch(err=>res.status(400).json(err))

}
const addUser=(req,res)=>{
   const newUser = new UserModel(req.body)
    newUser.save()
            .then(()=>res.json('User added successfully !'))
             .catch(err=>res.status(400).json('Error: '+err))
    
}

const loginUser =  async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ message: "user does not exist" });

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ message: "Invalid email or password" ,passwordMatch : password , password : user.password});
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }}
module.exports = {addUser,getAllUsers,loginUser,getUser,authenticateToken} ; 