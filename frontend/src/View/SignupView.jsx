import React, { useState } from 'react';
import axios from 'axios';
import './SignupView.css'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    contact: '',
    items: [],
    liked:[],
    rating: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("sign up user data: ",formData)
      const response = await axios.post('http://127.0.0.1:8000/api/users/signup', formData);
      console.log(response.data);
      alert(response.data.message);
        
      // Handle post-signup logic here (e.g., redirect to login)
      navigate('/user/signin')
    } catch (error) {
        console.log(error)
        // console.log(error.response.status)
        if(error.response.status===500){
          alert("User Name already exists, please try a new one!")
        }
        else{
          alert(error.response.data)
        }
        
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Username</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" required />
        </div>
        
        <div className="form-field">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        
        <div className="form-field">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        
        <div className="form-field">
          <label>Contact</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
        </div>
        
        {/* Other fields... */}
    
        <div className="submit-button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
  
  
  
};

export default SignUp;
