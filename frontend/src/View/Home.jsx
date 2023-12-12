import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Item from '../components/Item';
import "slick-carousel/slick/slick.css"; 
import ItemDetail from '../components/ItemDetail'; 
import Modal from '../components/Modal';

const ReactLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';


function Home() {
  const [items, setItems] = useState([]);
  const [itemsPerLine, setItemsPerLine] = useState(calculateItemsPerLine());
  const [numItemsToShowF, setNumItemsToShowF] = useState(itemsPerLine);
  const [numItemsToShowB, setNumItemsToShowB] = useState(itemsPerLine);
  const [numItemsToShowC, setNumItemsToShowC] = useState(itemsPerLine);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    const handleResize = () => {
      setItemsPerLine(calculateItemsPerLine());
      // Adjust the number of items to show based on the new itemsPerLine value
      setNumItemsToShowF(itemsPerLine);
      setNumItemsToShowB(itemsPerLine);
      setNumItemsToShowC(itemsPerLine);
    };

    // Attach the event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerLine]);

  function calculateItemsPerLine() {
    // Adjust this logic based on responsive design requirements
    const windowWidth = window.innerWidth;
    if(windowWidth>=1600){
      return 6; // LLL screens
    } else if(windowWidth>=1330){
      return 5; // LL screens
    } else if (windowWidth >= 1060) {
      return 4; // Large screens
    } else if (windowWidth >= 790) {
      return 3; // Medium screens
    } else {
      return 2; // Small screens
    }
  }

  function totalLength(string) {
    return items.filter(item => item.label.includes(string)).length
  }


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
      label: item.label,
      locations: item.locations,
      description: item.description,
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
      label: item.label,
      locations: item.locations,
      description: item.description,
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
      label: item.label,
      locations: item.locations,
      description: item.description,
      like: false
    }));

  const handleMoreClickF = () => {
    setNumItemsToShowF(prevNumItems => prevNumItems + calculateItemsPerLine());
  };
  const handleMoreClickB = () => {
    setNumItemsToShowB(prevNumItems => prevNumItems + calculateItemsPerLine());
  };
  const handleMoreClickC = () => {
    setNumItemsToShowC(prevNumItems => prevNumItems + calculateItemsPerLine());
  };

  const handleLessClickF = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowF(calculateItemsPerLine());
  };

  const handleLessClickB = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowB(calculateItemsPerLine());
  };

  const handleLessClickC = () => {
    // Decrease the number of items to show by 5, but not less than 5
    setNumItemsToShowC(calculateItemsPerLine());
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeItemDetail = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };



  console.log("items: " + items);
  console.log("bookitems: " + bookItems);
  console.log("furnitureitems: " + FurnitureItems);
  console.log("clothtimes: " + clothItems);


  return (
    <div className="home-page">
      {/* Carousel Section */}
      
      <div className="carousel-section">
        <h2>Featured Items!!!</h2>
        <Slider {...carouselSettings}>
          {/* Featured Item 1 */}
          <div class = "carousel-image-container">
          <a href="https://www.amazon.com/gp/aw/d/B0BSP51S36/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=4aa81c8273b4e027cafc79aa6df65e33&hsa_cr_id=0&qid=1702412173&sr=1-1-9e67e56a-6f64-441f-a281-df67fc737124&ref_=sbx_be_s_sparkle_sccd_asin_0_img&pd_rd_w=r2pwK&content-id=amzn1.sym.417820b0-80f2-4084-adb3-fb612550f30b%3Aamzn1.sym.417820b0-80f2-4084-adb3-fb612550f30b&pf_rd_p=417820b0-80f2-4084-adb3-fb612550f30b&pf_rd_r=C3G6JPDF703TKNTSC273&pd_rd_wg=MMglw&pd_rd_r=b2f4ef75-e99c-46b4-aa1d-be744ec23507&th=1" target="_blank">
            <img src="https://m.media-amazon.com/images/I/71DL+S6ihBL._AC_SY300_SX300_.jpg" alt="Featured Item 1" />
            <div class="carousel-image-overlay"></div>
          </a>
          </div>
          {/* Featured Item 2 */}
          <div class = "carousel-image-container">
          <a href="https://www.amazon.com/A315-24P-R7VH-Display-Quad-Core-Processor-Graphics/dp/B0BS4BP8FB/ref=lp_565108_1_3?pf_rd_p=53d84f87-8073-4df1-9740-1bf3fa798149&pf_rd_r=2DTSQ92Q6K887G28SSX3&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&ufe=app_do%3Aamzn1.fos.17d9e15d-4e43-4581-b373-0e5c1a776d5d" target="_blank"> 
            <img src="https://m.media-amazon.com/images/I/61gKkYQn6lL.__AC_SY300_SX300_QL70_FMwebp_.jpg" alt="Featured Item 2" />
            <div class="carousel-image-overlay"></div>
          </a>  
          </div>
          {/* Featured Item 3 */}
          <div class = "carousel-image-container">
          <a href="https://www.amazon.com/ASUS-ROG-Strix-Gaming-Laptop/dp/B0BV8H8HVD/ref=lp_565108_1_4?pf_rd_p=53d84f87-8073-4df1-9740-1bf3fa798149&pf_rd_r=4XDETMQY5S06TYGG3CWJ&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&ufe=app_do%3Aamzn1.fos.765d4786-5719-48b9-b588-eab9385652d5&th=1" target="_blank">   
            <img src="https://m.media-amazon.com/images/I/71v0BQo8T8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" />
            <div class="carousel-image-overlay"></div>
            </a>    
          </div>
          {/* Featured Item 4 */}
          <div class = "carousel-image-container">
          <a href="https://www.amazon.com/MSI-Thin-144Hz-Gaming-Laptop/dp/B0BT3CD75G/ref=sr_1_8?qid=1702412462&s=pc&sr=1-8&ufe=app_do%3Aamzn1.fos.2b70bf2b-6730-4ccf-ab97-eb60747b8daf&th=1" target="_blank">
            <img src="https://m.media-amazon.com/images/I/71eXjkfeO8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="Featured Item 4" />
            <div class="carousel-image-overlay"></div>
            </a>
          </div>
          {/* Featured Item 5 */}
          <div class = "carousel-image-container">
            <a href="https://www.amazon.com/ASUS-i7-12700H-ScreenPad-Celestial-UX582ZW-AB76T/dp/B09TPTNZLG/ref=sr_1_3?keywords=ASUS%2BZenbook%2Bpro&qid=1702412630&s=pc&sr=1-3&ufe=app_do%3Aamzn1.fos.17f26c18-b61b-4ce9-8a28-de351f41cffb&th=1" target="_blank">
            <img src="https://m.media-amazon.com/images/I/71kLT+J4CGL._AC_SY300_SX300_.jpg" alt="Featured Item 5" />
            <div class="carousel-image-overlay"></div>
            </a>
          </div>

          {/* Featured Item 6 */}
          <div class = "carousel-image-container">
            <a href="https://www.amazon.com/Alienware-m18-AMD-Gaming-Laptop/dp/B0CDCJRB35/ref=sr_1_1_sspa?keywords=alienware&qid=1702412703&s=pc&sr=1-1-spons&ufe=app_do%3Aamzn1.fos.05107ab3-5190-4335-82f9-b94a77e0e924&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1" target="_blank">
            <img src="https://www.hidevolution.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/1/m16_amd_01_2.png" alt="Featured Item 6" />
            <div class="carousel-image-overlay"></div>
            </a>
          </div>

          {/* Featured Item 7 */}
          <div class = "carousel-image-container">
            <a href="https://www.amazon.com/ASUS-Gaming-Laptop-Nebula-Display/dp/B0BZQPQD63/ref=sr_1_9?keywords=ROG+Strix&qid=1702412765&s=pc&sr=1-9&ufe=app_do%3Aamzn1.fos.17f26c18-b61b-4ce9-8a28-de351f41cffb" target="_blank">
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6539/6539605_sd.jpg" alt="Featured Item 7" />
            <div class="carousel-image-overlay"></div>
            </a>
          </div>

          {/* Featured Item 8 */}
          <div class = "carousel-image-container">
            <a href="https://www.amazon.com/10-Core-i7-1250U-Business-Thunderbolt-Fingerprint/dp/B0CGFCVKVF/ref=sr_1_2_sspa?keywords=DELL+XPS+13&qid=1702412813&s=pc&sr=1-2-spons&ufe=app_do%3Aamzn1.fos.765d4786-5719-48b9-b588-eab9385652d5&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">
            <img src="https://m.media-amazon.com/images/I/71rUcSAYTKL.__AC_SY300_SX300_QL70_FMwebp_.jpg" alt="Featured Item 8" />
            <div class="carousel-image-overlay"></div>
            </a> 
          </div>

          

        </Slider>
      </div>

      {/*imageSrc: item.images && item.images.length > 0 ? "https://used-stuff-platform.onrender.com" + item.images[0] : ReactLogo,
      itemName: item.name,
      price: item.price,
      userName: item.userID,
      postDate: item.postDate,
      sold: item.sold,
      label: item.label,
      locations: item.locations,
      description: item.description,
      like: false */}

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
              label={item.label}
              description={item.description}
              onDetailClick={() => handleItemClick(item)} 
            />
          ))}
        </div>
        {numItemsToShowF < totalLength('Furniture') && (<button className="more" onClick={handleMoreClickF}>
          Show More
        </button>)}
        {numItemsToShowF > calculateItemsPerLine() && (
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
              postDate={item.postDate}
              onDetailClick={() => handleItemClick(item)} 
            />
          ))}
        </div>
        {numItemsToShowC < totalLength('Cloth') && (<button className="more" onClick={handleMoreClickC}>
          Show More
        </button>)}
        {numItemsToShowC > calculateItemsPerLine() && (
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
              onDetailClick={() => handleItemClick(item)} 
            />
          ))}
        </div>
        {numItemsToShowB < totalLength('Book')&&(<button className="more" onClick={handleMoreClickB}>
          Show More
        </button>)}
        {numItemsToShowB > calculateItemsPerLine() && (
          <button className="less" onClick={handleLessClickB}>
            Show Less
          </button>
        )}
      </div>

      {/* Render the ItemDetail component if an item is selected */}
      {isModalOpen && (
        <Modal onClose={closeItemDetail}>
          <ItemDetail selectedItem={selectedItem} onClose={closeItemDetail} />
        </Modal>
      )}

    </div>

  );
}

export default Home;