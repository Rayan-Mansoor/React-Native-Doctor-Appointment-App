// src/context/TensorFlowContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';

const englishModel = require('../assets/machine_learning/english/intent_recognition_model.tflite');
const urduModel = require('../assets/machine_learning/urdu/intent_recognition_model.tflite');
const englishTokenizer = require('../assets/machine_learning/english/tokenizer.json');
const urduTokenizer = require('../assets/machine_learning/urdu/tokenizer.json');
const englishLabelEncoder = require('../assets/machine_learning/english/label_encoder.json');
const urduLabelEncoder = require('../assets/machine_learning/urdu/label_encoder.json');


interface TensorFlowContextProps {
  classifyIntent: (text: string) => Promise<string | undefined>;
}

export const TensorFlowContext = createContext<TensorFlowContextProps | undefined>(undefined);

export const useTensorFlow = () => {
  const context = useContext(TensorFlowContext);
  if (!context) {
    throw new Error('useTensorFlow must be used within a TensorFlowProvider');
  }
  return context;
};

export const TensorFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const language = useSelector((state: RootState) => state.language.locale);

  const { modelPath, tokenizer, labelEncoder } = useMemo(() => {
    if (language === 'en') {
      return {
        modelPath: englishModel,
        tokenizer: englishTokenizer,
        labelEncoder: englishLabelEncoder,
      };
    } else {
      return {
        modelPath: urduModel,
        tokenizer: urduTokenizer,
        labelEncoder: urduLabelEncoder,
      };
    }
  }, [language]);

  const plugin = useTensorflowModel(modelPath);
  const model = plugin.state === 'loaded' ? plugin.model : undefined;

  const maxlen = 20;

  const tokenize = (text: string): number[] => {

    const processedText = language == 'en' ? text.toLowerCase().replace(/[^\w\s]/g, '').trim() : text.replace(/[^\u0600-\u06FF\s]/g, '').trim()
    const words = processedText.split(/\s+/);
    const sequence = words.map(word => tokenizer.word_index[word] || tokenizer.word_index['<OOV>'] || 0);
    const paddedSequence = new Array(maxlen).fill(0);
  
    for (let i = 0; i < Math.min(sequence.length, maxlen); i++) {
      paddedSequence[i] = sequence[i];
    }
  
    return paddedSequence;
  };
  
  const classifyIntent = async (text: string): Promise<string> => {
    if (!model) return 'Model not loaded';
  
    try {
      const tokens = tokenize(text);
      const inputData = new Float32Array(tokens);
  
      const outputData = await model.run([inputData]);
      const predictionVector = outputData[0] as Float32Array | Float64Array;
  
      const predictedLabelIndex = Array.from(predictionVector).indexOf(Math.max(...predictionVector));
      const predictedLabel = labelEncoder.classes_[predictedLabelIndex];
  
      return predictedLabel;
    } catch (error) {
      console.error('Classification error:', error);
      return 'Error classifying intent';
    }
  };

  return (
    <TensorFlowContext.Provider value={{ classifyIntent }}>
      {children}
    </TensorFlowContext.Provider>
  );
};
