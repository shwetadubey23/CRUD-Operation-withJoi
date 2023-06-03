const express = require('express');
const { registerUser, login } = require('../controller/userController');

const { authentication, authorisation } = require("../middlewares/auth.js");
const { updateUser, getAllUsers, getUserById, deleteUserById } = require('../controller/curdController');
const { loginValidation, registervalidate, updateValidation } = require('../validator/validation');
const router = express.Router()



router.post('/register', registervalidate, registerUser)
router.post('/login', loginValidation, login)



router.put("/user/:userId", authentication, authorisation, updateValidation, updateUser)

router.get("/getUser",  getAllUsers)

router.get("/getUser/:userId", authentication, authorisation, getUserById)

router.delete("/deleteUsre/:userId", authentication, authorisation, deleteUserById)





module.exports = router
