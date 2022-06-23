import { createContext, useState, useEffect /*, useCallback */ } from 'react'
const ResultsContext = createContext()

const ResultsProvider = ({ children }) => {
   const [data, setData] = useState([])
   const [resultsArr, setResultsArr] = useState([])
   const [stars, setStars] = useState(false)
   const [price, setPrice] = useState(4 /* || undefined */)
   const [active, setActive] = useState(null)
   const [selectedCategories, setSelectedCategories] = useState([])
   const [selectedServices, setSelectedServices] = useState([])
   const [gridView, setGridView] = useState(true)
   const [location, setLocation] = useState(null)
   const [cities, setCities] = useState('')
   const [term, setTerm] = useState('');
   const [cityzip, setCityZip] = useState('')
   const [errorMsg, setErrorMsg] = useState(null)
   const [error, setError] = useState(null)
   const [distance, setDistance] = useState(null)

   const changeView = () => {
      return setGridView(!gridView)
   }

   // useEffect(() => {
   //    if (stars) {
   //      const newArr = [...resultsArr].filter(item => {return item.rating >= 4})
   //      setResultsArr(newArr)
   //    } 
   // }, [stars])
   
   const resultsData = { distance, setDistance, error, setError, term, setTerm, cityzip, setCityZip, cities, setCities, data, setData, resultsArr, setResultsArr, location, setLocation, errorMsg, setErrorMsg, gridView, changeView, active, setActive, price, setPrice, stars, setStars, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices }

   return <ResultsContext.Provider value={resultsData}>{children}</ResultsContext.Provider>
}

export { ResultsContext, ResultsProvider }