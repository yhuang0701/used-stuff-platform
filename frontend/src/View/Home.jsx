import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Item from '../components/Item';
import "slick-carousel/slick/slick.css"; 


function Home() {
  const [items, setItems] = useState([]);
  const [numItemsToShowF, setNumItemsToShowF] = useState(5);
  const [numItemsToShowB, setNumItemsToShowB] = useState(5);
  const [numItemsToShowC, setNumItemsToShowC] = useState(5);

  // Custom arrow component for previous button
const CustomPrevArrow = (props) => (
  <div
    {...props}
    className="slick-arrow slick-prev"
    style={{ bottom: '0px', left: '10px', zIndex: 1 }}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

// Custom arrow component for next button
const CustomNextArrow = (props) => (
  <div
    {...props}
    className="slick-arrow slick-next"
    style={{ bottom: '0px', right: '10px', zIndex: 1 }}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    appendDots: dots => (
      <div
        style={{
          bottom: '-10px',
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <ul style={{ listStyle: 'none',
          padding: '0',
          display: 'flex', 
          justifyContent: 'center' }}>{dots}</ul>
      </div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  useEffect(() => {
    // Fetch data from your API
    fetch('https://used-stuff-platform.onrender.com/api/items')
      .then(response => response.json())
      .then(data => setItems(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts


  const FurnitureItems = items
    .filter(item => item.label.includes('Furniture'))
    .slice(0, numItemsToShowF)
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
    .slice(0, numItemsToShowC)
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
    .slice(0, numItemsToShowB)
    .map(item => ({
      imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com" + item.images[0] : ReactLogo,
      itemName: item.name,
      price: item.price,
      userName: item.userID,
      postDate: item.postDate,
      sold: item.sold,
      like: false
    }));

  const handleMoreClickF = () => {
    setNumItemsToShowF(prevNumItems => prevNumItems + 5);
  };
  const handleMoreClickB = () => {
    setNumItemsToShowB(prevNumItems => prevNumItems + 5);
  };
  const handleMoreClickC = () => {
    setNumItemsToShowC(prevNumItems => prevNumItems + 5);
  };

  const handleLessClickF = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowF(prevNumItems => Math.max(5, prevNumItems - 5));
  };

  const handleLessClickB = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowB(prevNumItems => Math.max(5, prevNumItems - 5));
  };

  const handleLessClickC = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowC(prevNumItems => Math.max(5, prevNumItems - 5));
  };



  console.log("items: " + items);
  console.log("bookitems: " + bookItems);
  console.log("furnitureitems: " + FurnitureItems);
  console.log("clothtimes: " + clothItems);


  return (
    <div className="home-page">
      {/* Carousel Section */}
      
      <div className="carousel-section">
        <h2>Featured Items</h2>
        <Slider {...carouselSettings}>
          {/* Featured Item 1 */}
          <div class = "carousel-image-container">
            <img src="https://m.media-amazon.com/images/I/71DL+S6ihBL._AC_SY300_SX300_.jpg" alt="Featured Item 1" />
            <div class="carousel-image-overlay"></div>
          </div>
          {/* Featured Item 2 */}
          <div class = "carousel-image-container">
            <img src="https://m.media-amazon.com/images/I/61gKkYQn6lL.__AC_SY300_SX300_QL70_FMwebp_.jpg" alt="Featured Item 2" />
            <div class="carousel-image-overlay"></div>
          </div>
          {/* Featured Item 3 */}
          <div class = "carousel-image-container">
            <img src="https://m.media-amazon.com/images/I/71v0BQo8T8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" />
            <div class="carousel-image-overlay"></div>
          </div>
          {/* Featured Item 4 */}
          <div class = "carousel-image-container">
            <img src="https://m.media-amazon.com/images/I/71eXjkfeO8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="Featured Item 4" />
            <div class="carousel-image-overlay"></div>
          </div>
          {/* Featured Item 5 */}
          <div class = "carousel-image-container">
            <img src="https://m.media-amazon.com/images/I/71kLT+J4CGL._AC_SY300_SX300_.jpg" alt="Featured Item 5" />
            <div class="carousel-image-overlay"></div>
          </div>
        </Slider>
      </div>



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
        <button className="more" onClick={handleMoreClickF}>
          Show More
        </button>
        {numItemsToShowF > 5 && (
          <button className="less" onClick={handleLessClickF}>
            Show Less
          </button>
        )}
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
        <button className="more" onClick={handleMoreClickC}>
          Show More
        </button>
        {numItemsToShowC > 5 && (
          <button className="less" onClick={handleLessClickC}>
            Show Less
          </button>
        )}
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
        <button className="more" onClick={handleMoreClickB}>
          Show More
        </button>
        {numItemsToShowB > 5 && (
          <button className="less" onClick={handleLessClickB}>
            Show Less
          </button>
        )}
      </div>
    </div>

  );
}

export default Home;