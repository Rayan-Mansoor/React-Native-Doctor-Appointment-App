import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingToast = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/animations/loading.gif') }
        style={styles.gif}
        contentFit='fill'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gif: {
    height: 7,
  },
});

export default LoadingToast;
