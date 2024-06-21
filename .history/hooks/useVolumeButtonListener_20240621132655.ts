// useVolumeButtonListener.ts

import { useEffect, useRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { useMicrophone } from '../context/MicrophoneProvider';
import KeyEvent from 'react-native-keyevent';
import Voice from '@react-native-voice/voice';

const useVolumeButtonListener = () => {
  const { setMicrophoneResult } = useMicrophone();
  const lastKeyUpTimeRef = useRef(0);

  useEffect(() => {
    // Ensure that the required methods are properly set
    if (!KeyEvent.onKeyUpListener || !KeyEvent.removeKeyUpListener) {
      console.error("KeyEvent does not provide the required methods.");
      return;
    }

    Voice.onSpeechResults = (speechResult) => {
      if (speechResult.value) {
        setMicrophoneResult(speechResult.value[0]);
      }
    };

    KeyEvent.onKeyUpListener(() => {
      const currentTime = new Date().getTime();
      if (currentTime - lastKeyUpTimeRef.current < 300) {
        console.log('Volume up button pressed twice');
        startSpeechRecognition();
      }
      lastKeyUpTimeRef.current = currentTime;
    });

    return () => {
      KeyEvent.removeKeyUpListener();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechRecognition = async () => {
    if (Platform.OS === 'android') {
      const voicePermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (voicePermissionReq === PermissionsAndroid.RESULTS.GRANTED) {
        Voice.start('en-US');
      } else {
        console.log("Microphone permission denied");
      }
    }
  };
};

export default useVolumeButtonListener;
