import React, {useState,useEffect} from 'react';
import Item from '../components/Item';
import './UserDetail.css';
import userimg from '../assets/panda.jpeg';
import ReactLogo from '../assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {

    const [userData, setUserData] = useState(null);
    const [itemsData, setItemsData] = useState([]);
    const [likedItems, setLikedItems] = useState({});
    const [items, setItems] = useState([]);



    const MockData = [
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

    // Array of item data, potentially fetched from an API




    useEffect(() => {
        fetch('http://localhost:5003/api/users/656ffec0931a250a4c348812')
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

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/items'); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            // Assuming the API returns an array of items:
            const itemsList = data.data.map(item => ({
                imageSrc: item.images && item.images.length > 0 ? "http://localhost:5003"+item.images[0] : ReactLogo, // Use the first image if available, otherwise a default
                itemName: item.name,
                price: "20",
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
        fetchData().then(fetchedItems => {
            setItems(fetchedItems); // Set the items in state
            // Assuming you want all items to be unliked initially
            //setLikedItems(fetchedItems.map(item => false));
        });
    }, []); // Empty dependency array to only run once on mount



    const toggleLike = (itemId) => {
        setLikedItems(prevLikedItems => ({
            ...prevLikedItems,
            [itemId]: !prevLikedItems[itemId]
        }));
    };

    const renderItems = () => {
        fetchData().then(itemsList => {
            // Do something with itemsList, like setting state in a React component
            console.log(itemsList);
        });
        console.log(MockData)
        console.log([itemsData])
        return items.map((item, index) => (
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
