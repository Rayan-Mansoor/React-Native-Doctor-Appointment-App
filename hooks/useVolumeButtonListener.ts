import { useEffect, useRef } from 'react';
import { NativeEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import { useMicrophone } from '../context/MicrophoneProvider';
import KeyEvent from 'react-native-keyevent';
import Voice from '@react-native-voice/voice';

const useVolumeButtonListener = () => {
  const { setMicrophoneResult, setIsListening } = useMicrophone();
  const lastKeyUpTimeRef = useRef(0);

  Voice.onSpeechError = () => {
    setIsListening(false);
}


  Voice.onSpeechResults = speechResult => {
      if(speechResult.value){
          setMicrophoneResult(speechResult.value[0])
        }
      setIsListening(false);
  }

  useEffect(() => {

    KeyEvent.onKeyUpListener(() => {
      const currentTime = new Date().getTime();
      if (currentTime - lastKeyUpTimeRef.current < 300) {
        startSpeechRecognition();
      }
      lastKeyUpTimeRef.current = currentTime;
    });

    return () => {
      KeyEvent.removeKeyUpListener();
    };
  }, []);

  const startSpeechRecognition = async () => {
    if (Platform.OS === 'android') {
        const voicePermissionReq = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (voicePermissionReq === PermissionsAndroid.RESULTS.GRANTED) {
            Voice.start('en-US');
            setIsListening(true)
        } else {
          console.log("Microphone permission denied");
        }
      }
  };

};

export default useVolumeButtonListener;
