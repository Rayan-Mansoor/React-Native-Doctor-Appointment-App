import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import AboutScreen from './screens/About'
import Appointment from './screens/Appointment'
import DoctorCategory from './screens/DoctorCategory'
import DoctorList from './screens/DoctorList'
import LandingPage from './screens/LandingPage'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {/* <Stack.Screen name="LandingPage" component={LandingPage} /> */}
         {/* <Stack.Screen name="DoctorCategory" component={DoctorCategory} /> */}
         {/* <Stack.Screen name="DoctorList" component={DoctorList} /> */}
        {/* <Stack.Screen name="Appointment" component={Appointment} /> */}
        {/* <Stack.Screen name="Calendar" component={CalendarPrac} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
         <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
