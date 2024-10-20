import { useEffect, useRef } from 'react';
import { NativeEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import { useMicrophone } from '../context/MicrophoneProvider';
import KeyEvent from 'react-native-keyevent';
import Voice from '@react-native-voice/voice';
import i18n from '../localization/i18n';

const useVolumeButtonListener = () => {
  const { setMicrophoneResult, setIsListening, setIsProcessing } = useMicrophone();
  const lastKeyUpTimeRef = useRef(0);

  Voice.onSpeechError = () => {
    setIsListening(false);
    setIsProcessing(false)
}


  Voice.onSpeechResults = speechResult => {
      if(speechResult.value){
          setIsProcessing(true)
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
          const voiceLang = i18n.locale == 'en' ? 'en-US' : 'ur-PK'
          Voice.start(voiceLang, {
            EXTRA_PREFER_OFFLINE: true
          });
            setIsListening(true)
        } else {
          console.log("Microphone permission denied");
        }
      }
  };

};

export default useVolumeButtonListener;
