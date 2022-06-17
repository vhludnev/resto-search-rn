import { createContext } from 'react'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'

const ThemeContext = createContext()

const CustomDarkTheme = {
   ...DarkTheme,
   dark: true,
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
   dark: false,
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

// const ThemeProvider = ({ children }) => {
//    const [theme, setTheme] = useState('light')

//    //const { setTheme, theme } = React.useContext(ThemeContext)
   
//    const themeData = { theme, setTheme }

//    return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
// }

export { ThemeContext, CustomDefaultThemeTheme, CustomDarkTheme }