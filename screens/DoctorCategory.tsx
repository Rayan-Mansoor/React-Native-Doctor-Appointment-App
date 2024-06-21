// DoctorCategorySelection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const doctorCategories = [
  { id: 1, title: 'Cardiology', image: require('../assets/cardiologist.jpg') },
  { id: 2, title: 'Dermatology', image: require('../assets/cardiologist.jpg') },
  { id: 3, title: 'Neurology', image: require('../assets/cardiologist.jpg') },
  { id: 4, title: 'Pediatrics', image: require('../assets/cardiologist.jpg') },
  { id: 5, title: 'Radiology', image: require('../assets/cardiologist.jpg') },
  { id: 6, title: 'Surgery', image: require('../assets/cardiologist.jpg') },
  { id: 7, title: 'Radiology', image: require('../assets/cardiologist.jpg') },
  { id: 8, title: 'Surgery', image: require('../assets/cardiologist.jpg') },
  // Add more categories as needed
];

const DoctorCategory= () => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const currentStep = 2; // Assuming we're on Step 
  
  const handleCardPress = (second: string) => { 
    
   }

  return (
    <View style={styles.container}>
      {/* Logo */}
      {/* <Image source={require('../assets/.png')} style={styles.logo} /> */}

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.dot, index + 1 === currentStep && styles.currentDot]} />
        ))}
        {/* <View style={styles.line} /> */}
      </View>

      {/* Prompt */}
      <Text style={styles.text}>Select your doctor category</Text>

      {/* Doctor Categories */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {doctorCategories.map(category => (
          <TouchableOpacity key={category.id} style={styles.card} onPress={() => handleCardPress(category.title)}>
            <Image source={category.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, // To avoid overlap with the status bar
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    position: 'absolute',
    top: 10,
    left: 10,
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 120, // Space for the logo and step indicator
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%', // Adjust the width as needed
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorCategory;
