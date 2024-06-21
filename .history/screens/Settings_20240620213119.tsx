import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import i18n from '../localization/i18n';
import RadioButton from '../components/RadioButton'
import { RootState, setLanguage } from '../storage/reduxStore';
import { useDispatch, useSelector } from 'react-redux';

// Import color themes
import { NormalTheme, ProtanopiaTheme, DeuteranopiaTheme, TritanopiaTheme } from '../types/themes';

const Settings = () => {
  const language = useSelector((state: RootState) => state.language.locale);

  const [bioInfo, setBioInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });
  const [fontSize, setFontSize] = useState(16);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [colorBlindnessEnabled, setColorBlindnessEnabled] = useState(false);
  const [colorBlindnessType, setColorBlindnessType] = useState('Deuteranopia');

  const dispatch = useDispatch()

  const handleBioChange = (key: string, value: string) => {
    setBioInfo({ ...bioInfo, [key]: value });
  };

  const handleChangeLanguage = async (newLanguage: string) => {
    i18n.locale = newLanguage
    dispatch(setLanguage(newLanguage));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{i18n.t('settings')}</Text>

      {/* User Bio Info */}
      <Text style={styles.sectionHeader}>{i18n.t('user_information')}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('name')}</Text>
        <TextInput
          style={styles.input}
          value={bioInfo.name}
          onChangeText={(value) => handleBioChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('email')}</Text>
        <TextInput
          style={styles.input}
          value={bioInfo.email}
          onChangeText={(value) => handleBioChange('email', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n.t('phone')}</Text>
        <TextInput
          style={styles.input}
          value={bioInfo.phone}
          onChangeText={(value) => handleBioChange('phone', value)}
        />
      </View>

      {/* Font Size */}
      <Text style={styles.sectionHeader}>{i18n.t('font_size')}</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>{i18n.t('adjust_font_size')}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={30}
          step={1}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
        />
        <Text style={[styles.fontSizePreview, { fontSize }]}>{i18n.t('preview_text')}</Text>
      </View>

      {/* Language */}
      <View>
        <Text style={styles.sectionHeader}>{i18n.t('language')}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.radioContainer}>
            <RadioButton
              selected={language === 'en'}
              onPress={() => handleChangeLanguage('en')}
            >
              English
            </RadioButton>
            <RadioButton
              selected={language === 'ur'}
              onPress={() => handleChangeLanguage('ur')}
            >
              Urdu
            </RadioButton>
          </View>
        </View>
      </View>

      {/* Notifications */}
      <Text style={styles.sectionHeader}>{i18n.t('notifications')}</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{i18n.t('enable_notifications')}</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled((prev) => !prev)}
          thumbColor={notificationsEnabled ? '#a29bfe' : '#d8d6fc'}
          trackColor={{ false: '#e6e5fc', true: '#e6e5fc' }}
        />
      </View>

      {/* Color Blindness */}
      <Text style={styles.sectionHeader}>{i18n.t('color_blindness')}</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{i18n.t('enable_color_blindness')}</Text>
        <Switch
          value={colorBlindnessEnabled}
          onValueChange={() => setColorBlindnessEnabled((prev) => !prev)}
          thumbColor={colorBlindnessEnabled ? '#a29bfe' : '#d8d6fc'}
          trackColor={{ false: '#e6e5fc', true: '#e6e5fc' }}
        />
      </View>

      {colorBlindnessEnabled && (
        <View style={styles.colorBlindnessContainer}>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'Protanopia' && styles.selectedOption,
              styles.leftOption,
            ]}
            onPress={() => setColorBlindnessType('Protanopia')}
          >
            <Text>Protanopia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'Deuteranopia' && styles.selectedOption,
            ]}
            onPress={() => setColorBlindnessType('Deuteranopia')}
          >
            <Text>Deuteranopia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorBlindnessOption,
              colorBlindnessType === 'Tritanopia' && styles.selectedOption,
              styles.rightOption,
            ]}
            onPress={() => setColorBlindnessType('Tritanopia')}
          >
            <Text>Tritanopia</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>{i18n.t('save_settings')}</Text>
      </TouchableOpacity>
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
    fontSize: 20,
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
    backgroundColor: '#4facfe',
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  selectedOption: {
    borderColor: '#4facfe',
  },
});

export default Settings;
