import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import TimePicker from '../components/TimePicker';

const doctor = {
  name: 'Dr. John Doe',
  specialty: 'Heart Surgeon',
  location: 'London',
  image: require('../assets/doctor1.jpg'),
  rating: 4.5,
  about: 'Dr. John Doe is an experienced heart surgeon with over 20 years of practice...',
};

const stats = [
  { number: '20+', label: 'Years Experience' },
  { number: '500+', label: 'Patients' },
  { number: '4.5', label: 'Rating' },
];

const visitHours = ['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

interface MarkedDates {
  [key: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    disabled?: boolean;
  };
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const initialMarkedDates: MarkedDates = {
  '2023-06-01': { selected: true, marked: true, selectedColor: 'green' },
  '2023-06-02': { selected: true, marked: true, selectedColor: 'green' },
};

const getDisabledDates = (startDate: string, endDate: string, enabledDates: MarkedDates): MarkedDates => {
  const dates: MarkedDates = {};
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const dateString = currentDate.toISOString().split('T')[0];
    dates[dateString] = enabledDates[dateString] ? enabledDates[dateString] : { disabled: true };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>(getDisabledDates('2023-06-01', '2023-06-30', initialMarkedDates));

  const handleDayPress = (day: DateObject) => {
    const date = day.dateString;
    if (markedDates[date] && !markedDates[date].disabled) {
      setSelectedDate(date);
      setMarkedDates({
        ...markedDates,
        [date]: { selected: true, marked: true, selectedColor: 'blue' },
      });
      setModalVisible(true);
    }
  };

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time);
    // You can also add any additional logic you want to handle when a time is selected
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Appointment</Text>

      {/* Doctor Info */}
      <Image source={doctor.image} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <View style={styles.doctorSpecialty}>
        <FontAwesome name="stethoscope" size={14} color="gray" />
        <Text style={styles.specialtyText}>{doctor.specialty}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statBlock}>
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* About Doctor */}
      <Text style={styles.sectionHeader}>About Doctor</Text>
      <Text style={styles.aboutText}>{doctor.about}</Text>

      {/* Schedule */}
      <Text style={styles.sectionHeader}>Schedule</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          current={'2023-06-01'}
          minDate={'2023-05-10'}
          maxDate={'2023-07-30'}
          onDayPress={handleDayPress}
          onDayLongPress={handleDayPress}
          monthFormat={'yyyy MM'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          renderArrow={(direction) => (
            <Text>{direction === 'left' ? '<' : '>'}</Text>
          )}
          hideExtraDays={true}
          disableMonthChange={true}
          enableSwipeMonths={true}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'red',
            dayTextColor: '#2d4150',
            textDisabledColor: 'grey',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>

      {/* Modal for Time Selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Time for {selectedDate}</Text>
            <TimePicker onTimeSelected={handleTimeSelected} />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#4facfe',
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
    backgroundColor: '#4facfe',
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
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalTimeBlock: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#4facfe',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalTimeText: {
    fontSize: 16,
    color: 'white',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: 'white',
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Appointment;
