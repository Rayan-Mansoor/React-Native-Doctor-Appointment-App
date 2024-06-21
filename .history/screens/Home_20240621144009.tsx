import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import i18n from '../localization/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';
import { useTheme } from '../context/ThemeProvider';
import { useMicrophone } from '../context/MicrophoneProvider';
import { useFocusEffect } from '@react-navigation/native';


const featuredDoctors = [
  {
    name: 'Dr. John Doe',
    specialty: 'Heart Surgeon',
    location: 'London',
    image: require('../assets/doctor1.jpg'),
    rating: 4.5,
  },
  {
    name: 'Dr. Jane Smith',
    specialty: 'Dentist',
    location: 'New York',
    image: require('../assets/doctor2.jpeg'),
    rating: 4.7,
  },
  
  // Add more doctors as needed
];

type Props = NativeStackScreenProps<RootStackParams>

const Home = ({ navigation }: Props) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const theme = useTheme();
  const { microphoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      microphoneResultRef.current = microphoneResult;

      return () => {
        microphoneResultRef.current = null;
      };
    }, [microphoneResult])
  );

  useEffect(() => {
    if (microphoneResultRef.current) {
      handleVoiceCommand(microphoneResultRef.current)
      // console.log('Microphone Result:', microphoneResultRef.current);
    }
  }, [microphoneResultRef.current]);


  useEffect(() => {
    i18n.locale = language;
    }, [language]);

    const handleVoiceCommand = (command: string | null) => {
      if (!command) return;
  
      command = command.toLowerCase();
      console.log('Voice Command:', command);
  
      if (command.includes('settings')) {
        navigation.navigate('Settings');
      } else if (command.includes('appointments')) {
        navigation.navigate('Appointment');
      } else if (command.includes('about')) {
        navigation.navigate('About');
      } else if (command.includes('book appointment')) {
        navigation.navigate('Appointment');
      } else if (command.includes('featured doctors')) {
        // Scroll to featured doctors section
        // Assuming you have a ref to the ScrollView and can scroll to a specific position
      } else if (command.includes('hello') || command.includes('hi')) {
        console.log('Hello, how can I help you?');
      } else {
        console.log('Command not recognized.');
      }
    };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={[styles.header, {fontSize: 24 + adjustmentFactor}]}>{i18n.t('welcome')}</Text>

      <View style={styles.userInfoContainer}>
        <Text style={[styles.userInfoText, {fontSize: 18 + adjustmentFactor}]}>{i18n.t('hello_user')}</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={[styles.iconButton, {backgroundColor: theme.primaryMain}]} onPress={() => navigation.navigate("Settings")}>
            <FontAwesome name="cog" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, {backgroundColor: theme.primaryMain}]}>
            <FontAwesome name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Upcoming Appointments */}
      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('upcoming_appointments')}</Text>
      <View style={styles.appointmentBlock}>
        <Text style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('no_upcoming_appointments')}</Text>
      </View>

      {/* Featured Doctors */}
      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('featured_doctors')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredDoctorsContainer}>
        {featuredDoctors.map((doctor, index) => (
          <TouchableOpacity key={index} style={styles.doctorCard} onPress={() => {}}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <Text style={[styles.doctorName, {fontSize: 16 + adjustmentFactor}]}>{doctor.name}</Text>
            <Text style={[styles.doctorSpecialty, {fontSize: 14 + adjustmentFactor}]}>{doctor.specialty}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14 + adjustmentFactor} color={theme.rating} />
              <Text style={[styles.ratingText, {fontSize: 14 + adjustmentFactor}]}>{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Appointment Button */}
      <TouchableOpacity style={[styles.bookButton, {backgroundColor: theme.primaryMain}]} onPress={() => { navigation.navigate("Appointment")}}>
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoText: {
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  appointmentBlock: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  appointmentText: {
    color: '#666',
  },
  featuredDoctorsContainer: {
    marginBottom: 20,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
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
