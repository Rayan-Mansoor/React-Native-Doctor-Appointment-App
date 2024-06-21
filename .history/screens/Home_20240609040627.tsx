import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const nameShakeAnimation = useState(new Animated.Value(0))[0];
  const ageShakeAnimation = useState(new Animated.Value(0))[0];
  const [buttonBackgroundColor] = useState(new Animated.Value(0));

  useEffect(() => {
    if (nameError) {
      shakeAnimation(nameShakeAnimation);
    }
    if (ageError) {
      shakeAnimation(ageShakeAnimation);
    }
  }, [nameError, ageError, nameShakeAnimation, ageShakeAnimation]);

  const shakeAnimation = (animation) => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonBackgroundColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(buttonBackgroundColor, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        })
      ])
    ).start();
  }, [buttonBackgroundColor]);

  const handleConfirm = () => {
    if (nameError || ageError) {
      Alert.alert('Error', 'Please enter correct details.');
    } else {
      console.log('Name:', name);
      console.log('Age:', age);
      console.log('Gender:', gender);
      setName('');
      setAge('');
      setGender('male');
    }
  };

  const validateName = (text) => {
    setName(text);
    if (text.length < 3 || /\d/.test(text)) {
      setNameError('Name should contain at least 3 characters and no numbers.');
    } else {
      setNameError('');
    }
  };

  const validateAge = (text) => {
    setAge(text);
    const ageNum = parseInt(text);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
      setAgeError('Age should be a number between 10 and 120.');
    } else {
      setAgeError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Credentials</Text>
      
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.input, nameError && styles.inputError, { transform: [{ translateX: nameShakeAnimation }] }]}>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={validateName}
            style={styles.inputText}
          />
        </Animated.View>
        {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Animated.View style={[styles.input, ageError && styles.inputError, { transform: [{ translateX: ageShakeAnimation }] }]}>
          <TextInput
            placeholder="Enter Age"
            placeholderTextColor="#888"
            value={age}
            onChangeText={validateAge}
            keyboardType="numeric"
            style={styles.inputText}
          />
        </Animated.View>
        {ageError ? <Text style={styles.errorMessage}>{ageError}</Text> : null}
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
          itemStyle={styles.pickerItem} 
        >
          <Picker.Item label="Male" value="male"  style={{ fontSize: 20}}  />
          <Picker.Item label="Female" value="female"  style={{ fontSize: 20}} />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleConfirm}>
        <Animated.View style={[styles.button, { backgroundColor: buttonBackgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['#4CAF50', '#8BC34A']
          }) }]}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 60,
  },
  pickerItem: {
    fontSize: 30,
  },
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    padding: 15
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default HomeScreen;
