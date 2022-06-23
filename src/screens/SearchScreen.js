import React, { useContext, /* useState, */ useEffect, useRef/* , useCallback */ } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { getDistance } from 'geolib'
import { ResultsContext } from '../components/ResultsContext';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import FilterBar from '../components/FilterBar';

const SearchScreen = ({route}) => {
  const flatListRef0 = useRef()
  const flatListRef1 = useRef()
  const flatListRef2 = useRef()
  const flatListRef3 = useRef()
  const flatListRef4 = useRef()
  // const [term, setTerm] = useState('');
  // const [cityzip, setCityZip] = useState('')
  // const [error, setError] = useState(null)
  // const [distance, setDistance] = useState(null)
  // const [gridView, setGridView] = useState(true)
  // const [resultsArr, setResultsArr] = useState([])
  const [searchApi, results, loading, errorMessage] = useResults();
  const { distance, setDistance, error, setError, term, setTerm, cityzip, setCityZip, cities, setCities, location, setLocation, errorMsg, resultsArr, setResultsArr, price, setPrice, gridView, changeView, stars, setStars, setActive, data, setData, setSelectedCategories, selectedCategories, selectedServices, setSelectedServices } = useContext(ResultsContext)
  const { colors } = useTheme()
  const isDrawerOpen = useDrawerStatus() === 'open'

  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$' || '$$$$'
    return resultsArr.filter(result => result.price === price)
  }

  const filteredResultsbyPrice = (data) => {
      return data.filter(result => {
      if (result.price === undefined) {
        return result.price === undefined
      } /* else { */
        return String(result.price).length <= price
      /* } */
    })
  }

  const filterResultsByStarsChoice = (arr) => {
    if (stars) {
      return [...filteredResultsbyPrice(arr)].filter(item => {return item.rating >= 4})
    } else {
      return filteredResultsbyPrice(arr)
    }   
  }

  const sortResultsBy = (resultsArr, sortType) => {
    if (sortType === 'rating') {
      return [...resultsArr].sort((a, b) => b.review_count - a.review_count).sort((a, b) => b.rating - a.rating)/* .filter(result => result.price === price) */
    } else if (sortType === 'name') {
      return [...resultsArr].sort((a, b) => a.name.localeCompare(b.name))/* .filter(result => result.price === price) */
    } else if (sortType === 'reviews') {
      return [...resultsArr].sort((a, b) => b.review_count - a.review_count)
    } else if (sortType === 'distance' && location) {
      let arr = []
      resultsArr.forEach(el => {
        arr.push({...el, dist: getDistance(location, {latitude: el.coordinates.latitude, longitude: el.coordinates.longitude})})
      })
      const sortedResult = [...arr].sort((a, b) => a.dist - b.dist)
      return sortedResult
    }
  }

  const moveToTop = () => {
    flatListRef0.current ? flatListRef0.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef1.current ? flatListRef1.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef2.current ? flatListRef2.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef3.current ? flatListRef3.current.scrollToIndex({index: 0, animated: true}) : null
    flatListRef4.current ? flatListRef4.current.scrollToIndex({index: 0, animated: true}) : null
  }

  const onSort = (label) => {
    setResultsArr(sortResultsBy(resultsArr, label))
    moveToTop()
  }

  const dataSubmit = () => {
    error && setError(null)
    if (term && cityzip) {
      setTerm(term.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))    
      setCityZip(cityzip.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())) 
      /* const res = */ return searchApi(term, cityzip)
      // if (res === undefined) {
      //   setDistance(null)
      //   setError('No results found')
      // } else {
      //   setError(null)
      //   return res
      // }
    } else {
      setError('Please enter a City or Zip code')
    }
  }

  useEffect(() => {
    if (results && results.length) {
      setResultsArr(filteredResultsbyPrice(results))
      setData(filteredResultsbyPrice(results))
      const dataCity = filteredResultsbyPrice(results).map(res => res.location.city)
      // setResultsArr(results)
      // setData(results)
      // const dataCity = results.map(res => res.location.city)
      //setCities([...new Set(data)].join(', '))
      setCities(dataCity[0])
    }
    //setLocation({latitude: 34.0554713899949, longitude: -118.11960285847806})
  }, [results])

  useEffect(() => {
    if (route.params) {
      if (route.params.label === 'all') {
        setStars(false)
        setPrice(4)
        setResultsArr(data)
        setSelectedCategories([])
        setSelectedServices([])
        setActive(null)
        setLocation(null)
      } 
      moveToTop()
    }
  }, [route.params])

  useEffect(() => {    
    if (!isDrawerOpen) {
      setActive(null)
      if (selectedCategories.length === 0 || selectedServices.length === 0) {
        setResultsArr(filterResultsByStarsChoice(data))
      }

      let catFilteredArr = []
      if (selectedCategories && selectedCategories.length > 0) {
        const newCatArr = [...filterResultsByStarsChoice(data)].filter((item) => {
          const [{ alias }] = item.categories
          return selectedCategories.includes(alias)
        })
        setResultsArr(newCatArr)
        catFilteredArr = [...newCatArr]
      } 

      if (selectedServices && selectedServices.length > 0) {
        let arrToUse = catFilteredArr.length ? catFilteredArr : filterResultsByStarsChoice(data)
        const newServArr = [...arrToUse].filter((item) => {
          const { transactions } = item
          return transactions.some(el => selectedServices.includes(el))
        })
        setResultsArr(newServArr)
      }
      moveToTop()
      // if (stars) {
      //   const newArr = [...resultsArr].filter(item => item.rating >= 4)
      //   setResultsArr(newArr)
      // } 
    } 
  }, [isDrawerOpen])

  useEffect(() => {
    if (stars) {
      const newArr = filterResultsByStarsChoice(resultsArr)
      setResultsArr(newArr)
    } 
  }, [stars])

  // useEffect(() => {
  //   if (results && resultsArr.length && location) {
  //     setError(null)
  //     const result = {latitude: results[0].coordinates.latitude, longitude: results[0].coordinates.longitude}
  //     const distance = getDistance(location, result)
  //     //const distancePrecise = getPreciseDistance(location, result)
  //     setDistance((distance/1000).toFixed())
  //   } /* else if (term && cityzip && !resultsArr.length) {
  //     setDistance(null)
  //     setError('No results found')
  //   } */
  // }, [location, resultsArr])

  //useEffect(() => {
  //  getDistanceData()
    //if (!loading && results.length) {
    //  setError(null)
    //  const result = {latitude: results[0].coordinates.latitude, longitude: results[0].coordinates.longitude}
    //  const distance = getDistance(location, result)
      //const distancePrecise = getPreciseDistance(location, result)
      //setDistance((distance/1000).toFixed())
    //  console.log(distance)
    //} 

  //})

  

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
          <ActivityIndicator size='large' color='#4E74D2'/>
        </View>)
      }
      <FilterBar onSort={onSort} changeView={changeView} gridView={gridView} />
      {/* {location && <Text style={{color: colors.text, marginLeft: 10, paddingBottom: 15}}>{JSON.stringify(location)}</Text>} */}
      {distance && <Text style={{color: colors.text, marginLeft: 10, paddingBottom: 15}}>{distance} km</Text>}
      {errorMsg ? <Text style={{marginLeft: 10, paddingBottom: 10, color: 'coral'}}>{errorMsg}</Text> : null}
      {errorMessage ? <Text style={{marginLeft: 10, paddingBottom: 10, color: 'coral'}}>{errorMessage}</Text> : null}
      {error ? <Text style={{marginLeft: 10, paddingBottom: 10, color: 'coral'}}>{error}</Text> : null}
      {filteredResultsbyPrice(resultsArr).length ? (
        <>
          {cities ? (
            <Text style={{color: colors.text, marginLeft: 10, paddingBottom: 15}}>We have found 
              <Text style={{color: 'green', fontWeight: 'bold'}}> {filteredResultsbyPrice(resultsArr).length} </Text> 
              <Text>{filteredResultsbyPrice(resultsArr).length === 1 ? 'result' : 'results'} in </Text>
              <Text style={{fontWeight: 'bold'}}>{cities}</Text>
            </Text>
          ) : null}
          <ScrollView>

            {price > 0 && <ResultsList results={filterResultsByPrice(undefined)} title="Price Surprice" gridView={gridView} flatListRef={flatListRef0} />}
            {price > 0 && <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" gridView={gridView} flatListRef={flatListRef1} />}
            {price > 1 && <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" gridView={gridView} flatListRef={flatListRef2} />}
            {price > 2 && <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" gridView={gridView} flatListRef={flatListRef3} />  } 
            {price > 3 && <ResultsList results={filterResultsByPrice('$$$$')} title="Luxury" gridView={gridView} flatListRef={flatListRef4} /> } 
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
    top: '40%',
    zIndex: 1000
  }
})

export default SearchScreen;
