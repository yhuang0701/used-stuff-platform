import React, {useState} from 'react';
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
            Postdate: '11.30.2023',
            Sold:true,
            like:false
        },
        {
            imageSrc:ReactLogo,
            itemName: 'React Framework',
            price: '$20',
            userName: 'Developer',
            Postdate: '11.30.2023',
            Sold:false,
            like:false
        },
        {
            imageSrc:ReactLogo,
            itemName: 'React Framework',
            price: '$20',
            userName: 'Developer',
            Postdate: '11.30.2023',
            Sold:true,
            like:true
        }
    ];

    const [likedItems, setLikedItems] = useState(
        itemsData.reduce((acc, item, index) => ({ ...acc, [index]: item.like }), {})
    );

    const toggleLike = (itemId) => {
        setLikedItems(prevLikedItems => ({
            ...prevLikedItems,
            [itemId]: !prevLikedItems[itemId]
        }));
    };

    const renderItems = () => {
        return itemsData.map((item, index) => (
            <Item
                key={index}
                {...item}
                liked={likedItems[index]}
                toggleLike={() => toggleLike(index)} // Pass the toggle function specific to the item
            />
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
