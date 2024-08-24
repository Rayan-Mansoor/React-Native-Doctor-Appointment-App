// components/TooltipContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';

interface TooltipContextProps {
  showTooltip: (content: string, x: number, y: number) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextProps | undefined>(undefined);

export const useTooltip = (): TooltipContextProps => {
    const context = useContext(TooltipContext);
    if (!context) {
      throw new Error('useTooltip must be used within a TooltipProvider');
    }
    return context;
  };

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (content: string, x: number, y: number) => {
    setTooltipContent(content);

    const maxWidth = Dimensions.get('window').width - 5; 
    const maxHeight = Dimensions.get('window').height - 5;

    const tooltipWidth = content.length * 8;
    const tooltipHeight = 30;
    const posX = Math.min(x, maxWidth - tooltipWidth);
    const posY = Math.min(y, maxHeight - tooltipHeight);

    setTooltipPosition({ x: posX, y: posY });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {tooltipVisible && (
        <Modal transparent visible={tooltipVisible}>
          <View style={[styles.tooltipContainer, { top: tooltipPosition.y, left: tooltipPosition.x }]}>
            <View style={styles.tooltip}>
              <Text>{tooltipContent}</Text>
            </View>
          </View>
        </Modal>
      )}
    </TooltipContext.Provider>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
