import { Settings, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from './About';
import Appointment from './Appointment';
import DoctorCategory from './DoctorCategory';
import DoctorList from './DoctorList';
import HomeScreen from './Home';

export type LandingStackParams = {
  Home: any;
  Appointment: any;
  DoctorCategory: any;
  DoctorList: any;
  About: any;
};

const Stack = createNativeStackNavigator<LandingStackParams>();

const LandingPage = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="DoctorCategory" component={DoctorCategory} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
   </Stack.Navigator>
  )
}

export default LandingPage

const styles = StyleSheet.create({})