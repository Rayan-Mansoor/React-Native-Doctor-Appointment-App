import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, Alert, Pressable } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addAppointment } from '../storage/reduxStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LandingStackParams } from './LandingPage';
import { DateObject, generateRandomDates, getDisabledDates } from '../utils/utilityFunctions';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import i18n from '../localization/i18n';

interface MarkedDates {
  [key: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    disabled?: boolean;
  };
}

type Props = NativeStackScreenProps<LandingStackParams, 'Appointment'>

const Appointment: React.FC<Props> = ({route}) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [completeDate, setCompleteDate] = useState('');
  
  const { doctor } = route.params
  
  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const theme = useTheme();
  const dispatch = useDispatch()

  const currentDateString = new Date().toISOString().split('T')[0];
  const twoMonthsLaterString = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0];
  const initialMarkedDates = generateRandomDates(30);
  const markedDatesWithDisabled = getDisabledDates(currentDateString, twoMonthsLaterString, initialMarkedDates);
  
  const [markedDates, setMarkedDates] = useState<MarkedDates>(markedDatesWithDisabled);

  const confirmAppointment = () => {
    const appointmentDateTime = constructDateTime(selectedDate!!,selectedTime)
    dispatch(addAppointment({doctor, dateTime: appointmentDateTime.toISOString()}));
    // setSelectedTime(time);
    // You can also add any additional logic you want to handle when a time is selected
  };

  const constructDateTime = (dateString: string, time: Date): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
  
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  

  const handleDaySelect = (day: DateObject) => {
    const date = day.dateString;

    if (markedDates[date] && !markedDates[date].disabled) {
      setSelectedDate(date);
      setMarkedDates({
        ...markedDates,
        [date]: { selected: true, marked: true, selectedColor: theme.primaryMain },
      });
      setTimeModalVisible(true);
    }
  };

  const handleTimeSelected = (event: DateTimePickerEvent, selectedTime1: Date | undefined) => {
    const currentTime = selectedTime1 || selectedTime;
    setSelectedTime(currentTime);

    if (event.type === 'set') {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      if (hours >= 8 && hours < 18) {
        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        setTimeModalVisible(false)

        setCompleteDate(timeString);
      } else {
        Alert.alert('Invalid Time', 'Please select a time between 8 AM and 6 PM.');
        setTimeModalVisible(false)
      }
    }
    else if (event.type === 'dismissed') {
      setTimeModalVisible(false)
    }
    else if (event.type === 'neutralButtonPressed') {
      setTimeModalVisible(false)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={doctor.image} style={styles.doctorImage} />
      <Text style={[styles.doctorName, {fontSize: 22 + adjustmentFactor}]}>{doctor.name}</Text>
      <View style={styles.doctorSpecialty}>
        <FontAwesome name="stethoscope" size={14 + adjustmentFactor} color="gray" />
        <Text style={[styles.specialtyText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t(doctor.specialty.toLowerCase())}</Text>
      </View>

      <View style={[styles.statsContainer, {backgroundColor: theme.primaryMain}]}>
        <View style={styles.statBlock}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.yearsExperience}+</Text>
          <Text style={[styles.statLabel, {fontSize: 12 + adjustmentFactor}]}>{i18n.t("years_experience")}</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.patients}+</Text>
          <Text style={[styles.statLabel, {fontSize: 12 + adjustmentFactor}]}>{i18n.t("patients")}</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.rating}</Text>
          <Text style={[styles.statLabel, {fontSize: 12 + adjustmentFactor}]}>{i18n.t("rating")}</Text>
        </View>
      </View>


      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t("about_doctor")}</Text>
      <Text style={[styles.aboutText, {fontSize: 16 + adjustmentFactor}]}>{doctor.about}</Text>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t("schedule")}</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          minDate={new Date().toISOString().split('T')[0]}
          maxDate={'2024-07-30'}
          onDayPress={handleDaySelect}
          onDayLongPress={handleDaySelect}
          monthFormat={'MMMM yyyy'}
          hideArrows={false}
          renderArrow={(direction) => (
            <AntDesign name={direction === 'left' ? 'caretleft' : 'caretright'} size={18} color="black" />
          )}
          hideExtraDays={true}
          disableMonthChange={true}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#7cfc00',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'red',
            dayTextColor: 'black',
            textDisabledColor: 'grey',
            arrowColor: 'orange',
            monthTextColor: 'black',
            indicatorColor: 'black',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16 + adjustmentFactor,
            textMonthFontSize: 16 + adjustmentFactor,
            textDayHeaderFontSize: 16 + adjustmentFactor
            
          }}
        />
      </View>

      <Pressable onPress={confirmAppointment} disabled={!completeDate}>
        {({ pressed }) => (
          <View style={[styles.bookButton,{ opacity: !completeDate ? 0.5 : (pressed ? 0.5 : 1), backgroundColor: theme.primaryMain }]}>
            <Text style={[styles.bookButtonText, {fontSize: 18 + adjustmentFactor}]}>{i18n.t("confirm_appointment")}</Text>
          </View>
        )}
      </Pressable>

      <Modal
        transparent={true}
        animationType="slide"
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
      <DateTimePicker
        value={selectedTime}
        mode="time"
        is24Hour={false}
        display="clock"
        onChange={handleTimeSelected}
      />
      </Modal>
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
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctorSpecialty: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  specialtyText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 20,
    borderRadius: 20,
  },
  statBlock: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  visitHoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  visitHourBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '48%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  visitHourText: {
    fontSize: 16,
  },
  calendar: {
    height: 350,
  },
  bookButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 60,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default Appointment;
