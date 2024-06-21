import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const LandingPage = () => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const currentStep = 1; 
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text>DOC SLOT</Text>
      <Image source={require('../assets/favicon.png')} style={styles.logo} />

      {/* Lottie Animation */}
      {/* <View style={styles.animationContainer}>
        <LottieView
          source={require('./assets/animation.json')} // Path to your animation file
          autoPlay
          loop
          style={styles.animation}
        />
      </View> */}

      {/* Text */}
      <Text style={styles.text}>How would you like to book your appointment?</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity>
      </View>
        
    {/* Step Indicator */}
    <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.dot, index + 1 === currentStep && styles.currentDot]} />
        ))}
        {/* <View style={styles.line} /> */}
      </View>
    {/* <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={[styles.dot, index + 1 === currentStep && styles.currentDot]} />
        ))}
        <View style={styles.line} />
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  animationContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: '#4facfe',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

export default LandingPage;
