import { createContext, useState } from 'react'

const ResultsContext = createContext()


const ResultsProvider = ({ children }) => {
   const [data, setData] = useState([])
   const [selectedCategories, setSelectedCategories] = useState([])
   //const [selectedServices, setSelectedServices] = useState([])
   
   const resultsData = { data, setData, selectedCategories, setSelectedCategories/* , selectedServices, setSelectedServices */ }

   return <ResultsContext.Provider value={resultsData}>{children}</ResultsContext.Provider>
}

export { ResultsContext, ResultsProvider }