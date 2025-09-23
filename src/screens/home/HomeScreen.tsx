import { StyleSheet, Text } from 'react-native'
import React from 'react'
import AppSafeView from '../../views/AppSafeView'
import HomeHeader from './HomeHeader'
import { AppFonts } from '../../styles/fonts'

const HomeScreen = () => {
  return (
    <AppSafeView>
      <HomeHeader />
      <Text style={{fontSize: 60}}>HomeScreen</Text>
      <Text style={{fontSize: 60, fontFamily: AppFonts.Medium}}>HomeScreen</Text>
      <Text style={{fontSize: 60, fontFamily: AppFonts.Bold}}>HomeScreen</Text>
    </AppSafeView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})