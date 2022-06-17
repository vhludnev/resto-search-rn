import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

export default () => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)

  // dinamically change view when screen turns:
  useEffect(() => {
    const updateWidth = () => setDeviceWidth(Dimensions.get('window').width)

    Dimensions.addEventListener('change', updateWidth)

    return () => { Dimensions.addEventListener('change', updateWidth).remove() }
  })

  const display = Dimensions.get('window').height > deviceWidth ? 'LANDSCAPE' : 'PORTRAIT'
  const height = Dimensions.get('window').height
  const width = deviceWidth

  return { display, height, width }
}
