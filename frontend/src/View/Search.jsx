import Item from '../components/Item';
import ReactLogo from '../assets/react.svg';

const Search = () => {
  const itemData = {
    imageSrc: ReactLogo,
    itemName: 'React Framework',
    price: '$20',
    userName: 'Developer',
    Postdate: '11.30.2023',
    Sold: true,
    like: false
  }


  return (
    <div className="mx-auto max-w-screen-xl">
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className='flex justify-center my-4'>
            <Item {...itemData} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Search