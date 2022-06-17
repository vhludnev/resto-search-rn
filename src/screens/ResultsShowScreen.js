import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import yelp from '../api/yelp';
import useDimentions from '../hooks/useDimentions'
import { AntDesign, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons'
import { TextRow } from '../components/TextRow'

const ResultsShowScreen = ({ route }) => {
  const [result, setResult] = useState(null);
  //const id = navigation.getParam('id');
  const id = route.params.id
  const { width } = useDimentions()

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return (
      <View style={styles.absoluteCenter}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <TextRow style={styles.address}><Ionicons name="location-outline" size={14} />{' '} {result.location.address1}, {result.location.city}, {result.location.zip_code}</TextRow>
        <TextRow style={{paddingLeft: 3}}><Fontisto name="mobile-alt" size={14} />{' '} {result.phone}</TextRow>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={result.photos}
          keyExtractor={photo => photo}
          renderItem={({ item }) => {
            return <Image style={[styles.image, { width: width/3-5 }]} resizeMode='contain' source={{ uri: item }} />
          }}
        />
        <TextRow style={{fontWeight: 'bold'}}> 
          {result.rating} {/* {result.rating.length === 1 ? 'star' : 'stars'} */}
          <AntDesign name="star" size={14} color="orange"/> {' '}
          {result.review_count} {/* {result.review_count.length === 1 ? 'review' : 'reviews'} */}
          <MaterialCommunityIcons name="note-check-outline" size={14} color="green" /> {' '}
          {result.price}
        </TextRow>
        <TextRow><MaterialCommunityIcons name="food-fork-drink" size={14} /* color='#333' */ />{' '} 
          {result.categories.map(cat => cat.title).join(', ')}
        </TextRow>
        {result.transactions.length ? (<TextRow>Services: {result.transactions.join(', ').replace('_', ' ')}</TextRow>) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  address: {
    paddingTop: 15, 
  },
  absoluteCenter: {
    //...StyleSheet.absoluteFill
    position: 'absolute',
    alignSelf: 'center',
    top: '40%'
  },
  image: {
    height: 100,
    marginVertical: 7,
    marginHorizontal: 1,
    borderRadius: 5
  }
})

export default ResultsShowScreen
