import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Home from '../screens/Home';

export default function Index() {
const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
    </SafeAreaView>
  );
}