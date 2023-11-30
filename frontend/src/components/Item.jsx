import React from 'react';
import './Item.css'; // Ensure this is the correct path to your CSS file

const Item = ({ imageSrc, itemName, price, userName, views }) => {
    return (
        <div className="item">
            <div className="item-image">
                <img src={imageSrc} alt={itemName} />
            </div>
            <div className="item-details">
                <div className="price">Price: {price}</div>
                <div className="item-name">Item: {itemName}</div>
                <div className="user-info">
                    <span className="username">{userName}</span>
                    <span className="views">{views}</span>
                </div>
            </div>
        </div>
    );
};

export default Item;
