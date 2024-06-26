import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, Button, PermissionsAndroid, Platform, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import i18n from '../localization/i18n';
import RadioButton from '../components/RadioButton'
import { RootState, setAdjustmentFactor, setEmail, setLanguage, setName, setPhone, setTheme } from '../storage/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useMicrophone } from '../context/MicrophoneProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import {storage as mmkvStorage} from '../storage/mmkvStorage'
import { RootTabParams } from '../App';

type Props = NativeStackScreenProps<RootTabParams, 'Settings'>

const Settings: React.FC<Props> = ({navigation}) => {
  const language = useSelector((state: RootState) => state.language.locale);
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const user = useSelector((state: RootState) => state.user);

  const theme = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [colorBlindnessEnabled, setColorBlindnessEnabled] = useState(false);
  const [colorBlindnessType, setColorBlindnessType] = useState<string>(currentTheme);
  const { microphoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      microphoneResultRef.current = microphoneResult;

      return () => {
        microphoneResultRef.current = null;
      };
    }, [microphoneResult])
  );

  useEffect(() => { 
    getNotificationState()
   }, [])

  useEffect(() => {
    if (microphoneResultRef.current) {
      handleVoiceCommand(microphoneResultRef.current);
      console.log('Microphone Result:', microphoneResultRef.current);
    }
  }, [microphoneResult]);
  

  useEffect(() => {
    if(currentTheme !== 'normal'){
      setColorBlindnessEnabled(true)
    }
  }, [currentTheme]);

  const handleVoiceCommand = (command: string | null) => {
    if (!command) return;
  
    command = command.toLowerCase();
    console.log('Voice Command:', command);
  
    if (command.includes("change name to")) {
      const newName = command.split("change name to ")[1];
      handleBioChange('name', newName);
    } else if (command.includes("update email to")) {
      const newEmail = command.split("update email to ")[1];
      handleBioChange('email', newEmail);
    } else if (command.includes("set phone number to")) {
      const newPhone = command.split("set phone number to ")[1];
      handleBioChange('phone', newPhone);
    } else if (command.includes("increase font size")) {
      handleSizeChange(adjustmentFactor + 2);
    } else if (command.includes("decrease font size")) {
      handleSizeChange(adjustmentFactor - 2);
    } else if (command.includes("set font size to")) {
      const newSize = parseInt(command.split("set font size to ")[1], 10);
      handleSizeChange(newSize);
    } else if (command.includes("set language to english")) {
      handleLanguageChange('en');
    } else if (command.includes("set language to urdu")) {
      handleLanguageChange('ur');
    } else if (command.includes("turn on notifications")) {
      setNotificationsEnabled(true);
    } else if (command.includes("turn off notifications")) {
      setNotificationsEnabled(false);
    } else if (command.includes("enable color blindness mode")) {
      handleColorBlindnessToggle();
    } else if (command.includes("disable color blindness mode")) {
      handleColorBlindnessToggle();
    } else if (command.includes("set color blindness mode to protanopia")) {
      handleColorBlindnessChange('protanopia');
    } else if (command.includes("set color blindness mode to deuteranopia")) {
      handleColorBlindnessChange('deuteranopia');
    } else if (command.includes("set color blindness mode to tritanopia")) {
      handleColorBlindnessChange('tritanopia');
    } else if (command.includes("home")) {
      navigation.goBack();
    }else {
      console.log('Command not recognized.');
    }
  };
  
  const dispatch = useDispatch()

  const setInitialNotificationState = async () => {
    if (Platform.OS === 'android') {
      const notificationPermissionReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (notificationPermissionReq === PermissionsAndroid.RESULTS.GRANTED) {
        setNotificationsEnabled(true)
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });
        
      }else {
        setNotificationsEnabled(false)
      }
    }
  };

  const saveNotificationState = (enabled: boolean) => {
    try {
      mmkvStorage.set('notificationsEnabled', enabled);
      console.log(`saveNotificationState ${enabled}`)

    } catch (error) {
      console.error('Error saving notification state:', error);
    }
  };
  
  const getNotificationState = () => {
    try {
      const value = mmkvStorage.getBoolean('notificationsEnabled');
      if (value !== undefined) {
        setNotificationsEnabled(value)
      } else {
        setInitialNotificationState()
      }
    } catch (error) {
      console.error('Error retrieving notification state:', error);
    }
  };

  const handleNotificationsChange = async (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    saveNotificationState(enabled);
    
    if (enabled) {
      const { status } = await Notifications.requestPermissionsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!');
      }
    } else {
        Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
  
      const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
      allNotifications.forEach(async (notification) => {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      });
    }
  };

  const handleBioChange = (key: string, value: string) => {
    switch (key) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'phone':
        dispatch(setPhone(value));
        break;
      default:
        break;
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    i18n.locale = newLanguage
    dispatch(setLanguage(newLanguage));
  };

  const handleSizeChange = (value: number) => {
    dispatch(setAdjustmentFactor(value));
  };

  const handleColorBlindnessChange = (type: string) => {
    setColorBlindnessType(type);
    dispatch(setTheme(type.toLowerCase()));
  };

  const handleColorBlindnessToggle = () => {
    setColorBlindnessEnabled((prev) => !prev);
    if (colorBlindnessEnabled) {
      dispatch(setTheme('normal'));
    } else {
      dispatch(setTheme(colorBlindnessType.toLowerCase()));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{i18n.t('settings')}</Text>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('user_information')}</Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('name')}</Text>
        <TextInput
          style={[styles.input, {fontSize: 12 + adjustmentFactor}]}
          value={user.name}
          placeholder='John Doe'
          onChangeText={(value) => handleBioChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('email')}</Text>
        <TextInput
          style={[styles.input, {fontSize: 12 + adjustmentFactor}]}
          value={user.email}
          placeholder='john@example.com'
          onChangeText={(value) => handleBioChange('email', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('phone')}</Text>
        <TextInput
          style={[styles.input, {fontSize: 12 + adjustmentFactor}]}
          value={user.phone}
          placeholder='+923348809086'
          onChangeText={(value) => handleBioChange('phone', value)}
        />
      </View>

      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('font_size')}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={-5}
          maximumValue={20}
          step={2}
          value={adjustmentFactor}
          onValueChange={handleSizeChange}
        />
      </View>

      <View>
        <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('language')}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.radioContainer}>
            <RadioButton
              selected={language === 'en'}
              onPress={() => handleLanguageChange('en')}
            >
              English
            </RadioButton>
            <RadioButton
              selected={language === 'ur'}
              onPress={() => handleLanguageChange('ur')}
            >
              اردو
            </RadioButton>
          </View>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('notifications')}</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => handleNotificationsChange(!notificationsEnabled)}
          thumbColor={notificationsEnabled ? theme.primaryThumb : theme.secondaryThumb}
          trackColor={{ false: theme.primaryTrack, true: theme.primaryTrack }}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('color_blindness')}</Text>        
        <Switch
          value={colorBlindnessEnabled}
          onValueChange={handleColorBlindnessToggle}
          thumbColor={colorBlindnessEnabled ? theme.primaryThumb : theme.secondaryThumb}
          trackColor={{ false: theme.primaryTrack, true: theme.primaryTrack }}
        />
      </View>

      {colorBlindnessEnabled && (
        <View style={styles.colorBlindnessContainer}>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'protanopia' && {borderColor: theme.primaryMain},
              styles.leftOption,
            ]}
            onPress={() => handleColorBlindnessChange('protanopia')}
          >
            <Text>Protanopia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'deuteranopia' && {borderColor: theme.primaryMain},
            ]}
            onPress={() => handleColorBlindnessChange('deuteranopia')}
          >
            <Text>Deuteranopia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'tritanopia' && {borderColor: theme.primaryMain},
              styles.rightOption,
            ]}
            onPress={() => handleColorBlindnessChange('tritanopia')}
          >
            <Text>Tritanopia</Text>
          </TouchableOpacity>
        </View>
      )}

      <Pressable>
        {({ pressed }) => (
          <View style={{height: 40}}>
            <Text></Text>
          </View>
        )}
      </Pressable>

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
  sectionHeader: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  fontSizePreview: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saveButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 60,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colorBlindnessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorBlindnessOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  leftOption: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightOption: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedOption: {
    borderColor: '#4facfe',
  },
});

export default Settings;
