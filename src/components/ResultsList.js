import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native'
//import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import ResultsDetail from './ResultsDetail';
import ResultsDetailListView from './ResultsDetailListView';

const ResultsList = ({ title, results, gridView, flatListRef }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const truncate = (input) => input.length > 25 ? `${input.substring(0, 25)}...` : input

  if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      {gridView ? (
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item }) => {
          //return <ResultsDetail result={item}/>
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ResultShow', { id: item.id, name: truncate(item.name) })} >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          )
        }} 
      /> ) : (
        <ScrollView
          alwaysBounceVertical={false} bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          {results.map(res => (
            <TouchableOpacity key={`${res.id}_1`} onPress={() => navigation.navigate('ResultShow', { id: res.id, name: truncate(res.name) })} >
              <ResultsDetailListView result={res} />
            </TouchableOpacity>
          ))}     
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  title: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ResultsList
