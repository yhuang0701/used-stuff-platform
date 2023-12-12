import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import './SigninView.css'
import { useAuth } from './AuthContext';

const SignIn = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        userName: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log("userDate: ", userData)
            const response = await axios.post('https://used-stuff-platform.onrender.com/api/users/signin', userData);
            // localStorage.setItem('token', response.data.token);
            // localStorage.setItem('userID', response.data.userID);
            console.log("sign in response", response)

            // login({
            //     userName:userData.userName,
            //     userID : userData._id,
            //     token:response.data.token
            // });

            auth.login(response.data)
            // alert(response.data.message); // Or handle the successful login as needed
            alert("successfully logged in !")
            navigate('/home');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error);
                setError(error.response.data.message);
            } else {
                console.log("error: ", error)
                setError('Failed to log in. Please try again later.');
            }
        }
    };

    return (
        <div>
            <div className="sign-in-container">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field-container">
                        <label>Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Link to="/user/signup">Doesn't have an account? Sign Up Here</Link>
                    {error && <p className="error-message">{error}</p>}
                    <input type="submit" value="Sign In" />
                </form>
            </div>

        </div>
    );
};

export default SignIn;
