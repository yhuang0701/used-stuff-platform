import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Item from '../components/Item';


function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
      // Fetch data from your API
      fetch('http://localhost:5003/api/items')
          .then(response => response.json())
          .then(data => setItems(data.data))
          .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Filter items with the label "book"
  const bookItems = items.filter(item => item.label.includes('book'));

  const FurnitureItems = items.filter(item => item.label.includes('Furniture'));

  const clothItems = items.filter(item => item.label.includes('cloth'));

  console.log("items: "+ items);
  console.log("bookitems: "+bookItems);
  console.log("furnitureitems: "+FurnitureItems);
  console.log("clothtimes: "+clothItems);


  return (
      <div className="home-page">
          {/* Carousel Section */}
          {/* ... (same as before) */}

          {/* Books Section */}
          <div className="books-section">
              <h2>Books</h2>
              <div className="items">
                  {bookItems.map(item => (
                      <Item
                          key={item._id}
                          imageSrc={item.images[0]} // Assuming the first image is used https://used-stuff-platform.onrender.com/
                          itemName={item.name}
                          price={item.price}
                          Sold={item.sold}
                          Lotation={item.locations}
                          like={false} // You can set the like status based on user preferences or API data
                      />
                  ))}
              </div>
              <button className="more">More</button>
          </div>

          {/* Furniture Section */}
          <div className="Furniture-section">
              <h2>Furniture</h2>
              <div className="items">
                  {FurnitureItems.map(item => (
                      <Item
                          key={item._id}
                          imageSrc={item.images[0]} // Assuming the first image is used
                          itemName={item.name}
                          price={item.price}
                          Sold={item.sold}
                          like={false} // You can set the like status based on user preferences or API data
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
                          imageSrc={item.images[0]} // Assuming the first image is used
                          itemName={item.name}
                          price={item.price}
                          Sold={item.sold}
                          like={false} // You can set the like status based on user preferences or API data
                      />
                  ))}
              </div>
              <button className="more">More</button>
          </div>

      </div>
  );
}

export default Home;
