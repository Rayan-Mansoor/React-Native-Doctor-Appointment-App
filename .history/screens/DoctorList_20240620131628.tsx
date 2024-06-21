// DoctorList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have expo-vector-icons installed

const doctors = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Heart Surgeon', location: 'London', image: require('../assets/doctor1.jpg'), rating: 4.5 },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', location: 'London', image: require('../assets/doctor2.jpeg'), rating: 4.0 },
  { id: 3, name: 'Dr. Alex Johnson', specialty: 'Neurologist', location: 'London', image: require('../assets/doctor2.jpeg'), rating: 4.8 },
  // Add more doctors as needed
];

const DoctorList = () => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const currentStep = 3; // Assuming we're on Step 3

  const handleDoctorPress = (name : string) => {
    Alert.alert(`You selected ${name}`);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search doctors..."
      />

      {/* Prompt */}
      <Text style={styles.text}>Pick your doctor</Text>

      {/* Doctors List */}
      <ScrollView contentContainerStyle={styles.doctorsContainer}>
        {doctors.map(doctor => (
          <TouchableOpacity key={doctor.id} style={styles.doctorCard} onPress={() => handleDoctorPress(doctor.name)}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}, {doctor.location}</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={14} color="gold" />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
              <TouchableOpacity style={styles.appointmentButton}>
                <Text style={styles.appointmentButtonText}>Book Appointment</Text>
              </TouchableOpacity>
              <View style={styles.iconButtons}>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="comment" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="heart" size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.dot, index + 1 === currentStep && styles.currentDot]} />
        ))}
        {/* <View style={styles.line} /> */}
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
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
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  currentDot: {
    backgroundColor: 'blue', // Change to desired color for current step
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
  },
});

export default DoctorList;
