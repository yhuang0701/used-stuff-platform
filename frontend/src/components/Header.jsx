// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../View/AuthContext';
import './Header.css'; // Make sure to create a CSS file for styling

const Header = () => {
    // State for the search input
    const [searchInput, setSearchInput] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    // const {user} = useAuth()
    const auth = useAuth()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userID');
    console.log("post item viewwww user ID: ", userId)

    const handlePostNavigation = () => {
        if (userId) {
            navigate('/post');
        } else {
            alert('Please sign in to post items');
            navigate('/user/signin');
        }
    };


    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };


    const handleFilterClick = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    // Function to handle the search submission
    // Replace with your actual search handling logic
    const handleSearchSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (searchInput.trim() === '') {
            // Optionally, display a message to the user
            alert('Please enter a search term.');
            return;
        }

        console.log('Search for:', searchInput);
        // Redirect to the search results page or fetch search results
        navigate(`search?name=${searchInput}`)
    };

    const handleSignOut = () => {
        auth.logout();
        navigate('/home')

    };

    return (
        <header className="header">
            {/* Left side of the header containing Home link and search form */}
            <div className="left-header-section">
                <Link to="/home" className="header-button">Home</Link>

                <div className="search-and-filter">
                    {/* Search form with a text input */}
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <div className="search-box">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchChange}
                                className="search-input"
                                placeholder="Search item..."
                            />
                            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchSubmit} />
                        </div>
                        {/* <div className="header-button" onClick={handleFilterClick}> Filter
                        </div> */}
                    </form>



                    {/* {isFilterVisible && (
                        <div className="filter-options">
                            <div>Option 1</div>
                            <div>Option 2</div>
                        </div>
                    )} */}




                </div>
            </div>


            {/* Right side of the header */}
            <div className="right-header-section">
                {/* <Link to="/post" className="header-button">Post item</Link> */}
                <div onClick={handlePostNavigation} className="header-button">Post item</div>

                <div className="user-info">
                    {/* <Link to="/notifications" className="header-button">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="notifications-icon">1</span>
                    </Link> */}



                    <div className="user-profile-dropdown">
                        {userId ? (
                            <>
                                <Link to="/profile" className="header-button">
                                    <FontAwesomeIcon icon={faUser} /> {/* User profile icon */}
                                </Link>
                                <div className="dropdown-content">
                                    <div onClick={handleSignOut}>Sign Out</div>
                                </div>
                            </>
                        ) : (
                            <Link to="/user/signin" className="header-button">
                                Sign In
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </header>

    );
};

export default Header;
