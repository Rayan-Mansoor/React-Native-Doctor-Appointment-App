import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress, children }) => (
  <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
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
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: '#4facfe',
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4facfe',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

export default RadioButton;
