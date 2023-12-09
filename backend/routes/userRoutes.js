const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

router.post('/signup', registerUser);
router.post('/signin', loginUser);

router.get('/all', getAllUsers);


module.exports = router;