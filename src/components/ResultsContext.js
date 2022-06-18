import { createContext, useState, useEffect } from 'react'

const ResultsContext = createContext()


const ResultsProvider = ({ children }) => {
   const [data, setData] = useState([])
   const [stars, setStars] = useState(false)
   const [price, setPrice] = useState(4 || undefined)
   const [active, setActive] = useState(null)
   const [selectedCategories, setSelectedCategories] = useState([])
   const [selectedServices, setSelectedServices] = useState([])

   // useEffect(() => {
   //    if (selectedCategories.length === 0) {
   //       setSelectedCategories([])
   //    }
   // }, [selectedCategories])
   
   const resultsData = { data, setData, active, setActive, price, setPrice, stars, setStars, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices }

   return <ResultsContext.Provider value={resultsData}>{children}</ResultsContext.Provider>
}

export { ResultsContext, ResultsProvider }