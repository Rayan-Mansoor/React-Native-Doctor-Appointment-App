import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet , SafeAreaView, TouchableOpacity} from 'react-native';
import { Appointment, RootState, removeAppointment } from '../storage/reduxStore';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '../localization/i18n';
import doctorsListEN, { Doctor } from '../storage/data/en_doctor_list';
import doctorsListUR from '../storage/data/ur_doctor_list';

const UpcomingAppointments = () => {
  const language = useSelector((state: RootState) => state.language.locale);
  const upcomingAppointments = useSelector((state: RootState) => state.appointments.upcomingAppointments);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const [translatedAppointments, setTranslatedAppointments] = useState<Appointment[]>()

  const dispatch = useDispatch()

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

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
    <View style={styles.appointmentCard}>
      <Image source={item.doctor.image } style={styles.doctorImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.doctorName, { fontSize: 18 + adjustmentFactor }]}>{item.doctor.name}</Text>
        <Text style={[styles.doctorSpecialty, { fontSize: 16 + adjustmentFactor }]}>{i18n.t(item.doctor.specialty.toLowerCase())}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.appointmentDateTime, { fontSize: 14 + adjustmentFactor }]}>{new Date(item.dateTime).toLocaleString()}</Text>
        <TouchableOpacity onPress={() => handleApointmentCancel(item)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <Text style={[styles.sectionHeader, { fontSize: 20 + adjustmentFactor }]}>
        {i18n.t("upcoming_appointments")}
      </Text>
      <View>
        {upcomingAppointments.length === 0 ? (
          <Text style={[styles.noAppointmentsText, { fontSize: 20 + adjustmentFactor }]}>No upcoming appointments</Text>
        ) : (
          <FlatList
            data={updatedAppointments}
            renderItem={renderAppointment}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor:'white',
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
