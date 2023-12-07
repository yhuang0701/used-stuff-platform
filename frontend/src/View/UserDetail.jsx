import React, {useState,useEffect} from 'react';
import Item from '../components/Item';
import './UserDetail.css';
import userimg from '../assets/panda.jpeg';
import ReactLogo from '../assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {

    const [userData, setUserData] = useState(null);

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

    useEffect(() => {
        fetch('http://localhost:5003/api/users/656fe993d233e45760ddf7ef')
            .then(response => {
                console.log('response received',response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data ) {
                    setUserData(data.data);
                } else {
                    console.log('No user data found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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

            <h1>{userData ? userData.userName : 'Default User'}</h1>
            <div className="rating">Rating: {userData ? userData.rating: '4.8'}/5.0</div>
            <button className="contact-button">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href={`mailto:${userData && userData.email ? userData.email : 'uiuc.com'}`}></a>

            </button>
            <div className="item-container">
                {renderItems()}
            </div>
        </div>
    );
};

export default UserDetail;
