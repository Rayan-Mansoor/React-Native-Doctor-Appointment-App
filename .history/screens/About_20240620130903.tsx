import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

function AboutScreen({ navigation }) {
  const [name, setName] = useState('Rayyan');
  const [age, setAge] = useState('21');
  const [gender, setGender] = useState('male');
  const [animation] = useState(new Animated.Value(0));
  const [confirmedAnimation] = useState(new Animated.Value(0));
  const [buttonBackgroundColor] = useState(new Animated.Value(0));
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Animation for fading in the "Appointment Confirmed!" text
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: 500, // Adding a delay for a better user experience
    }).start();

    // Button background color animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonBackgroundColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(buttonBackgroundColor, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animation, buttonBackgroundColor]);

  const handleConfirmation = () => {
    Animated.timing(confirmedAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setIsConfirmed(true);
    });
  };

  return (
    <View style={styles.container}>
      {/* Animated text for "Appointment Confirmed!" */}
      <Animated.Text style={[styles.title, { opacity: animation }]}>
        Appointment Confirmed!
      </Animated.Text>

      {/* Appointment details */}
      <Animated.View style={[styles.detailsContainer, { opacity: animation }]}>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailText}>{name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text style={styles.detailText}>{age}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailText}>{gender}</Text>
        </View>
      </Animated.View>

      {/* Cancel appointment button */}
      <TouchableOpacity onPress={handleConfirmation}>
        <Animated.View
          style={[
            styles.cancelButton,
            {
              backgroundColor: buttonBackgroundColor.interpolate({
                inputRange: [0, 1],
                outputRange: ['#4CAF50', '#8BC34A'],
              }),
            },
          ]}
        >
          <Text style={styles.cancelText}>Tap to cancel appointment</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Display Lottie animation when appointment is confirmed */}
      {isConfirmed && (
        <LottieView
          source={require('../assets/Celebrations.json')} // Replace with your animation file path
          autoPlay
          loop={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  detailsContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#555',
    width: 80,
  },
  detailText: {
    fontSize: 24,
    color: '#333',
  },
  cancelButton: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default AboutScreen;
