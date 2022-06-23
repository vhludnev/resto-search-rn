import React from 'react'
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import useDimentions from '../hooks/useDimentions'
import { FontAwesome5 } from '@expo/vector-icons'

const ResultsDetailListView = ({ result, distance }) => {

  const { width } = useDimentions()
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={[styles.image, {width: width/2-15}]} source={{ uri: result.image_url ? result.image_url : 'https://www.freeiconspng.com/uploads/no-image-icon-14.jpg' }} /> 
        <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 15}}>
          <Text style={[styles.name, {width: width/2-15, color: colors.text}]} numberOfLines={1} ellipsizeMode='tail'>{result.name}</Text>
          <Text style={{color: colors.text}}>
            {result.rating} {result.rating.length === 1 ? 'Star' : 'Stars'}, {result.review_count} {result.review_count.length === 1 ? 'Review' : 'Reviews'} 
          </Text>
          {distance && (
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="walking" size={14} style={{color: colors.text, paddingTop: 2}} />
              <Text style={{color: colors.text, paddingLeft: 4}}>{(distance/1000).toFixed()} km</Text>
            </View>
          )}
          {result.transactions.length ? (<Text style={{color: colors.text, paddingTop: 5}}><Text style={{fontStyle: 'italic'}}>Services:</Text> {result.transactions.join(', ').replace('_', ' ')}</Text>) : null}
        </View>   
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  image: {
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold',
  }
})

export default ResultsDetailListView
