import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'
import { Feather, MaterialIcons } from '@expo/vector-icons';

const SearchBar = ({ term, cityzip, onCityZipChange, onTermChange, onTermSubmit }) => {
  const { colors } = useTheme()

  return (
    <>
      <View style={[styles.backgroundStyle, {backgroundColor: colors.input}]}>
        <Feather name="search" size={28} style={[styles.iconStyle, {color: colors.text}]} />
        <TextInput
          selectionColor='#4E74D2'
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.inputStyle, {color: colors.text, backgroundColor: colors.input}]}
          placeholder="Search"
          placeholderTextColor={colors.placeholder}
          value={term}
          onChangeText={onTermChange}
          //onEndEditing={onTermSubmit}
          onSubmitEditing={onTermSubmit}
        />
      </View>
      <View style={[styles.backgroundStyle, {marginTop: 0, backgroundColor: colors.input}]}>
        <MaterialIcons name="location-city" size={28} style={[styles.iconStyle, {color: colors.text}]} />
        <TextInput
          selectionColor='#4E74D2'
          autoCapitalize='none'
          autoCorrect={false}
          style={[styles.inputStyle, {color: colors.text, backgroundColor: colors.input}]}
          placeholder="City or Zip code"
          placeholderTextColor={colors.placeholder}
          value={cityzip}
          onChangeText={onCityZipChange}
          onSubmitEditing={onTermSubmit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: 45,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden'
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
  },
  iconStyle: {
    alignSelf: 'center',
    marginHorizontal: 15
  }
})

export default SearchBar