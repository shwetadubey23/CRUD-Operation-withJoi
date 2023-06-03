const userModel = require('../model/userModel');


const updateUser = async (req, res) => {
    try {
      const userData = req.body;
      const userId = req.params.userId
  
     
      // Check if the email is already registered
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const updatedData = await userModel.findByIdAndUpdate(userId, userData, { new: true });

      if (!updatedData) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ success: true, message: 'User updated successfully', data: updatedData });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ success: false, error: error.message });
    }
  };
  

  const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find();
  
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      return res.status(200).json({ success: true, message: users });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };
  

  const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await userModel.findById( userId );
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ success: true, message: user });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };


  const deleteUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await userModel.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };
  
  

  module.exports = { getAllUsers, getUserById, updateUser,  deleteUserById }