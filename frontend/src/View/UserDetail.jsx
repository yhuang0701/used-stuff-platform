import React, {useState,useEffect} from 'react';
import Item from '../components/Item';
import './UserDetail.css';
import userimg from '../assets/panda.jpeg';
import ReactLogo from '../assets/react.svg';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail'; 
import Modal from '../components/Modal';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {

    const [userData, setUserData] = useState({
    });
    const [likedItems, setLikedItems] = useState({});
    const [items, setItems] = useState([]);
    const location = useLocation();
    const [userId, setUserId] = useState("");

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Access the state property from the location object
        const state = location.state;
        const id = state.userId // use a default ID if state.userId is undefined
        setUserId(id);
    }, [location]);


    // http://localhost:5003/api/users/:id

    useEffect(() => {
        //const userid = "656ffec0931a250a4c348812"
        console.log(userId)
        const url = 'https://used-stuff-platform.onrender.com/api/users/'+userId
        console.log(url)
        axios.get(url )
            .then(response => {
                if (response.data && response.data.data) {
                    console.log(response.data.data)
                    setUserData(response.data.data);
                } else {
                    console.log('No user data found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [userData]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
      };
    
    const closeItemDetail = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const fetchData = async (userId) => {
        try {
            console.log(userId)

            //https://used-stuff-platform.onrender.com/api/items?where={"userID": "656ffec0931a250a4c348812"}

            const url = "https://used-stuff-platform.onrender.com/api/items?where={\"userID\":\"" + userId +"\"}";

            console.log(url)


            const response = await axios.get(url);

            const itemsList = response.data.data.map(item => ({
                imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com"+item.images[0] : ReactLogo,
                itemName: item.name,
                price: item.price,
                userName: item.userID,
                postDate: item.postDate.toString(),
                sold: item.sold,
                label: item.label,
                locations: item.locations,
                description: item.description,
                like: false,
            }));
            return itemsList;
        } catch (error) {

            console.error('There was a problem fetching the item data:', error);
        }
    };

    useEffect(() => {
            fetchData(userId).then(fetchedItems => {
                setItems(fetchedItems || []);
            });
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
                onDetailClick={() => handleItemClick(item)} 
            />
        ));
    };

    return (
        <div className="item-detail-page">
            <div className="user-image-frame">
                <img src={userimg} alt="User" />
            </div>

            <h1>{userData ? userData.userName : 'Default User'}</h1>
            <div className="rating">Rating: 5.0/5.0</div>


            <button className="contact-button" >
                <a href={`mailto:${userData && userData.email ? userData.email : 'z18819828123@gmail.com'}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </button>


            <div className="item-container">

                {renderItems()}
            </div>

            {/* Render the ItemDetail component if an item is selected */}
            {isModalOpen && (
                <Modal onClose={closeItemDetail}>
                <ItemDetail selectedItem={selectedItem} onClose={closeItemDetail} />
                </Modal>
            )}

        </div>
    );
};

export default UserDetail;
