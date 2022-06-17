import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [cityzip, setCityZip] = useState('')
  const [cities, setCities] = useState('')
  const [error, setError] = useState(null)
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  const dataSubmit = () => {
    setError(null)
    if (term && cityzip) {
      setTerm(term.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))    
      setCityZip(cityzip.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())) 
      return searchApi(term, cityzip)
    } else {
      setError('Please enter a City or Zip code')
    }
  }

  useEffect(() => {
    if (results) {
      //setResultsArr(results)
      //setData(results)
      const dataCity = results.map(res => res.location.city)
      //setCities([...new Set(data)].join(', '))
      setCities(dataCity[0])
    }
  }, [results])

  return (
    <>
      <SearchBar
        term={term}
        cityzip={cityzip}
        onTermChange={setTerm}
        onCityZipChange={setCityZip}
        //onTermSubmit={() => searchApi(term)}
        onTermSubmit={dataSubmit}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice('$')}
          title="Cost Effective"
        />
        <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
        <ResultsList
          results={filterResultsByPrice('$$$')}
          title="Big Spender"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  absoluteCenter: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%'
  }
})

export default SearchScreen;
