import React, { useCallback, useContext, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { /* useTheme, */ useNavigation } from '@react-navigation/native'
import { Feather, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { ResultsContext } from './ResultsContext'
import * as Location from 'expo-location'
import useResults from '../hooks/useResults'


const FilterBar = ({ onSort, changeView, gridView }) => {
  //const { colors } = useTheme()
  const [searchApi, results, loading/* , errorMessage */] = useResults()
  const { term, setCityZip, setCities, setData, active, setActive, setResultsArr, location, setLocation, setDistance, errorMsg, setErrorMsg, error, setError } = useContext(ResultsContext)
  const navigation = useNavigation()
  //const { location } = useGeoLocation()
  const filters = [
    // {
    //   name: "employmentTypes",
    //   label: "Employment type",
    //   type: "MULTI_CHOICE"
    // },
    {
      name: "nameSort",
      label: "name",
      type: "RADIO_BUTTON"
    },
    {
      name: "ratingSort",
      label: "rating",
      type: "RADIO_BUTTON"
    },
    {
      name: "reviewsSort",
      label: "reviews",
      type: "RADIO_BUTTON"
    }/* ,
    {
      name: "distanceSort",
      label: "distance",
      type: "RADIO_BUTTON"
    } */
  ]

  const geoLocationHandler = async() => {
    errorMsg && setErrorMsg(null)
    error && setError(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      } else 
        // {                                                                               // uncomment
        // let location = await Location.getCurrentPositionAsync({})                       // uncomment
        // const { coords: {latitude, longitude} } = location                              // uncomment
        // setLocation({latitude: latitude, longitude: longitude})                         // uncomment
        if (status === 'granted' && term.length) {
          Keyboard.dismiss()
          const coords = {latitude: 34.0554713899949, longitude: -118.11960285847806}      // remove if uncomment previous lines
          setLocation(coords)                                                              // remove if uncomment previous lines
          const res = await searchApi(term, null, coords.latitude, coords.longitude)       // remove if uncomment previous lines
          
          //const res = await searchApi(term, null, location.latitude, location.longitude) // uncomment if removed previous lines
          // if (res === undefined) {
          //   setResultsArr([])
          //   setData([])
          //   setCityZip('')
          //   setDistance(null)
          //   setError('No results nearby')
          // } else {
            setError(null)
            return res
          //}
        //}                                                                                 // uncomment
      }
    } catch(err) {console.log(err)}
  }

  // const geoLocationHandler = () => {
  //   searchApi('gelato', null, location.latitude, location.longitude)
  // }

  useEffect(() => {
    if (!loading) {
      if (results.length) {
        setError(null)
        setData(results)
        setResultsArr(results)

        const dataCity = results.map(res => res.location.city)
        setCities(dataCity[0])

        const dataCityZip = results.map(res => res.location.zip_code)
        setCityZip(dataCityZip[0])
      } /* else {
        setError('No results nearby')
      } */
    }
  }, [loading])
  
  return (
    <>
      <View style={[styles.backgroundStyle/* , {backgroundColor: colors.input} */]} >
        <ScrollView
          horizontal
          //showsHorizontalScrollIndicator={false}
          // data={filters.label}
          // keyExtractor={label => label}
          // renderItem={({ item }) => {
          //   return (
          //     <TouchableOpacity
          //       style={styles.button}
          //       onPress={() => { onSort && onSort() }}
          //     >
          //       <View style={containerStyle}>
          //         {/* {icon && icon} */}
          //         <Text numberOfLines={1} ellipsizeMode="clip" style={textStyle} >
          //           {item.label}
          //         </Text>
          //       </View>
          //     </TouchableOpacity>
          //   )
          // }}
        >
         {filters.map(filter => (
            <TouchableOpacity
               style={[styles.button, active === filter.name && results.length && {backgroundColor: '#fff', borderColor: '#4E74D2'}]}
               key={filter.name}
               onPress={() => { onSort && onSort(filter.label); setActive(filter.name) }}
            >
               <View style={styles.containerStyle}>
                  {/* {icon && icon} */}
                  <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textStyle, active === filter.name && results.length && {color: '#4E74D2'}]} >
                     {filter.label}
                  </Text>
               </View>
            </TouchableOpacity>
          ))}
          {location && (
            <TouchableOpacity
               style={[styles.button, active === 'distanceSort' && results.length && {backgroundColor: '#fff', borderColor: '#4E74D2'}]}
               key='distanceSort'
               onPress={() => { onSort && onSort('distance'); setActive('distanceSort') }}
            >
               <View style={styles.containerStyle}>
                  <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textStyle, active === 'distanceSort' && results.length && {color: '#4E74D2'}]} >
                     {'distance'}
                  </Text>
               </View>
            </TouchableOpacity>
          )}
         </ScrollView>
         <TouchableOpacity /* style={{position: 'absolute', left: 55, top: 3}} */ onPress={() => { navigation.navigate('Search', {label: 'all'}) }}>
            <FontAwesome name="refresh" size={20} color='#4E74D2' />
         </TouchableOpacity>
         <Text style={{marginHorizontal: 5, color: 'lightgrey', fontSize: 18, marginTop: -4}} >|</Text>
         {!location && (
          <>
            <TouchableOpacity onPress={geoLocationHandler}>
                <MaterialIcons name="gps-fixed" size={20} color="#4E74D2" />
            </TouchableOpacity>
            <Text style={{marginHorizontal: 5, color: 'lightgrey', fontSize: 18, marginTop: -4}} >|</Text>
          </>
          )}
         {gridView ? (
         <TouchableOpacity onPress={/* () => {changeView && changeView()} */() => { changeView && changeView() }}>
            <MaterialIcons name="grid-view" size={20} color='#4E74D2' />
         </TouchableOpacity>) : (
         <TouchableOpacity onPress={/* () => {changeView && changeView()} */() => { changeView && changeView() }}>
            <MaterialCommunityIcons name="format-list-bulleted-square" size={20} color='#4E74D2' />
         </TouchableOpacity>
         )}
         <Text style={{marginHorizontal: 5, color: 'lightgrey', fontSize: 18, marginTop: -4}} >|</Text>
         <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {navigation.getParent('LeftDrawer').openDrawer()/* ; navigation.setParams({ name: 'Lucy' }) */}}>
            <Feather name="filter" size={20} color='#4E74D2' />
            <Text style={{color: '#4E74D2'}}>filter</Text>
         </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    //flex: 1,
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10
  },  
  containerStyle: {
    //marginTop: 10,
    //backgroundColor: /* '#F0EEEE' */'#dcdcdc',
    //height: 35,
    //borderRadius: 5,
    //marginHorizontal: 10,
    flexDirection: 'row',
    //marginBottom: 10,
    paddingVertical: 4,
    alignItems: "center",
    paddingHorizontal: 8,
    //overflow: 'hidden'
  },
  button: {
    marginRight: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4E74D2",
    backgroundColor: "#4E74D2",
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    //textTransform: 'capitalize'
  },
  //inputsRowStyle: {
    //flex: 2, 
    //backgroundColor: '#dcdcdc',
    //borderRadius: 5,
    //paddingLeft: 10
  //},
  iconStyle: {
    //fontSize: 35,
    //alignSelf: 'center',
    //marginHorizontal: 20
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: "#fff",
    paddingBottom: 2
    //...Platform.select({ web: { textOverflow: "clip" }, default: {} })
  },
})

export default FilterBar
