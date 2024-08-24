import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Appointment from './Appointment';
import DoctorCategory from './DoctorCategory';
import DoctorList from './DoctorList';
import HomeScreen from './Home';
import { Doctor } from '../storage/data/en_doctor_list';

export type LandingStackParams = {
  Home: any;
  Appointment: { doctor: Doctor };
  DoctorCategory: any;
  DoctorList: { category: string };
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
   </Stack.Navigator>
  )
}

export default LandingPage

const styles = StyleSheet.create({})