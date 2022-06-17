import * as React from 'react'
import { TouchableOpacity/* , Text *//* , useColorScheme */ } from 'react-native'
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'

import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

//import SearchScreen from './src/screens/SearchScreen'
//import ResultsShowScreen from './src/screens/ResultsShowScreen'
//import FilterDrawer from './src/components/FilterDrawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeContext } from './src/components/ThemeContext'
//import { ResultsContext } from './src/components/ResultsContext'

const Stack = createNativeStackNavigator()

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#333',
    card: '#303f9f',
    text: '#fff',
    input: '#999',
    placeholder: '#333',
    title: '#fff',
    filter: '#cccccc'
  }
}

const CustomDefaultThemeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    input: '#dcdcdc',
    placeholder: '#999',
    title: '#4E74D2',
    filter: '#f5f5f5'
    //primary: 'rgb(255, 45, 85)',
    //background: 'rgb(242, 242, 242)',
    //card: 'rgb(255, 255, 255)',
    //text: 'rgb(28, 28, 30)',
    //border: 'rgb(199, 199, 204)',
    //notification: 'rgb(255, 69, 58)',
  }
}

const MainStack = () => {
  //const [isDarkTheme, setIsDarkTheme] = React.useState(false)
  const { setTheme, theme } = React.useContext(ThemeContext)

  return (
    <Stack.Navigator 
      initialRouteName='Search' 
      screenOptions={
        {title: 'Restomerica', headerMode: 'screen', headerTitleAlign: 'center', 
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme === 'dark' ? 'orange' : '#333'} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            width: '60%',
            ellipsizeMode: "clip",
          }
        }
      }>
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen 
        name='ResultShow' 
        component={ResultsShowScreen} 
        options={({ route: { params: {name} } }) => ({ title: `- ${name} -` }) }
      />
    </Stack.Navigator>
  )
}


const App = () => {
  const [theme, setTheme] = React.useState('light')
  const themeData = { theme, setTheme }
  //const scheme = useColorScheme()
  //const [data, setData] = React.useState([])
  //const [selectedCategories, setSelectedCategories] = React.useState([])
  //const [selectedServices, setSelectedServices] = React.useState([])
  //const resultsData = { data, setData, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices }

  return (
    <ThemeContext.Provider value={themeData}>
      {/* <ResultsContext.Provider value={resultsData}> */}
        <NavigationContainer theme={theme === 'light' ? CustomDefaultThemeTheme : CustomDarkTheme}>
          <MainStack />
        </NavigationContainer>
      {/* </ResultsContext.Provider> */}
    </ThemeContext.Provider>
  )
}

export default App

// const navigator = createStackNavigator(
//   {
//     Search: SearchScreen,
//     ResultsShow: ResultsShowScreen,
//   },
//   {
//     initialRouteName: 'Search',
//     defaultNavigationOptions: {
//       title: 'Business Search',
//     },
//   }
// );

// export default createAppContainer(navigator);
