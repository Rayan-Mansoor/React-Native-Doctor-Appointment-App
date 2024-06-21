import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useTheme } from '../context/ThemeProvider';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress, children }) => {
  const theme = useTheme();

  return( 
  <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
    <View style={[styles.radioButton, selected && {borderColor: theme.primaryMain}]}>
      {selected && <View style={[styles.radioButtonInner, {backgroundColor: theme.primaryMain}]} />}
    </View>
    <Text style={styles.radioButtonLabel}>{children}</Text>
  </TouchableOpacity>
)};

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
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

export default RadioButton;
