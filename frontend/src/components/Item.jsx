import React, { useState } from 'react';
import './Item.css'; // Ensure this is the correct path to your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'; // regular heart
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'; // solid heart

const Item = ({ imageSrc, itemName, price, userName, Postdate, Sold, like}) => {

    const [liked, setLiked] = useState(like); // initializes liked state to false

    const toggleLike = () => {
        setLiked(!liked); // toggles the liked state
    };

    return (
        <div className="item">
            <div className="item-image" onClick={toggleLike}> {/* Added onClick event */}
                <img src={imageSrc} alt={itemName} />
                <FontAwesomeIcon
                    icon={liked ? fasHeart : farHeart} // Corrected syntax
                    color={liked ? 'red' : 'grey'}
                    className="like-icon"
                />
            </div>
            <div className="item-details">
                <div className="price">Price: {price}</div>
                <div className="item-name">Item: {itemName}</div>
            </div>
            <div className="user-info-and-status">
                <div className="status-display">
                    {Sold ? 'In Stock' : 'Out of Stock'}
                </div>
            </div>
        </div>
    );
};

export default Item;
