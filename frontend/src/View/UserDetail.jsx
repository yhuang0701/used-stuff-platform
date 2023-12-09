import React, {useState,useEffect} from 'react';
import Item from '../components/Item';
import './UserDetail.css';
import userimg from '../assets/panda.jpeg';
import ReactLogo from '../assets/react.svg';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {

    const [userData, setUserData] = useState({
        userName: 'Default User',
        rating: '4.8',
        email: 'z18819828123@gmail.com',
        _id: "656ffec0931a250a4c348812" // or some default ID if applicable
    });
    const [itemsData, setItemsData] = useState([]);
    const [likedItems, setLikedItems] = useState({});
    const [items, setItems] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:5003/api/users/656ffec0931a250a4c348812')
            .then(response => {
                if (response.data && response.data.data) {
                    setUserData(response.data.data);
                } else {
                    console.log('No user data found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const fetchData = async (userId) => {
        try {
            console.log(userId)
            //const response = await axios.get(`http://localhost:5003/api/items?userId=${userId}`);
            //const query = encodeURIComponent(JSON.stringify({ "_id": userId }));
            const url = "http://localhost:5003/api/items?where{"+userId+"}";

            const response = await axios.get(url);

            const itemsList = response.data.data.map(item => ({
                imageSrc: item.images && item.images.length > 0 ? "http://localhost:5003"+item.images[0] : ReactLogo,
                itemName: item.name,
                price: item.price,
                userName: item.userID,
                postDate: item.postDate,
                sold: item.sold,
                like: false
            }));
            return itemsList;
        } catch (error) {
            console.error('There was a problem fetching the item data:', error);
        }
    };

    useEffect(() => {
        console.log('Current userData._id:', userData ? userData._id : 'undefined');

        // Check if userData is defined and has a valid _id
        if (userData && userData._id) {
            fetchData(userData._id).then(fetchedItems => {
                setItems(fetchedItems || []);
            });
        }
    }, [userData]); // Dependency on userData


    const toggleLike = (itemId) => {
        setLikedItems(prevLikedItems => ({
            ...prevLikedItems,
            [itemId]: !prevLikedItems[itemId]
        }));
    };

    const renderItems = () => {
        return items.map((item, index) => (
            <Item
                key={index}
                {...item}
                liked={likedItems[index]}
                toggleLike={() => toggleLike(index)}
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


            <button className="contact-button" >
                <a href={`mailto:${userData && userData.email ? userData.email : 'z18819828123@gmail.com'}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </button>


            <div className="item-container">

                {renderItems()}
            </div>
        </div>
    );
};

export default UserDetail;
