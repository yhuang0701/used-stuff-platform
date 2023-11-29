import React from 'react';
import Item from '../components/Item';
import './ItemDetail.css'; // Make sure the path to the CSS file is correct

const ItemDetail = () => {
    // Data for the item, potentially fetched from an API
    const itemData = {
        itemName: 'React Framework',
        price: '$20',
        userName: 'Developer',
        views: '1000 views'
    };
    const itemData1 = {
        itemName: 'React Framework',
        price: '$20',
        userName: 'Developer',
        views: '1000 views'
    };
    const itemData3 = {
        itemName: 'React Framework',
        price: '$20',
        userName: 'Developer',
        views: '1000 views'
    };

    // Placeholder for user image, replace with actual image path as needed
    const userImageSrc = 'path-to-user-image.jpg';

    return (
        <div className="item-detail-page">
            <div className="user-image-frame">
                <img src={userImageSrc} alt="User" />
            </div>
            <h1>User-xxx</h1>
            <div className="rating">Rating: 4.8/5.0</div>
            {/* The contact-info is now a button */}
            <button className="contact-button">Contact</button>
            <div className="item-container">
                <Item {...itemData} />
                <Item {...itemData1} />
                <Item {...itemData3} />
            </div>
        </div>
    );
};

export default ItemDetail;
