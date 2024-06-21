import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onPress, children }) => (
  <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
    <Text style={styles.radioButtonLabel}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

export default RadioButton;
