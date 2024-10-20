// src/context/TensorFlowContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementAdjustmentFactor, incrementAdjustmentFactor, RootState, setColorBlindTheme, setEmail, setLanguage, setName, setPhone, toggleColorBlindMode } from '../storage/reduxStore';
import { rootNavigation } from '../components/RootNavigation';
import { useMicrophone } from './MicrophoneProvider';
import { useTensorFlow } from './TFModelProvider';

export interface VoiceCommandContextProps {
    prediction: string;
    sentence: string;
    resetContextValue: () => void;
    commandCompleted: () => void;
}

export const VoiceCommandContext = createContext<VoiceCommandContextProps | undefined>(undefined);

export const useVoiceCommand = () => {
  const context = useContext(VoiceCommandContext);
  if (!context) {
    throw new Error('useVoiceCommand must be used within a VoiceCommandProvider');
  }
  return context;
};

export const VoiceCommandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const { microphoneResult, setMicrophoneResult, setIsProcessing } = useMicrophone();
    const { classifyIntent } = useTensorFlow();

    const resetContextValue = () => {
      setContextValue({
        prediction: '',
        sentence: '',
        resetContextValue, 
        commandCompleted,
      });
    };

    const commandCompleted = useCallback(() => {
      setIsProcessing(false)
    }, [resetContextValue]);

    const [contextValue, setContextValue] = useState<VoiceCommandContextProps>({
      prediction: '',
      sentence: '',
      resetContextValue, 
      commandCompleted
    });
    
      const handleLanguageChange = async (newLanguage: string) => {
        dispatch(setLanguage(newLanguage));
      };
    
      const handleSizeChange = (direction: string) => {
        if(direction == 'increment'){
            dispatch(incrementAdjustmentFactor());
        }else{
            dispatch(decrementAdjustmentFactor());
        }
      };
    
      const handleToggleColorBlindMode = (status: boolean) => {
        dispatch(toggleColorBlindMode(status)); 
      };

      const handleColorBlindThemeChange = (type: string) => {
        dispatch(setColorBlindTheme(type.toLowerCase()));
      };

      const handlePassdown = (pred: string) => {
        setContextValue({
          prediction: pred,
          sentence: microphoneResult,
          resetContextValue, 
          commandCompleted
        });
      };
      
    const handleVoiceCommand = async (command: string) => {
      if (!command) {
        commandCompleted();
        return;
      }
      const noCompletionRequired = [
        "update_name", 
        "update_email", 
        "update_phone_number", 
        "turn_on_notifications", 
        "turn_off_notifications", 
        "select_doctor", 
        "reschedule_appointment", 
        "cancel_appointment"
      ];
  
      const prediction = await classifyIntent(command);
      console.log(`Predicted Intent: ${prediction}`);
  
      switch (prediction) {
        case "navigate_home":
          rootNavigation('Home');
          break;
        case "navigate_appointments":
          rootNavigation('MyAppointments')
          break;
        case "navigate_setting":
          rootNavigation('Settings')
          break;
        case "book_appointment":
          rootNavigation('DoctorCategory')
          break;
        case "select_orthodontics":
          rootNavigation('DoctorList', { category: "Orthodontics" })
          break;
        case "select_prosthodontics":
          rootNavigation('DoctorList', { category: "Prosthodontics" })
          break;
        case "select_endodontics":
          rootNavigation('DoctorList', { category: "Endodontics" })
          break;
        case "select_periodontics":
          rootNavigation('DoctorList', { category: "Periodontics" })
          break;
        case "select_pedodontics":
          rootNavigation('DoctorList', { category: "Pedodontics" })
          break;
        case "select_oral_surgery":
          rootNavigation('DoctorList', { category: "Oral Surgery" })
          break;
        case "increase_font_size":
          handleSizeChange('increment');
          break;
        case "decrease_font_size":
          handleSizeChange('decrement');
          break;
        case "set_language_english":
          handleLanguageChange('en');
          break;
        case "set_language_urdu":
          handleLanguageChange('ur');
          break;
        case "enable_color_blindness":
          handleToggleColorBlindMode(true);
          break;
        case "disable_color_blindness":
          handleToggleColorBlindMode(false);
          break;
        case "set_protanopia_mode":
          handleColorBlindThemeChange('protanopia');
          break;
        case "set_deuteranopia_mode":
          handleColorBlindThemeChange('deuteranopia');
          break;
        case "set_tritanopia_mode":
          handleColorBlindThemeChange('tritanopia');
          break;
        case "update_name":
        case "update_email":
        case "update_phone_number":
        case "turn_on_notifications":
        case "turn_off_notifications":
        case "select_doctor":
        case "reschedule_appointment":
        case "cancel_appointment":
          handlePassdown(prediction)
          return;

        default:
          console.log('Command not recognized.');
          break;
        }

        if (!noCompletionRequired.includes(prediction!!)) {
          commandCompleted();
        }
    };
  
    useEffect(() => {
      if (microphoneResult) {
        handleVoiceCommand(microphoneResult);
        setMicrophoneResult('');
      }
    }, [microphoneResult]);

    useEffect(() => {
      setContextValue((prev) => ({
        ...prev,
        resetContextValue,
      }));
    }, []);

  return (
    <VoiceCommandContext.Provider value={ contextValue }>
      {children}
    </VoiceCommandContext.Provider>
  );
};
