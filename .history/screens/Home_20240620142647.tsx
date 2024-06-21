import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';

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

type Props = NativeStackScreenProps<RootStackParams, 'Home'>

const Home = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome to HealthCare</Text>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Hello, User!</Text>
        <TouchableOpacity style={styles.notificationsButton}>
          <FontAwesome name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionHeader}>Upcoming Appointments</Text>
      <View style={styles.appointmentBlock}>
        <Text style={styles.appointmentText}>No upcoming appointments</Text>
      </View>

      {/* Featured Doctors */}
      <Text style={styles.sectionHeader}>Featured Doctors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredDoctorsContainer}>
        {featuredDoctors.map((doctor, index) => (
          <TouchableOpacity key={index} style={styles.doctorCard} onPress={() => {}}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="gold" />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.bookButton} onPress={() => {}}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    fontSize: 24,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationsButton: {
    backgroundColor: '#4facfe',
    padding: 10,
    borderRadius: 20,
  },
  sectionHeader: {
    fontSize: 20,
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
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 60,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
