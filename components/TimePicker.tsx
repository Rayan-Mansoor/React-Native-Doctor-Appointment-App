import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface TimePickerProps {
  onTimeSelected: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelected }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);

    if (event.type === 'set') {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      // Check if the selected time is within the allowed range
      if (hours >= 8 && hours < 18) {
        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        onTimeSelected(timeString);
      } else {
        Alert.alert('Invalid Time', 'Please select a time between 8 AM and 6 PM.');
        setTime(new Date()); // Reset to current time or any default time within the allowed range
      }
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Button onPress={showTimepicker} title="Show Time Picker" />
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={onChange}
        />
      )}
      <Text style={styles.selectedTime}>
        Selected Time: {`${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimePicker;
