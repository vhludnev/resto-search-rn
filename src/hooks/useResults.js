import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm, cityzip) => {
    setErrorMessage('')
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 25,
          term: searchTerm,
          location: cityzip
        }
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    searchApi('raviolli', 'New York');
  }, []);

  return [searchApi, results, errorMessage];
};
