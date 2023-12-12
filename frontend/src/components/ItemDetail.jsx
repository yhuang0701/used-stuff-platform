import React from 'react';
import Modal from './Modal'; 
import './ItemDetail.css';
import {Link} from "react-router-dom";

const ItemDetail = ({ selectedItem, onClose }) => {
  // Implement the detailed view UI using the selected item data
  return (
    <Modal onClose={onClose}>
      <div className="item-detail-container">
        {/* Detailed view content */}
        <div className="close-button" onClick={onClose}>
          X
        </div>
        {/* Add detailed information about the selected item here */}
        {selectedItem && (
           <div className="item-content">
            <div className="item_image">
            <img src={selectedItem.imageSrc} alt={selectedItem.itemName}/>
            </div>
            <div className="item_details">
              <h2>Name: {selectedItem.itemName}</h2>
              <p>Price: {selectedItem.price}</p>
              {/* <p>Username: <a href="/UserDetail" style={{ textDecoration: 'underline' }} state={{ userId: "656ffec0931a250a4c348812" }}>{"click to jump"}</a></p> */}
              <Link to={`/UserDetail`}  state={{ userId: selectedItem.userName}} style={{ textDecoration: 'underline' }}>
              Poster Profile: click to jump
              </Link>
              <p>Sold: {selectedItem.sold.toString()}</p>
              <p>Description: {selectedItem.description}</p>
              <p>Label: {selectedItem.label}</p>
              <p>Trading location: {selectedItem.locations}</p>
              <p>PostDate: {selectedItem.postDate.toString()}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ItemDetail;
