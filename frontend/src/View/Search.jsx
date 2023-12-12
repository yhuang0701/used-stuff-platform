import Item from '../components/Item';
import ReactLogo from '../assets/react.svg';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get("name");
  console.log("SearchTerm: ", searchTerm);

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('https://used-stuff-platform.onrender.com/api/items')
      .then(response => response.json())
      .then(data => setItems(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(items);

  const searchItems = items
    .filter(item => item.name.includes(searchTerm))
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

  console.log(searchItems);

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {searchItems.map(item => (
          <div key={item._id} className='flex justify-center my-4'>
            <Item {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Search