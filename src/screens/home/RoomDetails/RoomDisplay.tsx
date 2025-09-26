import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../../views/AppSafeView';


const RoomDisplay = () => {
  return (
    <AppSafeView style={styles.container}>
    <View>
      <Text>RoomDisplay</Text>
    </View>
    </AppSafeView>
  )
}

export default RoomDisplay

const styles = StyleSheet.create({
      container: { flex: 1, padding: 5, backgroundColor: "#f8f8ff" },

})