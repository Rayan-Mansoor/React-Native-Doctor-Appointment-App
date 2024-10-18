import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';
import { Appointment, RootState, removeAppointment, updateAppointment } from '../storage/reduxStore';
import { Image } from 'expo-image';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import i18n from '../localization/i18n';
import doctorsListEN from '../storage/data/en_doctor_list';
import doctorsListUR from '../storage/data/ur_doctor_list';
import { useTheme } from '../context/ThemeProvider';
import { useMicrophone } from '../context/MicrophoneProvider';
import { rootNavigation } from '../components/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateObject } from '../utils/utilityFunctions';
import { format } from 'date-fns';
import { useTensorFlow } from '../context/TFModelProvider';

const UpcomingAppointments: React.FC = () => {
  const language = useSelector((state: RootState) => state.language.locale);
  const upcomingAppointments = useSelector((state: RootState) => state.appointments.upcomingAppointments);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const { microphoneResult, setMicrophoneResult } = useMicrophone();
  const { classifyIntent } = useTensorFlow();
  const microphoneResultRef = useRef<string | null>(null);

  const dispatch = useDispatch();
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeModalVisible, setTimeModalVisible] = useState(false);

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
      setMicrophoneResult('')
    }
  }, [microphoneResult, setMicrophoneResult]);

  const handleVoiceCommand = async (command: string | null) => {
    if (!command) return;

    const prediction = await classifyIntent(command)
    console.log(`Predicted Intent: ${prediction}`)

    switch (prediction) {
      case "navigate_home":
        rootNavigation('Home')
        break;
      case "navigate_setting":
        rootNavigation('Settings');
        break;
      case "reschedule_appointment":
        const doctorToReschedule = command.replace(/(reschedule|doctor|appointment|with|of|checkup|the|dr)/g, '').trim();
        const appointmentToReschedule = upcomingAppointments.find(
          (appointment) => appointment.doctor.name.toLowerCase().includes(`dr. ${doctorToReschedule}`)
        );
        if (appointmentToReschedule) {
          handleAppointmentTimings(appointmentToReschedule);
        } else {
          console.log('Doctor not found.');
        }
        break;
      case "cancel_appointment":
        const doctorToCancel = command.replace(/(cancel|delete|doctor|appointment|with|of|checkup|the|dr)/g, '').trim();
        const appointmentToCancel = upcomingAppointments.find(
          (appointment) => appointment.doctor.name.toLowerCase().includes(`dr. ${doctorToCancel}`)
        );
        if (appointmentToCancel) {
          handleAppointmentCancel(appointmentToCancel);
        } else {
          console.log('Doctor not found.');
        }
        break;
      default:
        console.log('Command not recognized.');
        break;
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

  const handleAppointmentCancel = (item: Appointment) => {
    dispatch(removeAppointment(item.id));
  };

  const handleAppointmentTimings = (item: Appointment) => {
    setSelectedAppointment(item);
    setSelectedDate(format(new Date(item.dateTime), 'yyyy-MM-dd'));
    setModalVisible(true); // Show the calendar modal
  };
  
  const handleDaySelect = (day: DateObject) => {
    setSelectedDate(day.dateString);
    setTimeModalVisible(true); // Show the time picker modal after a date is selected
    setModalVisible(false); // Hide the calendar modal
  };

  const handleTimeSelected = (event: DateTimePickerEvent, selectedTime1: Date | undefined) => {
    const currentTime = selectedTime1 || selectedTime;
    setSelectedTime(currentTime);

    if (event.type === 'set') {
      setTimeModalVisible(false);
      confirmAppointmentUpdate()
    } else if (event.type === 'dismissed') {
      setTimeModalVisible(false);
    }
  };

  const confirmAppointmentUpdate = () => {
    if (selectedAppointment && selectedDate) {
      const updatedDateTime = constructDateTime(selectedDate, selectedTime);
      dispatch(updateAppointment({ ...selectedAppointment, dateTime: updatedDateTime.toISOString() }));
      Alert.alert(i18n.t("appointment_updated"), `${i18n.t("appointment_updated_to")} ${format(updatedDateTime, 'yyyy-MM-dd HH:mm')}`);
      setModalVisible(false);
    }
  };

  const constructDateTime = (dateString: string, time: Date): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return new Date(year, month - 1, day, hours, minutes);
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={[styles.appointmentCard, { backgroundColor: theme.card }]}>
      <Image source={item.doctor.image} style={styles.doctorImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.doctorName, { fontSize: 18 + adjustmentFactor }]}>{i18n.t('doctor')} {item.doctor.name}</Text>
        <Text style={[styles.doctorSpecialty, { fontSize: 16 + adjustmentFactor }]}>{i18n.t(item.doctor.specialty.toLowerCase())}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.appointmentDateTime, { fontSize: 14 + adjustmentFactor }]}>{new Date(item.dateTime).toLocaleString()}</Text>
          <TouchableOpacity onPress={() => handleAppointmentTimings(item)}>
            <FontAwesome name="calendar-times-o" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert(i18n.t("cancel_appointment"), `${i18n.t("cancel_appointment_confirmation")}`, [{text: i18n.t("yes"),onPress: () => handleAppointmentCancel(item)}, {text: i18n.t("no"), onPress: () => {}}])}>
            <MaterialIcons name="delete" size={24} color='black' />
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
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
  
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Calendar
            current={selectedDate || new Date().toISOString().split('T')[0]}
            onDayPress={handleDaySelect}
            markedDates={{ [selectedDate || '']: { selected: true, selectedColor: theme.primaryMain } }}
          />
        </View>
      </Modal>
  
      <Modal
        transparent={true}
        animationType="slide"
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display="clock"
            onChange={handleTimeSelected}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  appointmentCard: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  doctorImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontStyle: 'italic',
    color: 'gray',
  },
  appointmentDateTime: {
    marginTop: 5,
  },
  noAppointmentsText: {
    marginTop: 30,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpcomingAppointments;
