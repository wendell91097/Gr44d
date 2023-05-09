// component that returns a random Dog Picture
import { useEffect, useState } from 'react';

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');


  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);


  return (
    <div>
      <img className='dog-image' src={imageUrl} alt='a dog' />
    </div>
  );
};

export default DogPicture;