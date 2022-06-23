import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Transition, Transitioning } from 'react-native-reanimated'

const Accordeon = ({ result }) => {
   const { colors } = useTheme()
   const [showHours, setShowHours] = useState(true)
   const ref = useRef()

   const { hours: [{open}] } = result
   
   const timeFixed = (str) => {
      const ar = str.split('')
      return `${ar[0]}${ar[1]}:${ar[2]}${ar[3]}`
   }

   const dayWeekday = (num) => {
      let arr = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      return arr[num]
   }

   const weekdayToday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][new Date().getDay()]

   const Active = (day) => {
     if (dayWeekday(day) === weekdayToday && !result.is_closed) {
      return true
     }
   }

   const transition = (
      <Transition.Together>
         <Transition.In type='fade' duration={200} />
         <Transition.Change />
         <Transition.Out type='fade' duration={200} />
      </Transition.Together>
   )

   return (
      <Transitioning.View 
         ref={ref}
         style={styles.container}
         transition={transition}
      >
         <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => { 
               ref.current.animateNextTransition()
               setShowHours(!showHours) 
            }}
         >
            <Text style={{color: colors.text, fontWeight: '700', paddingBottom: 5, flexGrow: 1}}>
               {result.is_closed ? <Text style={{color: 'red'}}>Closed</Text> : <Text style={{color: 'green'}}>Open</Text>}{' '}
               {!showHours ? <FontAwesome name="caret-down" size={16} color="#4E74D2" /> : <FontAwesome name="caret-up" size={16} color="#4E74D2" />}{' '}
               <Ionicons name="ios-time-outline" size={14} color="#4E74D2" />
            </Text>
         </TouchableOpacity>
         {showHours && open.map(({start, end, day}, idx) => {
            return (
               <View key={idx} style={styles.wrapper}>
                  <Text style={[{color: colors.text, width: 25}, Active(day) && styles.active]}>{dayWeekday(day)}: </Text>
                  <Text style={[{color: colors.text}, Active(day) && styles.active]}>{timeFixed(start)} - {timeFixed(end)}</Text>
               </View>
            )
         })}
      </Transitioning.View>
   )
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 20,
      paddingLeft: 5
   },
   wrapper: {
      flexDirection: 'row'
   },
   active: {
      color: 'green',
      fontWeight: '500'
   }
})

export default Accordeon


