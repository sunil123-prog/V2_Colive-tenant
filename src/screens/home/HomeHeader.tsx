import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AppColors } from '../../styles/colors'
import { vs,s } from 'react-native-size-matters'
import { IMAGES } from '../../constants/images-path';


const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image
       source={IMAGES.appLogo} 
       style={styles.logo}
      />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: vs(10)
    },
    logo: {
        height: vs(60),
        width: s(60),
        tintColor: AppColors.white
    }
})