const router = require('express').Router()
const userController = require('../controllers/userController')

router.get("/getAll",userController.getAllUsers  )
router.post("/register",userController.addUser)
router.post("/login",userController.loginUser);
  // Protected route
router.get('/login', userController.authenticateToken);
module.exports = router ; 