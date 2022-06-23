import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView/* ,  DrawerItemList */ , useDrawerStatus } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { Foundation, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { MultiSelect } from 'react-native-element-dropdown'
import { ResultsContext } from './ResultsContext'

const FilterDrawer = (props) => {
   const { data, price, setPrice, stars, setStars, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices } = useContext(ResultsContext)
   const [selectedCat, setSelectedCat] = useState([])
   const [selectedSer, setSelectedSer] = useState([])
   //const [price, setPrice] = useState(4)
   const { colors } = useTheme()
   const isDrawerOpen = useDrawerStatus() === 'open'

   const convertedString = (el) => {
      const item = el.replace('_', ' ')
      return item.charAt(0).toUpperCase() + item.substring(1)
   }

   const categoriesArr = data.map(res => {
      const [{alias, title}] = res.categories
         return {label: title, value: alias}
   })
   const categories = [...new Set(categoriesArr.map(JSON.stringify))].map(JSON.parse)

   const servicesArr = data.map(res => { 
      return res.transactions 
   })
   const services = [...new Set(servicesArr.flat())].map(el => {return {label: convertedString(el), value: el}})

   // useEffect(() => {
   //    if (!isDrawerOpen) {
   //       setSelectedCategories(selectedCat)
   //       setSelectedServices(selectedSer)
   //    }
   // }, [isDrawerOpen])
//console.log(selectedSer)
   useEffect(() => {
      if (isDrawerOpen) {
         setSelectedCat(selectedCategories)
         setSelectedSer(selectedServices)
      }
   }, [isDrawerOpen])

   useEffect(() => {
      setSelectedCategories(selectedCat)
      setSelectedServices(selectedSer)
   }, [selectedCat, selectedSer])

   return (
      <DrawerContentScrollView {...props}>
         {/* <DrawerItemList {...props} /> */}
         <View style={{paddingTop: StatusBar.currentHeight + 20, paddingHorizontal: 5}}>
            <Text style={{color: colors.title, fontSize: 16, textAlign: 'center'}}>Filters</Text>
            <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-around', alignItems: 'center' }} >
            <View style={{flex: 1, alignItems: 'center'}}>
               <Text style={{paddingBottom: 8, color: colors.text}}>Price</Text>
               <View style={[styles.column, {backgroundColor: colors.filter, flexDirection: 'row'}]} >
                  <TouchableOpacity onPress={() => setPrice(1)}>
                     <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPrice(2)}>
                     <Foundation name="dollar" size={21} color={price > 1 ? "black" : colors.icon} style={{paddingHorizontal: 4}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPrice(3)}>
                     <Foundation name="dollar" size={21} color={price > 2 ? "black" : colors.icon} style={{paddingHorizontal: 4}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPrice(4)}>
                     <Foundation name="dollar" size={21} color={price > 3 ? "black" : colors.icon} style={{paddingHorizontal: 4}} />
                  </TouchableOpacity>
                 {/*  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={2}/>
                  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={3}/> */}
                  {/* <Foundation name="dollar" size={21} color="#b2b2b2" style={{paddingHorizontal: 4}} value={4}/>  */}  
                  <Text style={{paddingLeft: 5, fontSize: 12}}>& </Text>
                  <Ionicons name="ios-arrow-down" size={14} />
               </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
               <View style={{paddingBottom: 8}}>
                  <Text style={{color: colors.text}}>Stars</Text>
               </View>
               <TouchableOpacity style={[styles.column, {backgroundColor: colors.filter, flexDirection: 'row', borderColor: stars && 'orange', borderWidth: stars ? 1 : 0}]} activeOpacity={0.5} onPress={() => { setStars(!stars)/* props.navigation.navigate('Search', {label: 'stars'}) */ }}>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="staro" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <Text style={{paddingLeft: 5, fontSize: 12}}>& </Text>
                  <Ionicons name="ios-arrow-up" size={14} style={{paddingTop: 2}} />
               </TouchableOpacity>
            </View>
            </View>
            <View style={[selectStyles.container, {marginTop: 10}]}>
               <MultiSelect
                  style={[selectStyles.dropdown, {color: colors.text, backgroundColor: colors.filter}]}
                  placeholderStyle={selectStyles.placeholderStyle}
                  selectedTextStyle={selectStyles.selectedTextStyle}
                  inputSearchStyle={selectStyles.inputSearchStyle}
                  iconStyle={selectStyles.iconStyle}
                  //search
                  data={categories}
                  labelField="label"
                  valueField="value"
                  placeholder="Select categories"
                  searchPlaceholder="Search..."
                  value={selectedCat}
                  onChange={item => setSelectedCat(item) }
                  //onBlur={() => setSelectedCategories(selectedCat)}
                  renderLeftIcon={() => (
                     <MaterialIcons
                        style={selectStyles.icon}
                        color="black"
                        name="category"
                        size={20}
                     />
                  )}
                  renderItem={(item, selected) => {
                     return (
                        <View style={selectStyles.item}>
                           <Text style={selectStyles.selectedTextStyle}>{item.label}</Text>
                           {selected && <Ionicons style={selectStyles.icon} color="#4E74D2" name="checkmark" size={18} />}
                        </View>
                     )
                  }}
                  renderSelectedItem={(item, unSelect) => (
                     <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={selectStyles.selectedStyle}>
                           <Text style={selectStyles.textSelectedStyle}>{item.label}</Text>
                           <AntDesign color="black" name="delete" size={14} style={{paddingLeft: 2}} />
                        </View>
                     </TouchableOpacity>
                  )}
               />
            </View>
            <View style={selectStyles.container}>
               <MultiSelect
                  style={[selectStyles.dropdown, {color: colors.text, backgroundColor: colors.filter}]}
                  placeholderStyle={selectStyles.placeholderStyle}
                  selectedTextStyle={selectStyles.selectedTextStyle}
                  inputSearchStyle={selectStyles.inputSearchStyle}
                  iconStyle={selectStyles.iconStyle}
                  //activeColor='#ccc'
                  //search
                  data={services}
                  labelField="label"
                  valueField="value"
                  placeholder="Select services"
                  searchPlaceholder="Search..."
                  value={selectedSer}
                  onChange={item => { setSelectedSer(item) }}
                  renderLeftIcon={() => (
                     <MaterialIcons 
                        style={selectStyles.icon}
                        color="black"
                        name="delivery-dining"
                        size={20}
                     />
                  )}
                  renderItem={(item, selected) => {
                     return (
                     <View style={selectStyles.item}>
                        <Text style={selectStyles.selectedTextStyle}>{item.label}</Text>
                        {selected && <Ionicons style={selectStyles.icon} color="#4E74D2" name="checkmark" size={18} />}
                     </View>
                     )
                  }}
                  renderSelectedItem={(item, unSelect) => (
                     <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                     <View style={selectStyles.selectedStyle}>
                        <Text style={selectStyles.textSelectedStyle}>{item.label}</Text>
                        <AntDesign color="black" name="delete" size={14} style={{paddingLeft: 2}}/>
                     </View>
                     </TouchableOpacity>
                  )}
               />
            </View>
         </View>
      </DrawerContentScrollView>
   )
}

const styles = StyleSheet.create({
  column: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '92%',
    height: 32,
    flexDirection: 'row'
  },
  backgroundStyle: {
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10
  },  
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  button: {
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#4E74D2"
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#fff",
    //...Platform.select({ web: { textOverflow: "clip" }, default: {} })
  },
})


const selectStyles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 30,
    //backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 34,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
  },
})

export default FilterDrawer
