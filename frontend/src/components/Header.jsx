// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faBell, faSearch} from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Make sure to create a CSS file for styling

const Header = () => {
    // State for the search input
    const [searchInput, setSearchInput] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);


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
        event.preventDefault();
        console.log('Search for:', searchInput);
        // Redirect to the search results page or fetch search results
    };

    return (
        <header className="header">
            {/* Left side of the header containing Home link and search form */}
            <div className="left-header-section">
                <Link to="/" className="header-button">Home</Link>

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
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                        <div className="header-button" onClick={handleFilterClick}> Filter
                        </div>
                    </form>



                    {isFilterVisible && (
                        <div className="filter-options">
                            {/* Render your filter options here */}
                            <div>Option 1</div>
                            <div>Option 2</div>
                            {/* ... more options */}
                        </div>
                    )}




                </div>
            </div>


            {/* Right side of the header */}
            <div className="right-header-section">
                <Link to="/post" className="header-button">Post item</Link>

                <div className="user-info">
                    <Link to="/notifications" className="header-button">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="notifications-icon">1</span>
                    </Link>
                    <div className="user-profile-dropdown">
                        <Link to="/UserDetail" className="header-button">
                            <FontAwesomeIcon icon={faUser} /> {/* User profile icon */}
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/signin">Sign In</Link>
                            <Link to="/signout">Sign Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
