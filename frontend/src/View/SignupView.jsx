import React, { useState } from 'react';
import axios from 'axios';
import './SignupView.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    contact: '',
    items: '',
    rating: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', formData);
      console.log(response.data);
      // Handle post-signup logic here (e.g., redirect to login)
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle errors here (e.g., show error message)
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" required />
        </label>
        
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </label>
        
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </label>
        
        <label>
          Contact
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
        </label>
        
        <label>
          Items
          <input type="text" name="items" value={formData.items} onChange={handleChange} placeholder="Items" />
        </label>
  
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
  
  
};

export default SignUp;
