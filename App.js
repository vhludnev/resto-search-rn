import * as React from 'react'
import { TouchableOpacity/* , Text *//* , useColorScheme */ } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

//import FilterDrawer from './src/components/FilterDrawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeContext, CustomDefaultThemeTheme, CustomDarkTheme } from './src/components/ThemeContext'
import { ResultsProvider } from './src/components/ResultsContext'

const Stack = createNativeStackNavigator()


const MainStack = () => {
  const { setTheme, theme } = React.useContext(ThemeContext)

  return (
    <Stack.Navigator 
      initialRouteName='Search' 
      screenOptions={
        {title: 'Restomerica', headerMode: 'screen', headerTitleAlign: 'center', 
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => setTheme(theme === CustomDefaultThemeTheme ? CustomDarkTheme : CustomDefaultThemeTheme)}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme === CustomDarkTheme ? 'orange' : '#333'} />
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
  const [theme, setTheme] = React.useState(CustomDefaultThemeTheme)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ResultsProvider>
        <NavigationContainer theme={theme} >
          <MainStack />
        </NavigationContainer>
      </ResultsProvider>
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
