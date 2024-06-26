import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight, GestureResponderEvent, Button, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from '../localization/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';
import { useTheme } from '../context/ThemeProvider';
import { useMicrophone } from '../context/MicrophoneProvider';
import { useFocusEffect } from '@react-navigation/native';
import TypeWriterEffect from '../components/TypeWriterEffect';
import { getRandomHealthTip } from '../utils/utilityFunctions';
import * as Speech from 'expo-speech';
import { LandingStackParams } from './LandingPage';
import { useTooltip } from '../context/TooltipProvider';
import doctorsListEN, { Doctor } from '../storage/data/en_doctor_list';
import doctorsListUR from '../storage/data/ur_doctor_list';
import { rootNavigation } from '../components/RootNavigation';


type Props = NativeStackScreenProps<LandingStackParams, 'Home'>

const Home: React.FC<Props> = ({navigation}) => {
  const upcomingAppointments = useSelector((state: RootState) => state.appointments.upcomingAppointments);
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const theme = useTheme();
  const { microphoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);
  const [healthTip, setHealthTip] = useState('');
  const { showTooltip, hideTooltip } = useTooltip();

  const doctors: Doctor[] = language == 'en'? doctorsListEN : doctorsListUR

  doctors.sort((a, b) => b.rating - a.rating);

  const featuredDoctors: Doctor[] = doctors.slice(0, 2);

  useFocusEffect(
    useCallback(() => {
      microphoneResultRef.current = microphoneResult;

      return () => {
        microphoneResultRef.current = null;
      };
    }, [microphoneResult])
  );


  useEffect(() => {
    if (microphoneResultRef.current) {
      handleVoiceCommand(microphoneResultRef.current);
      console.log('Microphone Result:', microphoneResultRef.current);
    }
  }, [microphoneResult]);
  
  useEffect(() => {
    i18n.locale = language;

    const randomTip = getRandomHealthTip(language);
    setHealthTip(randomTip);
  }, [language]);

  const handleVoiceCommand = (command: string | null) => {
    if (!command) return;

    command = command.toLowerCase();

    if (command.includes('setting' || 'settings')) {
      rootNavigation('Settings');
    } else if (command.includes('upcoming appointments' || 'my appointments')) {
      rootNavigation('MyAppointments');
    } else if (command.includes('book appointment')) {
      navigation.navigate('DoctorCategory');
    } else if (command.includes('featured doctors' || 'best doctors')) {
      // Scroll to featured doctors section
      // Assuming you have a ref to the ScrollView and can scroll to a specific position
    } else {
      // Normalize doctor names and check for a match
      const matchedDoctor = featuredDoctors.find(doctor => {
        const doctorNameNormalized = doctor.name.toLowerCase().replace('dr. ', '');
        return command.includes(doctorNameNormalized);
      });

      if (matchedDoctor) {
        handlefeaturedDoctor(matchedDoctor);
      } else {
        console.log('Command not recognized.');
      }
    }
  };

  const handleSpeech = (text: string) => {
    if(language == 'en'){
      Speech.speak(text, {
        language: 'en',
      });
    } else if(language == 'ur'){
      Speech.speak(text, {
        language: 'ur',
      });
    }

  };

  const handlefeaturedDoctor = (doc: Doctor) => {
    navigation.navigate('Appointment', { doctor: doc })

  };

  const handleLongPress = (content: string) => (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    showTooltip(content, pageX, pageY);
    setTimeout(() => hideTooltip(), 3000); // Auto-hide after 3 seconds
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.header, {fontSize: 30 + adjustmentFactor, color: theme.primaryMain}]}>{i18n.t('welcome')}</Text>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('daily_tips')}</Text>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
      <TypeWriterEffect
          text={healthTip}
          style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleSpeech(healthTip)}>
          <Ionicons name="volume-high-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('upcoming_appointments')}</Text>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
      {upcomingAppointments.length === 0 ? (
        <Text style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('no_upcoming_appointments')}</Text>
      ) : (
        <Text style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('yes_upcoming_appointments')}</Text>
        )}
      </View>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('featured_doctors')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredDoctorsContainer}>
        {featuredDoctors.map((doctor, index) => (
          <TouchableOpacity key={index} style={[styles.doctorCard, {backgroundColor: theme.card}]} onPress={() => handlefeaturedDoctor(doctor)}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <Text style={[styles.doctorName, {fontSize: 16 + adjustmentFactor}]}>{doctor.name}</Text>
            <Text style={[styles.doctorSpecialty, {fontSize: 14 + adjustmentFactor}]}>{i18n.t(doctor.specialty.toLowerCase())}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14 + adjustmentFactor} color={theme.rating} />
              <Text style={[styles.ratingText, {fontSize: 14 + adjustmentFactor}]}>{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.bookButton, {backgroundColor: theme.primaryMain}]} onPress={() => { navigation.navigate("DoctorCategory")}} onLongPress={handleLongPress("book an appointment with a doctor")}>
        <Text style={[styles.bookButtonText, {fontSize: 18 + adjustmentFactor}]}>{i18n.t('book_appointment')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    elevation: 5,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 }
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoText: {
    fontWeight: 'bold',
    color: 'grey'
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    margin:5,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,  // Adjust this value to your preference
    right: 10,   // Adjust this value to your preference
  },
  appointmentText: {
    color: '#666',
  },
  featuredDoctorsContainer: {
    marginBottom: 20,
  },
  doctorCard: {
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    elevation: 5,
    margin: 10,
    alignItems: 'center',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  doctorName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctorSpecialty: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#808080',
  },
  bookButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin:5,
    elevation: 5,
    marginBottom: 60,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
  },
});

export default Home;
