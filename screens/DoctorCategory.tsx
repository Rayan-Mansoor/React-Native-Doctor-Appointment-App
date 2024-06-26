import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LandingStackParams } from './LandingPage';
import doctorCategories from '../storage/data/en_doctor_category';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';
import { useTheme } from '../context/ThemeProvider';
import i18n from '../localization/i18n';
import { rootNavigation } from '../components/RootNavigation';
import { useMicrophone } from '../context/MicrophoneProvider';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<LandingStackParams, 'DoctorCategory'>

const DoctorCategory: React.FC<Props> = ({navigation}) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const theme = useTheme()
  const { microphoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);

  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const currentStep = 1; 

  useFocusEffect(
    React.useCallback(() => {
      microphoneResultRef.current = microphoneResult;

      return () => {
        microphoneResultRef.current = null;
      };
    }, [microphoneResult])
  );

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  useEffect(() => {
    if (microphoneResultRef.current) {
      handleVoiceCommand(microphoneResultRef.current);
      console.log('Microphone Result:', microphoneResultRef.current);
    }
  }, [microphoneResult]);

  const handleVoiceCommand = (command: string | null) => {
    if (!command) return;

    command = command.toLowerCase();

    if (command.includes('home || main page')) {
      rootNavigation('Home');
    } else if (command.includes('setting' || 'settings')) {
      rootNavigation('Settings');
    } else if (command.includes('upcoming appointments' || 'my appointments')) {
      rootNavigation('MyAppointments');
    } else if (command.includes('book appointment')) {
      navigation.navigate('DoctorCategory');
    } else if (command.includes('cardiology')) {
      handleCardPress('Cardiology')
    } else if (command.includes('nephrology')) {
      handleCardPress('Nephrology')
    } else if (command.includes('neurology')) {
      handleCardPress('Neurology')
    } else if (command.includes('dermatology')) {
      handleCardPress('Dermatology')
    } else if (command.includes('orthopedics')) {
      handleCardPress('Orthopedics')
    } else if (command.includes('gastroenterology')) {
      handleCardPress('Gastroenterology')
    } else if (command.includes('pulmonology')) {
      handleCardPress('Pulmonology')
    } else if (command.includes('ophthalmology')) {
      handleCardPress('Ophthalmology')
    } else {
      console.log('Command not recognized.');
    }
  };
  
  const handleCardPress = (category: string) => { 
    navigation.navigate('DoctorList', { category: category })
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>

      <Text style={[styles.text, {fontSize: 22 + adjustmentFactor}]}>{i18n.t("select_category")}</Text>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {doctorCategories.map(category => (
          <TouchableOpacity key={category.title} style={[styles.card, {backgroundColor: theme.card}]} onPress={() => handleCardPress(category.title)}>
            <Image source={category.image} style={styles.cardImage} />
            <Text style={[styles.cardTitle, {fontSize: 16 + adjustmentFactor}]}>{i18n.t(category.title.toLowerCase())}</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, // To avoid overlap with the status bar
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
  text: {
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
