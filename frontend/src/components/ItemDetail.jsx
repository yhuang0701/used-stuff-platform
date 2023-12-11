// ItemDetail.js
import React from 'react';
import Modal from './Modal'; 
import './ItemDetail.css'; // Create a CSS file for styling if needed

const ItemDetail = ({ selectedItem, onClose }) => {
  // Implement the detailed view UI using the selected item data
  return (
    <Modal onClose={onClose}>
      <div className="item-detail-container">
        {/* Detailed view content */}
        <div className="close-button" onClick={onClose}>
          Close
        </div>
        {/* Add detailed information about the selected item here */}
        {selectedItem && (
          <div>
            <h2>{selectedItem.itemName}</h2>
            <p>Price: {selectedItem.price}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ItemDetail;
