// src/context/TensorFlowContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTensorflowModel } from 'react-native-fast-tflite';
import tokenizerJson from '../assets/machine_learning/tokenizer.json';
import labelEncoderJson from '../assets/machine_learning/label_encoder.json';

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
  const plugin = useTensorflowModel(require('../assets/machine_learning/intent_recognition_model.tflite'));
  const model = plugin.state === 'loaded' ? plugin.model : undefined;

  const tokenizer: any = tokenizerJson;
  const labelEncoder: any = labelEncoderJson;
  const maxlen = 20;

  const tokenize = (text: string): number[] => {
    const processedText = text.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const words = processedText.split(/\s+/);
    const sequence = words.map(word => tokenizer.word_index[word] || 0);
    const paddedSequence = new Array(maxlen).fill(0);

    for (let i = 0; i < Math.min(sequence.length, maxlen); i++) {
      paddedSequence[i] = sequence[i];
    }

    return paddedSequence;
  };

  const classifyIntent = async (text: string): Promise<string | undefined> => {
    if (!model) return;

    try {
      const tokens = tokenize(text);
      const inputData = new Float32Array(tokens);

      const outputData = await model?.run([inputData]);
      const predictionVector = outputData[0] as Float32Array | Float64Array;

      const predictedLabelIndex = predictionVector.indexOf(Math.max(...predictionVector));
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
