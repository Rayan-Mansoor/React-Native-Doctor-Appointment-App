import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet , SafeAreaView, TouchableOpacity} from 'react-native';
import { Appointment, RootState, removeAppointment } from '../storage/reduxStore';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '../localization/i18n';
import doctorsListEN, { Doctor } from '../storage/data/en_doctor_list';
import doctorsListUR from '../storage/data/ur_doctor_list';
import { useTheme } from '../context/ThemeProvider';
import { useMicrophone } from '../context/MicrophoneProvider';
import { rootNavigation } from '../components/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';

const UpcomingAppointments = () => {
  const language = useSelector((state: RootState) => state.language.locale);
  const upcomingAppointments = useSelector((state: RootState) => state.appointments.upcomingAppointments);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const { microphoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);
  
  const dispatch = useDispatch()
  const theme = useTheme();

  
  useFocusEffect(
    useCallback(() => {
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

    if (command.includes('setting' || 'settings')) {
      rootNavigation('Settings');
    } else if (command.includes('home || main page')) {
      rootNavigation('Home');
    } else if (command.includes('cancel') || command.includes('delete')) {
      const doctorName = command.replace(/(cancel|delete|doctor|appointment|with|of|checkup|the|dr)/g, '').trim();
      const appointmentToCancel = upcomingAppointments.find(
        (appointment) => appointment.doctor.name.toLowerCase().includes(`dr. ${doctorName}`)
      );
      if (appointmentToCancel) {
        handleApointmentCancel(appointmentToCancel);
      } else {
        console.log('Doctor not found.');
      }
    } else {
      console.log('Command not recognized.');
    }
  };

  const upcomingDoctors = upcomingAppointments.map((appointment: Appointment) => appointment.doctor);

  const filteredDoctors = language === 'en'
    ? doctorsListEN.filter(doctor => upcomingDoctors.some(upcomingDoctor => upcomingDoctor.id === doctor.id))
    : doctorsListUR.filter(doctor => upcomingDoctors.some(upcomingDoctor => upcomingDoctor.id === doctor.id));

  const updatedAppointments = upcomingAppointments.map((appointment: Appointment) => {
      const updatedDoctor = filteredDoctors.find(doctor => doctor.id === appointment.doctor.id);
      return {
        ...appointment,
        doctor: updatedDoctor || appointment.doctor // Fallback to the original doctor if not found in filteredDoctors
      };
    });

  const handleApointmentCancel = (item : Appointment) => { 
    dispatch(removeAppointment(item.dateTime));
   }

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={[styles.appointmentCard, {backgroundColor: theme.card}]}>
      <Image source={item.doctor.image } style={styles.doctorImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.doctorName, { fontSize: 18 + adjustmentFactor }]}>{item.doctor.name}</Text>
        <Text style={[styles.doctorSpecialty, { fontSize: 16 + adjustmentFactor }]}>{i18n.t(item.doctor.specialty.toLowerCase())}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.appointmentDateTime, { fontSize: 14 + adjustmentFactor }]}>{new Date(item.dateTime).toLocaleString()}</Text>
        <TouchableOpacity onPress={() => handleApointmentCancel(item)}>
          <MaterialIcons name="delete" size={24} color={theme.error} />
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionHeader, { fontSize: 30 + adjustmentFactor, color: theme.primaryMain }]}>
      {i18n.t("upcoming_appointments")}
      </Text>
      <View>
        {upcomingAppointments.length === 0 ? (
          <Text style={[styles.noAppointmentsText, { fontSize: 20 + adjustmentFactor }]}>{i18n.t("no_upcoming_appointments")}</Text>
        ) : (
          <FlatList
            data={updatedAppointments}
            renderItem={renderAppointment}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
  appointmentCard: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  appointmentDateTime: {
    fontSize: 14,
    color: '#555',
  },
  noAppointmentsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default UpcomingAppointments;
