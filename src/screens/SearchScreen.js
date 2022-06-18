import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { ResultsContext } from '../components/ResultsContext';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import FilterBar from '../components/FilterBar';

const SearchScreen = ({route}) => {
  const flatListRef1 = useRef()
  const flatListRef2 = useRef()
  const flatListRef3 = useRef()
  const flatListRef4 = useRef()
  const [term, setTerm] = useState('');
  const [cityzip, setCityZip] = useState('')
  const [cities, setCities] = useState('')
  const [error, setError] = useState(null)
  const [gridView, setGridView] = useState(true)
  const [resultsArr, setResultsArr] = useState([])
  const [searchApi, results, loading, errorMessage] = useResults();
  const { /* data, */ setData, setSelectedCategories, selectedCategories, selectedServices, setSelectedServices } = useContext(ResultsContext)
  const { colors } = useTheme()
  const isDrawerOpen = useDrawerStatus() === 'open'

  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$' || '$$$$'
    return resultsArr.filter(result => result.price === price )
  };

  const sortResultsBy = (data, sortType) => {
    if (sortType === 'rating') {
      return [...resultsArr].sort((a, b) => b.rating - a.rating)/* .filter(result => result.price === price) */
    } else if (sortType === 'name') {
      return [...resultsArr].sort((a, b) => a.name.localeCompare(b.name))/* .filter(result => result.price === price) */
    } else if (sortType === 'reviews') {
      return [...resultsArr].sort((a, b) => b.review_count - a.review_count)
    }
  }

  const moveToTop = () => {
    flatListRef1.current ? flatListRef1.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef2.current ? flatListRef2.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef3.current ? flatListRef3.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef4.current ? flatListRef4.current.scrollToIndex({index: 0, animated: true}) : null
  }

  const onSort = (label) => {
    setResultsArr(sortResultsBy(resultsArr, label))
    moveToTop()
  }

  const changeView = () => {
    return setGridView(!gridView)
  }

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
    if (!loading) {
      setResultsArr(results)
      setData(results)
      const dataCity = results.map(res => res.location.city)
      //setCities([...new Set(data)].join(', '))
      setCities(dataCity[0])
    }
  }, [loading])

  useEffect(() => {
    if (route.params) {
      if (route.params.label === 'stars') {
        const newArr = [...resultsArr].filter(item => item.rating >= 4)
        setResultsArr(newArr)
      } else if (route.params.label === 'all') {
        setResultsArr(results)
        setSelectedCategories([])
        setSelectedServices([])
      } 
      moveToTop()
    }
  }, [route.params])

  useEffect(() => {
    if (!isDrawerOpen) {
      setResultsArr(results)

      if (selectedServices.length) {
        const newServArr = [...resultsArr].some((item) => {
          const { transactions } = item
          return selectedServices.includes(transactions)
        })
        setResultsArr(newServArr)
      }

      if (selectedCategories.length) {
        const newCatArr = [...resultsArr].filter((item) => {
          const [{ alias }] = item.categories
          return selectedCategories.includes(alias)
        })
        setResultsArr(newCatArr)
      }
    } 
  }, [isDrawerOpen])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        term={term}
        cityzip={cityzip}
        onTermChange={setTerm}
        onCityZipChange={setCityZip}
        //onTermSubmit={() => searchApi(term)}
        onTermSubmit={dataSubmit}
      />
      {loading && (
        <View style={styles.absoluteCenter}>
          <ActivityIndicator size='large' />
        </View>)
      }
      <FilterBar onSort={onSort} changeView={changeView} gridView={gridView} />
      {errorMessage ? <Text style={{marginLeft: 10, paddingBottom: 10, color: 'coral'}}>{errorMessage}</Text> : null}
      {error ? <Text style={{marginLeft: 10, paddingBottom: 10, color: 'coral'}}>{error}</Text> : null}
      {resultsArr.length ? (
        <>
          {cities ? (
            <Text style={{color: colors.text, marginLeft: 10, paddingBottom: 15}}>We have found 
              <Text style={{color: 'green', fontWeight: 'bold'}}> {resultsArr.length} </Text> 
              <Text>{resultsArr.length === 1 ? 'result' : 'results'} in </Text>
              <Text style={{fontWeight: 'bold'}}>{cities}</Text>
            </Text>
          ) : null}
          <ScrollView>
            <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" gridView={gridView} flatListRef={flatListRef1} />
            <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" gridView={gridView} flatListRef={flatListRef2} />
            <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" gridView={gridView} flatListRef={flatListRef3} />   
            <ResultsList results={filterResultsByPrice('$$$$')} title="Luxury" gridView={gridView} flatListRef={flatListRef4} />  
          </ScrollView> 
        </> 
      ) : null}
    </SafeAreaView>
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
