// File: /views/CreatePostView.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faTimes, faUpload} from '@fortawesome/free-solid-svg-icons';
import './PostView.css'

const CreatePostView = () => {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [selectedLocations, setSelectedLocations] = useState([]); // State for selected meet-up locations
    const [price, setPrice] = useState(0);

    const userId = localStorage.getItem('userID');
    console.log("post item viewwww user ID: ",userId)
    


    const handleImageChange = (event) => {
        // Assuming you want to keep previous images and add new ones
        setImages([...images, ...event.target.files]);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleTagInputChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setTags([...tags,value]);
        } else {
            setTags(tags.filter((tag) => tag !== value));
        }
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedLocations([...selectedLocations, value]);
        } else {
            setSelectedLocations(selectedLocations.filter((location) => location !== value));
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);




    const renderImagePreviews = () => {
        return images.map((image, index) => {
            // Create an object URL for each image file
            const imageUrl = URL.createObjectURL(image);

            // Revoke the object URL to avoid memory leaks when the component unmounts or the image changes
            // Note: This clean-up might be better placed in a useEffect hook with a return function for clean-up
            window.addEventListener('unload', () => URL.revokeObjectURL(imageUrl));

            return (
                <div key={index} className="image-preview">
                    <img src={imageUrl} alt={`Preview ${index}`} />
                    <button className="remove-image-button" onClick={() => handleRemoveImage(index)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            );
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object
        const formData = new FormData();


        images.forEach(image => {
            console.log(image)
            formData.append('images', image);
        });

        tags.forEach(tag => {
            console.log(tag)
            formData.append('label', tag);
        });

        selectedLocations.forEach(location  => {
            formData.append(`locations`, location);
        });



        console.log(selectedLocations)

        // Append other form fields to the FormData object

        formData.append('userID', userId);
        formData.append('name', title);
        formData.append('description', content);
        formData.append('price', price);

        //https://used-stuff-platform.onrender.com/

        try {
            const response = await fetch('https://used-stuff-platform.onrender.com/api/items', {
                method: 'POST',
                body: formData // Send the FormData object
                // Note: When sending FormData, the 'Content-Type' header should not be set manually
                // It will be set automatically by the browser, including the boundary parameter
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            // Handle success here
        } catch (error) {
            console.error('Submission error:', error);
            // Handle errors here
        }

        alert('Post complete!');
        window.location.href = '/';

    };



    return (
        <div className="create-post-container">
            <form onSubmit={handleSubmit}>

            <h1>Upload image:</h1>
            <div className="image-upload-section">
                {renderImagePreviews()}
                <label htmlFor="image-upload" className="image-upload-label">

                    <div className="icon-wrapper">
                        <FontAwesomeIcon icon={faPlus} /> {/* Font Awesome Icon */}
                    </div>
                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="image-upload-input"
                    />
                </label>
            </div>
            <h1>Item title:</h1>
            <div className="title-section">
                <input
                    type="text"
                    placeholder="Add a title here"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>

                <h1>Set Item Price:</h1>
                <div className="price-slider-section">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={price}
                        onChange={handlePriceChange}
                        className="price-slider"
                    />
                    <input
                        type="number" // or "number" if you want to allow only numerical input
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Enter price"
                        className="price-input"
                    />

                    <div>Price: ${price}</div>
                </div>



            <h1> Item descriptions:</h1>
            <div className="content-section">
                <textarea
                    placeholder="Add your content here..."
                    value={content}
                    onChange={handleContentChange}
                />
            </div>

            <h1>Item Identification:</h1>
                <div className="location-checkbox-section">
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="tag1"
                            name="item"
                            value="Cloth"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag1">Cloth</label>

                        <input
                            type="checkbox"
                            id="tag2"
                            name="item"
                            value="Beauty"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag2">Beauty</label>

                        <input
                            type="checkbox"
                            id="tag3"
                            name="item"
                            value="Furniture"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag3">Furniture</label>

                        <input
                            type="checkbox"
                            id="tag4"
                            name="item"
                            value="Electronic"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag4">Electronic</label>


                        <input
                            type="checkbox"
                            id="tag5"
                            name="item"
                            value="Kitchenware"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag5">Kitchenware</label>

                        <input
                            type="checkbox"
                            id="tag6"
                            name="item"
                            value="Book"
                            onChange={handleTagInputChange}
                        />
                        <label htmlFor="tag6">Book</label>


                        {/* Add more locations as needed */}
                    </div>




                </div>


                <h1>Meet up location:</h1>
                <div className="location-checkbox-section">
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="location1"
                            name="location"
                            value="CS Building"
                            onChange={handleLocationChange}
                        />
                        <label htmlFor="location1">CS Building</label>

                        <input
                            type="checkbox"
                            id="location2"
                            name="location"
                            value="Illini Union"
                            onChange={handleLocationChange}
                        />
                        <label htmlFor="location2">Illini Union</label>

                        {/* Add more locations as needed */}
                    </div>
                </div>


            <div className="submit-section">
                <button type="submit" id="submit-button">Submit</button>
            </div>
            </form>
        </div>

    );
};

export default CreatePostView;
