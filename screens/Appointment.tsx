import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, Alert, Pressable, Button } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addAppointment } from '../storage/reduxStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LandingStackParams } from './LandingPage';
import { DateObject, formatDate, generateRandomDates, getDisabledDates } from '../utils/utilityFunctions';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import i18n from '../localization/i18n';
import { useMicrophone } from '../context/MicrophoneProvider';
import { rootNavigation } from '../components/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { useTensorFlow } from '../context/TFModelProvider';

interface MarkedDates {
  [key: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    disabled?: boolean;
  };
}

type Props = NativeStackScreenProps<LandingStackParams, 'Appointment'>

const Appointment: React.FC<Props> = ({navigation, route}) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [completeDate, setCompleteDate] = useState('');
  
  const { microphoneResult, setMicrophoneResult } = useMicrophone();
  const { classifyIntent } = useTensorFlow();

  const microphoneResultRef = useRef<string | null>(null);
  
  const { doctor } = route.params
  
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
      setMicrophoneResult('')
    }
  }, [microphoneResult, setMicrophoneResult]);

  const handleAlertOkPress = () => { 
    navigation.replace("Home")
   }

   const handleVoiceCommand = async (command: string | null) => {
    if (!command) return;

    const prediction = await classifyIntent(command)
    console.log(`Predicted Intent: ${prediction}`)

    switch (prediction) {
      case "navigate_home":
        rootNavigation('Home')
        break;
      case "navigate_appointments":
        rootNavigation('MyAppointments')
        break;
      case "navigate_setting":
        rootNavigation('Settings');
        break;
      case "confirm_appointment":
        confirmAppointment();
        break;
      case "select_date":
        selectDateProgrammatically('2024-08-28');
        break;
      case "select_time":
        selectTimeProgrammatically(14, 30);
        break;
      default:
        console.log('Command not recognized.');
        break;
    }
  };

  const theme = useTheme();
  const dispatch = useDispatch()

  const currentDateString = new Date().toISOString().split('T')[0];
  const twoMonthsLaterString = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0];
  const initialMarkedDates = generateRandomDates(30);
  const markedDatesWithDisabled = getDisabledDates(currentDateString, twoMonthsLaterString, initialMarkedDates);
  
  const [markedDates, setMarkedDates] = useState<MarkedDates>(markedDatesWithDisabled);

  const constructDateTime = (dateString: string, time: Date): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
  
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  const formatAppointmentDateTime = (date: string | null, time: Date | null): string | null => {
    if (!date || !time) return null;
  
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  
    const formattedTime = time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  
    return `${i18n.t("appointment_timing")} ${formattedTime} ${formattedDate}`;
  };

  const handleDaySelect = (day: DateObject | string) => {
    const date = typeof day === 'string' ? day : day.dateString;
  
    if (markedDates[date] && !markedDates[date].disabled) {
      setSelectedDate(date);
      setMarkedDates({
        ...markedDates,
        [date]: { selected: true, marked: true, selectedColor: theme.primaryMain },
      });
      setTimeModalVisible(true);
    }
  };


  const selectDateProgrammatically = (dateString: string) => {
    const dayObject = {
      dateString: dateString,
      day: parseInt(dateString.split('-')[2]),
      month: parseInt(dateString.split('-')[1]),
      year: parseInt(dateString.split('-')[0]),
      timestamp: new Date(dateString).getTime()
    };
  
    handleDaySelect(dayObject);
  };

  const handleTimeSelected = (event: DateTimePickerEvent | null, selectedTime1?: Date) => {
    const currentTime = selectedTime1 || selectedTime;
    setSelectedTime(currentTime);
  
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
  
    if (hours >= 8 && hours < 18) {
      const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTimeModalVisible(false);
      setCompleteDate(timeString);
    } else {
      Alert.alert(i18n.t("invalid_time"), `${i18n.t("please_select_time")}`);
      setTimeModalVisible(false);
    }
  };

  const selectTimeProgrammatically = (hours: number, minutes: number) => {
    const newDate = new Date(selectedTime);
    newDate.setHours(hours, minutes, 0, 0);
  
    // Create a mock event object
    const mockEvent: DateTimePickerEvent = {
      type: 'set',
      nativeEvent: {
        timestamp: newDate.getTime(),
        utcOffset: 0
      },
    };
  
    // Call handleTimeSelected with the mock event and new date
    handleTimeSelected(mockEvent, newDate);
  };

  const confirmAppointment = () => {
    const appointmentDateTime = constructDateTime(selectedDate!!,selectedTime)
    const appointmentID = uuidv4()
    dispatch(addAppointment({id: appointmentID, doctor, dateTime: appointmentDateTime.toISOString()}));
    Alert.alert(i18n.t("appointment_confirmed"), `${i18n.t("appointment_scheduled_at")} ${formatDate(appointmentDateTime)}`, [{text: 'OK', onPress: handleAlertOkPress}]);
};

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      <Image source={doctor.image} style={styles.doctorImage} />
      <Text style={[styles.doctorName, {fontSize: 22 + adjustmentFactor}]}>{doctor.name}</Text>
      <View style={styles.doctorSpecialty}>
        <FontAwesome name="stethoscope" size={14 + adjustmentFactor} color="gray" />
        <Text style={[styles.specialtyText, {fontSize: 16 + adjustmentFactor, color: theme.secondaryText}]}>{i18n.t(doctor.specialty.toLowerCase())}</Text>
      </View>

      <View style={[styles.statsContainer, {backgroundColor: theme.primaryMain}]}>
        <View style={[styles.statBlock, {backgroundColor: theme.card}]}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.yearsExperience}+</Text>
          <Text style={{fontSize: 12 + adjustmentFactor, color: theme.secondaryText}}>{i18n.t("years_experience")}</Text>
        </View>
        <View style={[styles.statBlock, {backgroundColor: theme.card}]}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.patients}+</Text>
          <Text style={{fontSize: 12 + adjustmentFactor, color: theme.secondaryText}}>{i18n.t("patients")}</Text>
        </View>
        <View style={[styles.statBlock, {backgroundColor: theme.card}]}>
          <Text style={[styles.statNumber, {fontSize: 18 + adjustmentFactor}]}>{doctor.rating}</Text>
          <Text style={{fontSize: 12 + adjustmentFactor, color: theme.secondaryText}}>{i18n.t("rating")}</Text>
        </View>
      </View>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t("about_doctor")}</Text>
      <Text style={[styles.aboutText, {fontSize: 16 + adjustmentFactor, color: theme.secondaryText}]}>{doctor.about}</Text>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t("schedule")}</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          style={{backgroundColor: theme.card}}
          current={new Date().toISOString().split('T')[0]}
          minDate={new Date().toISOString().split('T')[0]}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0]}
          onDayPress={handleDaySelect}
          onDayLongPress={handleDaySelect}
          monthFormat={'MMMM yyyy'}
          hideArrows={false}
          renderArrow={(direction: string) => (
            <AntDesign name={direction === 'left' ? 'caretleft' : 'caretright'} size={18} color="black" />
          )}
          hideExtraDays={true}
          disableMonthChange={true}
          markedDates={markedDates}
          theme={{
            calendarBackground: theme.card,
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

      {completeDate &&       
        <Text style={{fontSize: 16 + adjustmentFactor, color: theme.secondaryText}}>{formatAppointmentDateTime(selectedDate, selectedTime)}</Text>    
      }

      <Pressable onPress={confirmAppointment} disabled={!completeDate}>
        {({ pressed }) => (
          <View style={[styles.bookButton,{ opacity: !completeDate ? 0.5 : (pressed ? 0.5 : 1), backgroundColor: theme.primaryMain }]}>
            <Text style={[styles.bookButtonText, {fontSize: 18 + adjustmentFactor, color: theme.background}]}>{i18n.t("confirm_appointment")}</Text>
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
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  doctorName: {
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
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  aboutText: {
    marginBottom: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  bookButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 60,
  },
  bookButtonText: {
    fontWeight: 'bold',
  },


});

export default Appointment;
