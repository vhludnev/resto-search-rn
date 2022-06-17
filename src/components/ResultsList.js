import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
//import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import ResultsDetail from './ResultsDetail';

const ResultsList = ({ title, results }) => {
  const navigation = useNavigation()

  const truncate = (input) => input.length > 25 ? `${input.substring(0, 25)}...` : input

  if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ResultShow', { id: item.id, name: truncate(item.name) })} >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  container: {
    marginBottom: 10
  }
});

export default ResultsList
