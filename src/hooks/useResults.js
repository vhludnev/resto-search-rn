import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm, cityzip, lat, lng) => {
    setLoading(true)
    setErrorMessage('')
    try {
      const options = {
        params: {
          limit: 50,      // aka: '/search?limit=50' 
          term: searchTerm,
          location: cityzip,
          latitude: lat,
          longitude: lng,
        }
      }
      const { data } = await yelp.get('/search', options);
      setResults(data.businesses)
      setLoading(false)
    } catch (err) {
      setErrorMessage('Please check City or Zip code');
      setLoading(false)
    }
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');

  // useEffect(() => {
  //   searchApi('gelato', null, 34.055471389994, -118.11960285847806);
  // }, []);

  return [searchApi, results, loading, errorMessage];
};
