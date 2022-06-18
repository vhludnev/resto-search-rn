import React, { /* useState, */ useContext, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView/* , ScrollView*/, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView,  DrawerItemList } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { Foundation, AntDesign, Ionicons } from '@expo/vector-icons'
import { MultiSelect } from 'react-native-element-dropdown'
import { ResultsContext } from './ResultsContext'

const FilterDrawer = (/* {navigation} */ props) => {
   const { data, selectedCategories, setSelectedCategories/* , selectedServices, setSelectedServices */ } = useContext(ResultsContext)
   //const [selected, setSelected] = useState([])
   const { colors } = useTheme()

   const categories = data.map(res => {
      const [{alias, title}] = res.categories
         return {label: title, value: alias}
   })
   const labels = [...new Set(categories.map(JSON.stringify))].map(JSON.parse)
   //const labels = [...new Set(categories)]

   // const transactions = data.map(({transactions}) => transactions.forEach(el => { 
   //      return {label: el} })
   // )
   // const services = [...new Set(transactions.map(JSON.stringify))].map(JSON.parse)

   useEffect(() => {
      if (selectedCategories.length === 0) {
         setSelectedCategories([])
      }
   }, [selectedCategories])
  
   return (
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
         <View style={{paddingTop: StatusBar.currentHeight + 20, paddingHorizontal: 5}}>
            <Text style={{color: colors.title, fontSize: 16, textAlign: 'center'}}>Filters</Text>
            <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-around', alignItems: 'center' }} >
            <View style={{flex: 1, alignItems: 'center'}}>
               <Text style={{paddingBottom: 8, color: colors.text}}>Price</Text>
               <TouchableOpacity style={[styles.column, {backgroundColor: colors.filter, flexDirection: 'row'}]} onPress={() => console.log('pressed')}>
                  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={1}/>
                  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={2}/>
                  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={3}/>
                  <Foundation name="dollar" size={21} color="black" style={{paddingHorizontal: 4}} value={4}/>
                  <Foundation name="dollar" size={21} color="#b2b2b2" style={{paddingHorizontal: 4}} value={5}/>   
                  <Text style={{paddingLeft: 5, fontSize: 12, color: '#4E74D2'}}>& </Text>
                  <Ionicons name="ios-arrow-down" size={14} color='#4E74D2' />
               </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
               <View style={{paddingBottom: 8}}>
                  <Text style={{color: colors.text}}>Stars</Text>
               </View>
               <TouchableOpacity style={[styles.column, {backgroundColor: colors.filter, flexDirection: 'row'}]} activeOpacity={0.5} onPress={() => { navigation.navigate('Search', {label: 'stars'}) }}>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="star" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <AntDesign name="staro" size={13} color="orange" style={{paddingHorizontal: 1, paddingTop: 2}}/>
                  <Text style={{paddingLeft: 5, fontSize: 12, color: '#4E74D2'}}>& </Text>
                  <Ionicons name="ios-arrow-up" size={14} style={{paddingTop: 2}} color='#4E74D2' />
               </TouchableOpacity>
            </View>
            </View>
            <View style={selectStyles.container}>
            <MultiSelect
               style={[selectStyles.dropdown, {color: colors.text, backgroundColor: colors.input}]}
               placeholderStyle={selectStyles.placeholderStyle}
               selectedTextStyle={selectStyles.selectedTextStyle}
               inputSearchStyle={selectStyles.inputSearchStyle}
               iconStyle={selectStyles.iconStyle}
               //search
               data={labels}
               labelField="label"
               valueField="value"
               placeholder="Select categories"
               searchPlaceholder="Search..."
               value={selectedCategories}
               onChange={item => { setSelectedCategories(item) }}
               renderLeftIcon={() => (
                  <AntDesign
                  style={selectStyles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                  />
               )}
               renderItem={item => {
                  return (
                  <View style={selectStyles.item}>
                     <Text style={selectStyles.selectedTextStyle}>{item.label}</Text>
                     <AntDesign style={selectStyles.icon} color="#4E74D2" name="Safety" size={18} />
                  </View>
                  )
               }}
               renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={selectStyles.selectedStyle}>
                     <Text style={selectStyles.textSelectedStyle}>{item.label}</Text>
                     <AntDesign color="black" name="delete" size={17} />
                  </View>
                  </TouchableOpacity>
               )}
            />
            </View>
            {/* <View style={selectStyles.container}>
            <MultiSelect
               style={[selectStyles.dropdown, {color: colors.text, backgroundColor: colors.input}]}
               placeholderStyle={selectStyles.placeholderStyle}
               selectedTextStyle={selectStyles.selectedTextStyle}
               inputSearchStyle={selectStyles.inputSearchStyle}
               iconStyle={selectStyles.iconStyle}
               //search
               data={services}
               labelField="label"
               valueField="label"
               placeholder="Select services"
               searchPlaceholder="Search..."
               value={selectedServices}
               onChange={item => { setSelectedServices(item) }}
               renderLeftIcon={() => (
                  <AntDesign
                  style={selectStyles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                  />
               )}
               renderItem={item => {
                  return (
                  <View style={selectStyles.item}>
                     <Text style={selectStyles.selectedTextStyle}>{item.label}</Text>
                     <AntDesign style={selectStyles.icon} color="#4E74D2" name="Safety" size={18} />
                  </View>
                  )
               }}
               renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={selectStyles.selectedStyle}>
                     <Text style={selectStyles.textSelectedStyle}>{item.label}</Text>
                     <AntDesign color="black" name="delete" size={17} />
                  </View>
                  </TouchableOpacity>
               )}
            />
            </View> */}
         </View>
      </SafeAreaView>
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
    height: 40,
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
    padding: 15,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontSize: 16,
  },
})

export default FilterDrawer
