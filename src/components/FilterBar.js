import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { /* useTheme, */ useNavigation } from '@react-navigation/native'
import { Feather, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { ResultsContext } from './ResultsContext'

const FilterBar = ({ onSort, changeView, gridView }) => {
  //const { colors } = useTheme()
  const { active, setActive } = useContext(ResultsContext)
  const navigation = useNavigation()

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
    }
  ]
  
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
               style={[styles.button, active === filter.name && {backgroundColor: '#fff', borderColor: '#4E74D2'}]}
               key={filter.name}
               onPress={() => { onSort && onSort(filter.label); setActive(filter.name) }}
            >
               <View style={styles.containerStyle}>
                  {/* {icon && icon} */}
                  <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textStyle, active === filter.name && {color: '#4E74D2'}]} >
                     {filter.label}
                  </Text>
               </View>
            </TouchableOpacity>
          ))}
         </ScrollView>
         <TouchableOpacity /* style={{position: 'absolute', left: 55, top: 3}} */ onPress={() => { navigation.navigate('Search', {label: 'all'}) }}>
            <FontAwesome name="refresh" size={20} color='#4E74D2' />
         </TouchableOpacity>
         <Text style={{marginHorizontal: 5, color: 'lightgrey', fontSize: 18, marginTop: -4}} >|</Text>
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
    marginRight: 8,
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
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#fff",
    //...Platform.select({ web: { textOverflow: "clip" }, default: {} })
  },
})

export default FilterBar
