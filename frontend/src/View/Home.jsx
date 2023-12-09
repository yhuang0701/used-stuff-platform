import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Item from '../components/Item';


function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://used-stuff-platform.onrender.com/api/items')
      .then(response => response.json())
      .then(data => setItems(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts




  const FurnitureItems = items
    .filter(item => item.label.includes('Furniture'))
    .map(item => ({
      imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com" + item.images[0] : ReactLogo,
      itemName: item.name,
      price: item.price,
      userName: item.userID,
      postDate: item.postDate,
      sold: item.sold,
      like: false
    }));


  const clothItems = items
    .filter(item => item.label.includes('Cloth'))
    .map(item => ({
      imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com" + item.images[0] : ReactLogo,
      itemName: item.name,
      price: item.price,
      userName: item.userID,
      postDate: item.postDate,
      sold: item.sold,
      like: false
    }));

  // Filter items with the label "book"
  const bookItems = items
    .filter(item => item.label.includes('Book'))
    .map(item => ({
      imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com" + item.images[0] : ReactLogo,
      itemName: item.name,
      price: item.price,
      userName: item.userID,
      postDate: item.postDate,
      sold: item.sold,
      like: false
    }));



  console.log("items: " + items);
  console.log("bookitems: " + bookItems);
  console.log("furnitureitems: " + FurnitureItems);
  console.log("clothtimes: " + clothItems);


  return (
    <div className="home-page">
      {/* Carousel Section */}
      {/* ... (same as before) */}


      {/* Furniture Section */}
      <div className="furniture-section">
        <h2>Furniture</h2>
        <div className="items">
          {FurnitureItems.map(item => (
            <Item
              key={item._id}
              imageSrc={item.imageSrc}
              itemName={item.itemName}
              price={item.price}
              Sold={item.sold}
              like={false}
            />
          ))}
        </div>
        <button className="more">More</button>
      </div>


      {/* Cloth Section */}
      <div className="cloth-section">
        <h2>Cloth</h2>
        <div className="items">
          {clothItems.map(item => (
            <Item
              key={item._id}
              imageSrc={item.imageSrc}
              itemName={item.itemName}
              price={item.price}
              Sold={item.sold}
              like={false}
            />
          ))}
        </div>
        <button className="more">More</button>
      </div>

      {/* Books Section */}
      <div className="books-section">
        <h2>Books</h2>
        <div className="items">
          {bookItems.map(item => (
            <Item
              key={item._id}
              imageSrc={item.imageSrc}
              itemName={item.itemName}
              price={item.price}
              Sold={item.sold}
              Lotation={item.locations}
              like={false}
            />
          ))}
        </div>
        <button className="more">More</button>
      </div>
    </div>




  );
}

export default Home;
