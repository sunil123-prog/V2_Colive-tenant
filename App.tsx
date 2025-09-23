import { StyleSheet, ActivityIndicator } from 'react-native';
import AppSafeView from './src/views/AppSafeView';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from './src/navigation/MainAppStack';
import React from 'react';
import { useFonts } from 'expo-font';

export default function App() {

const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf")
  })

  if(!fontsLoaded){
    return <ActivityIndicator size={"large"} />
  }

  return (
    <>
    <NavigationContainer>
    <AppSafeView style={styles.container}>
      <FlashMessage style={styles.container} />

      <MainAppStack />
    </AppSafeView>
    </NavigationContainer>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
