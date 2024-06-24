import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const RecordingToast = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/recording.gif') }
        style={styles.gif}
      />
      <Text style={styles.text}>Recording</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
  },
  gif: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default RecordingToast;
