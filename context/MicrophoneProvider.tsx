// src/context/MicrophoneContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MicrophoneContextProps {
  microphoneResult: string;
  setMicrophoneResult: (text: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export const MicrophoneContext = createContext<MicrophoneContextProps | undefined>(undefined);

export const useMicrophone = () => {
    const context = useContext(MicrophoneContext);
    if (!context) {
      throw new Error('useMicrophone must be used within a MicrophoneProvider');
    }
    return context;
  };

export const MicrophoneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [microphoneResult, setMicrophoneResult] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  return (
    <MicrophoneContext.Provider value={{ microphoneResult, setMicrophoneResult, isListening, setIsListening, isProcessing, setIsProcessing }}>
      {children}
    </MicrophoneContext.Provider>
  );
};


