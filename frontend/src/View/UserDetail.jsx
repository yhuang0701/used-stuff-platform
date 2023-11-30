import React from 'react';
import Item from '../components/Item';
import './UserDetail.css';
import userimg from '../assets/panda.jpeg';
import ReactLogo from '../assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {
    // Array of item data, potentially fetched from an API
    const itemsData = [
        {
            imageSrc:ReactLogo,
            itemName: 'React Framework',
            price: '$20',
            userName: 'Developer',
            views: '1000 views'
        },
        {
            imageSrc:ReactLogo,
            itemName: 'React Framework',
            price: '$20',
            userName: 'Developer',
            views: '1000 views'
        },
        {
            imageSrc:ReactLogo,
            itemName: 'React Framework',
            price: '$20',
            userName: 'Developer',
            views: '1000 views'
        }
    ];

    // Function to render items
    const renderItems = () => {
        return itemsData.map((item, index) => (
            <Item key={index} {...item} />
        ));
    };

    return (
        <div className="item-detail-page">
            <div className="user-image-frame">
                <img src={userimg} alt="User" />
            </div>
            <h1>User-xxx</h1>
            <div className="rating">Rating: 4.8/5.0</div>
            <button className="contact-button">
                <FontAwesomeIcon icon={faEnvelope} />
            </button>
            <div className="item-container">
                {renderItems()}
            </div>
        </div>
    );
};

export default UserDetail;
