import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, GestureResponderEvent, Pressable} from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from '../localization/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setComponentOrder } from '../storage/reduxStore';
import { useTheme } from '../context/ThemeProvider';
import { useMicrophone } from '../context/MicrophoneProvider';
import { useFocusEffect } from '@react-navigation/native';
import TypeWriterEffect from '../components/TypeWriterEffect';
import { getRandomHealthTip } from '../utils/utilityFunctions';
import * as Speech from 'expo-speech';
import { LandingStackParams } from './LandingPage';
import { useTooltip } from '../context/TooltipProvider';
import doctorsListEN, { Doctor } from '../storage/data/en_doctor_list';
import doctorsListUR from '../storage/data/ur_doctor_list';
import { rootNavigation } from '../components/RootNavigation';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useTensorFlow } from '../context/TFModelProvider';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

SplashScreen.preventAutoHideAsync();

type Props = NativeStackScreenProps<LandingStackParams, 'Home'>

const Home: React.FC<Props> = ({navigation}) => {
  const upcomingAppointments = useSelector((state: RootState) => state.appointments.upcomingAppointments);
  const language = useSelector((state: RootState) => state.language.locale);
  const adjustmentFactor = useSelector((state: RootState) => state.size.adjustmentFactor);
  const componentOrder = useSelector((state: RootState) => state.componentOrder.homeScreen);
  const theme = useTheme();
  const { microphoneResult, setMicrophoneResult } = useMicrophone();
  const microphoneResultRef = useRef<string | null>(null);
  const [healthTip, setHealthTip] = useState('');
  const [isDraggable, setIsDraggable] = useState(false);
  const { showTooltip, hideTooltip } = useTooltip();
  const { classifyIntent } = useTensorFlow();
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Bold': require('../fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../fonts/Roboto/Roboto-Regular.ttf'),
  });
  const dispatch = useDispatch()


  const doctors: Doctor[] = language == 'en'? doctorsListEN : doctorsListUR

  doctors.sort((a, b) => b.rating - a.rating);

  const featuredDoctors: Doctor[] = doctors.slice(0, 4);

  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useFocusEffect(
    useCallback(() => {
      microphoneResultRef.current = microphoneResult;

      return () => {
        microphoneResultRef.current = null;
      };
    }, [microphoneResult])
  );

  useEffect(() => {
    if (microphoneResultRef.current) {
      handleVoiceCommand(microphoneResultRef.current);
      console.log('Microphone Result:', microphoneResultRef.current);
      setMicrophoneResult('')
    }
  }, [microphoneResult, setMicrophoneResult]);
  
  useEffect(() => {
    i18n.locale = language;

    const randomTip = getRandomHealthTip(language);
    setHealthTip(randomTip);
  }, [language]);

  const handleVoiceCommand = async (command: string | null) => {
    if (!command) return;

    const prediction = await classifyIntent(command)
    console.log(`Predicted Intent: ${prediction}`)

    switch (prediction) {
      case "navigate_appointments":
        rootNavigation('MyAppointments')
        break;
      case "navigate_setting":
        rootNavigation('Settings');
        break;
      case "book_appointment":
        navigation.navigate('DoctorCategory');
        break;
      case "select_doctor":
        const matchedDoctor = featuredDoctors.find(doctor => {
          return command!!.includes(doctor.name.toLowerCase());
        });
  
        if (matchedDoctor) {
          handlefeaturedDoctor(matchedDoctor);
        }
        break;
      default:
        console.log('Command not recognized.');
        break;
    }
  };

  const handleSpeech = (text: string) => {
    if(language == 'en'){
      Speech.speak(text, {
        language: 'en',
      });
    } else if(language == 'ur'){
      Speech.speak(text, {
        language: 'ur',
      });
    }

  };

  const handlefeaturedDoctor = (doc: Doctor) => {
    navigation.navigate('Appointment', { doctor: doc })

  };

  const handleLongPress = (content: string) => (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    showTooltip(content, pageX, pageY);
    setTimeout(() => hideTooltip(), 3000);
  };

  const HealthTipComponent = ({disabled}: {disabled: boolean}) => (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('daily_tips')}</Text>
      <View style={[styles.heathTipCard, { backgroundColor: theme.card, flexDirection: 'row', alignItems: 'center' , elevation: disabled ? 0 : 5}]}>
        <View style={styles.textContainer}>
          <TypeWriterEffect
            text={healthTip}
            style={[styles.userInfoText, { fontSize: 16 + adjustmentFactor}]}
          />
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleSpeech(healthTip)}>
            <Ionicons name="volume-high-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      <Image source={require('../assets/animations/healthTip.gif')} style={styles.animation} />
      </View>
    </View>
  );
  
  const UpcomingAppointmentsComponent = ({disabled}: {disabled: boolean}) => (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('upcoming_appointments')}</Text>
      <View style={[styles.appointmentsCard, {backgroundColor: theme.card, elevation: disabled ? 0 : 3}]}>
        {upcomingAppointments.length === 0 ? (
          <Text style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('no_upcoming_appointments')}</Text>
        ) : (
        <Text style={[styles.userInfoText, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('yes_upcoming_appointments')}</Text>
        )}
      </View>
    </View>
  );

  const FeaturedDoctorsComponent = ({disabled}: {disabled: boolean}) => (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Text style={[styles.sectionHeader, {fontSize: 20 + adjustmentFactor}]}>{i18n.t('featured_doctors')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredDoctorsContainer}>
        {featuredDoctors.map((doctor, index) => (
          <TouchableOpacity key={index} style={[styles.doctorCard, {backgroundColor: theme.card, elevation: disabled ? 0 : 5}]} onPress={() => handlefeaturedDoctor(doctor)} onLongPress={handleLongPress("A top rated doctor")}>
            <Image source={doctor.image} style={styles.doctorImage} />
            <Text style={[styles.doctorName, {fontSize: 16 + adjustmentFactor}]}>{i18n.t('doctor')} {doctor.name}</Text>
            <Text style={[styles.doctorSpecialty, {fontSize: 14 + adjustmentFactor}]}>{i18n.t(doctor.specialty.toLowerCase())}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14 + adjustmentFactor} color={theme.rating} />
              <Text style={[styles.ratingText, {fontSize: 14 + adjustmentFactor}]}>{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const onDragEnd = ({ data }: { data: string[] }) => {
    dispatch(setComponentOrder({ screenName: 'homeScreen', data }));
  };

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'HealthTipComponent':
        return <HealthTipComponent key={componentName} disabled={isDraggable}/>;
      case 'UpcomingAppointmentsComponent':
        return <UpcomingAppointmentsComponent key={componentName} disabled={isDraggable}/>;
      case 'FeaturedDoctorsComponent':
        return <FeaturedDoctorsComponent key={componentName} disabled={isDraggable}/>;
      default:
        return null;
    }
  };

  const renderSlot = ({ item, drag, isActive, getIndex }: RenderItemParams<string>) => {
    return (      
      <TouchableOpacity 
        style={styles.slot}
        onLongPress= {drag}
      >
        {item ? (
          renderComponent(item)
        ) : (
          <Text>Empty Slot</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]} onLayout={onLayoutRootView}>
      <Text style={[styles.header, {fontSize: 30 + adjustmentFactor, color: theme.primaryMain, shadowColor: theme.primaryMain }]}>{i18n.t('welcome')}</Text>
      
      <TouchableOpacity style={styles.reorderButton} onPress={() => setIsDraggable(!isDraggable)}>
        <MaterialCommunityIcons name="drag-variant" size={24} color={isDraggable? "red": "black"} />
      </TouchableOpacity>

      {isDraggable? (
        <DraggableFlatList
          data={componentOrder}
          renderItem={renderSlot}
          keyExtractor={(item) => item}
          onDragEnd={onDragEnd}
          scrollEnabled={false}
        />
      ) : (
        <View>
          {componentOrder.map((componentName) => renderComponent(componentName))}
        </View>
        )
      }

      <TouchableOpacity style={[styles.bookButton, {backgroundColor: theme.primaryMain}]} onPress={() => { navigation.navigate("DoctorCategory")}} onLongPress={handleLongPress("Book an appointment with a doctor")}>
        <Text style={[styles.bookButtonText, {fontSize: 18 + adjustmentFactor}]}>{i18n.t('book_appointment')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flex:1,
    textAlign: 'center', 
    fontFamily: 'Roboto-Bold',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 }
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionHeader: {
    fontWeight: 'bold',
    marginVertical: 10,
  },

  appointmentText: {
    color: '#666',
  },
  featuredDoctorsContainer: {
    marginBottom: 20,
  },
  doctorCard: {
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 20,
    width: 150,
    margin: 10,
    alignItems: 'center',
  },

  doctorName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctorSpecialty: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#808080',
  },
  bookButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin:5,
    elevation: 5,
    marginBottom: 60,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
  },
  lottie: {
    width: 200, // Customize the size as needed
    height: 200,
  },
  heathTipCard: {
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentsCard: {
    borderRadius: 10,
    marginBottom: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, 
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
    padding: 10,
    marginRight: 10, 
  },
  userInfoText: {
    fontWeight: 'bold',
    color: 'grey',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,  
    right: 10, 
  },
  animation: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  reorderButton: {
    position: 'absolute', 
    top: 20, 
    right: 10
  }, 
  slot: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    padding:5,
    marginBottom: 20
  },
});

export default Home;
