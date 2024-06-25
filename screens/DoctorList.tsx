// DoctorList.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import doctorsList, { Doctor } from '../storage/data/en_doctor_list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LandingStackParams } from './LandingPage';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';
import { useTheme } from '../context/ThemeProvider';
import i18n from '../localization/i18n';


type Props = NativeStackScreenProps<LandingStackParams, 'DoctorList'>


const DoctorList: React.FC<Props> = ({route, navigation}) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const theme = useTheme()

  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const currentStep = 2;

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const { category } = route.params
  const filteredDoctors = doctorsList.filter(doctor => doctor.specialty === category);

  const handleDoctorSelect = (doc : Doctor) => {
    navigation.navigate('Appointment', { doctor: doc })
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors..."
      />

      <Text style={[styles.text, {fontSize: 22 + adjustmentFactor}]}>{i18n.t('select_doctor')}</Text>

      <ScrollView contentContainerStyle={styles.doctorsContainer}>
        {filteredDoctors.map(doctor => (
          <View key={doctor.id} style={styles.doctorCard}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={[styles.doctorName, {fontSize: 18 + adjustmentFactor}]}>{doctor.name}</Text>
              <Text style={[styles.doctorSpecialty, {fontSize: 14 + adjustmentFactor}]}>{doctor.specialty}, {doctor.location}</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={14 + adjustmentFactor} color={theme.rating}/>
                <Text style={[styles.ratingText, {fontSize: 14 + adjustmentFactor}]}>{doctor.rating}</Text>
              </View>
              <TouchableOpacity style={[styles.appointmentButton, {backgroundColor: theme.primaryMain}]} onPress={() => handleDoctorSelect(doctor)}>
                <Text style={[styles.appointmentButtonText, {fontSize: 14 + adjustmentFactor}]}>{i18n.t('schedule_appointment')}</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.dot, index + 1 === currentStep && {backgroundColor: theme.primaryMain}]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    paddingHorizontal: 20,
    paddingTop: 40, // To avoid overlap with the status bar
    backgroundColor: '#f0f0f0', // Slightly grey background for the entire screen
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  doctorsContainer: {
    paddingBottom: 60, // Space for the step indicator
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: 'white', // Slightly transparent white
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginHorizontal: 10,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  appointmentButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    padding: 8
  },
  appointmentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginVertical: 15
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  currentDot: {
    backgroundColor: '#4facfe', // Change to desired color for current step
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
  },
});

export default DoctorList;
