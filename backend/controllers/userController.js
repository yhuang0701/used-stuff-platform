// @desc     Register a new user
// @route    /users
// @access   Public
// const registerUser = (req, res) => {
//   res.send('Register Route');
// }

const UserInfo = require('../models/UserInfo')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  console.log("Request Body:", req.body);
  const { userName, password, rating, email, contact, items, favorite } = req.body;

  try {
    // Create new user
    const salt = await bcrypt.genSalt(10); //create salt for hash
    // password = await bcrypt.hash(password, salt); // Hash password before saving 

    //TODO: Check if username already exist




    const user = new UserInfo({ userName, email, password });
    user.password = await bcrypt.hash(user.password, salt);
    console.log("new User: ", user);

    if (rating) {
      user.rating = rating;
    }
    else {
      user.rating = 0;
    }

    if (contact) {
      user.contact = contact
    }

    if (items) {
      user.items = items
    }

    if (favorite) {
      user.favorite = favorite
    }

    await user.save();
    console.log("Saved User:", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error saving to datebase: ', error);
    res.status(500).send('Error registering new user. Please try again.');
  }
};


// @desc     Login a new user
// @route    /users/login
// @access   Public
const loginUser = async (req, res) => {
  console.log("Request Body:", req.body);
  const { userName, password } = req.body;

  try {
    // Check if the user exists
    const user = await UserInfo.findOne({ userName });
    console.log('found user and user info: ', user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // User authenticated successfully, generate JWT
    const payload = {
      user: {
        id: user._id, // user's unique ID from the database
        userName: user.userName // additional user information
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing token: ', err);
        return res.status(500).send('Error during token generation.');
      }
      // Send token and user ID to the client
      res.json({ token, userId: user._id });
    });
  } catch (error) {
    console.error('Error logging in the user: ', error);
    res.status(500).send('Server error during login.');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users.');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
}
