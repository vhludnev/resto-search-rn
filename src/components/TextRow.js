import React from 'react'
import { /* Platform */ Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const TextRow = props => {
   const { colors } = useTheme()
   return (
      <Text
         {...props}
         style={[{marginVertical: 2}, props.style, {color: colors.text}]}
      />
   )
}
