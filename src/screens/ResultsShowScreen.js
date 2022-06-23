import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import yelp from '../api/yelp';
import useDimentions from '../hooks/useDimentions'
import { AntDesign, MaterialCommunityIcons, Fontisto, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { TextRow } from '../components/TextRow'
import Accordeon from '../components/Accordeon';


const ResultsShowScreen = ({ route, navigation }) => {
  const [result, setResult] = useState(null);
  //const id = navigation.getParam('id');
  const id = route.params.id
  const distance = route.params.distance
  const { width } = useDimentions()

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return (
      <View style={styles.absoluteCenter}>
        <ActivityIndicator size='large' color='#4E74D2' />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <TextRow style={styles.address}><Ionicons name="location-outline" size={14} />{' '} {result.location.address1}, {result.location.city}, {result.location.zip_code}</TextRow>
        <TextRow style={{paddingLeft: 3}}><Fontisto name="mobile-alt" size={14} />{' '} {result.display_phone}</TextRow>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={result.photos}
          keyExtractor={photo => photo}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {navigation.navigate('ShowImage', {url: item})}}>
                <Image style={[styles.image, { width: width/3-5 }]} resizeMode='contain' source={{ uri: item }} />
              </TouchableOpacity>
            )
          }}
        />
        <TextRow style={{fontWeight: 'bold'}}> 
          {result.rating} {/* {result.rating.length === 1 ? 'star' : 'stars'} */}
          <AntDesign name="star" size={14} color="orange"/> {' '}
          {result.review_count} {/* {result.review_count.length === 1 ? 'review' : 'reviews'} */}
          <MaterialCommunityIcons name="note-check-outline" size={14} color="green" /> {' '}
          {result.price}
        </TextRow>
        {distance && (
          <TextRow>
            <FontAwesome5 name="walking" size={14} /> {' '}
            {`${(distance/1000).toFixed()} km`}
          </TextRow>
        )}
        <TextRow><MaterialCommunityIcons name="food-fork-drink" size={14} /* color='#333' */ />{' '} 
          {result.categories.map(cat => cat.title).join(', ')}
        </TextRow>
        {result.transactions.length ? <TextRow>Services: {result.transactions.join(', ').replace('_', ' ')}</TextRow> : null}
      </View>
      <View>
        {result.hours && <Accordeon result={result}/>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    //paddingTop: 90
  },
  address: {
    paddingTop: 15, 
  },
  absoluteCenter: {
    //...StyleSheet.absoluteFill
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    zIndex: 1000
  },
  image: {
    height: 100,
    marginVertical: 7,
    marginHorizontal: 1,
    borderRadius: 5
  }
})

export default ResultsShowScreen
