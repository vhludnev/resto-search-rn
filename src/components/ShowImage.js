import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'

const ShowImage = ({ route }) => {
  const url = route.params.url
  return (
    <View style={{flex: 1}}>      
      <View style={[{...StyleSheet.absoluteFillObject} /* {transform: [{scale}, {translateX}]} */]}>
        <ReactNativeZoomableView
          maxZoom={3}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          captureEvent={true}
        >
          <ImageBackground source={{ uri: url }} resizeMode='contain' style={{flex: 1, justifyContent: 'center'}} />
        </ReactNativeZoomableView>
      </View>    
    </View>
  )
}

export default ShowImage