import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle, LayoutChangeEvent } from 'react-native';
import PropTypes from 'prop-types';

interface TypeWriterEffectProps {
  text: string;
  style?: StyleProp<TextStyle>;
  typingAnimationDuration?: number;
  blinkingCursorAnimationDuration?: number;
}

const TypeWriterEffect: React.FC<TypeWriterEffectProps> = ({
  text = "Remember! A health life is a blessed life",
  style,
  typingAnimationDuration = 50,
  blinkingCursorAnimationDuration = 190
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [blinkingCursorColor, setBlinkingCursorColor] = useState('transparent');
  const [numberOfLines, setNumberOfLines] = useState(1);
  const index = useRef(0);
  const typingTimer = useRef<number | undefined>(undefined);
  const blinkingCursorTimer = useRef<number | undefined>(undefined);

  const calculateNumberOfLines = (event: LayoutChangeEvent) => {
    const { lines } = event.nativeEvent;
    if (lines) {
      setNumberOfLines(lines.length);
    }
  };

  useEffect(() => {
    typingAnimation();
    blinkingCursorAnimation();

    return () => {
      clearTimeout(typingTimer.current);
      clearInterval(blinkingCursorTimer.current);
    };
  }, []);

  const typingAnimation = () => {
    clearTimeout(typingTimer.current);

    if (index.current < text.length) {
      setDisplayedText(prev => prev + text.charAt(index.current));
      index.current++;

      typingTimer.current = window.setTimeout(typingAnimation, typingAnimationDuration);
    }
  };

  const blinkingCursorAnimation = () => {
    blinkingCursorTimer.current = window.setInterval(() => {
      setBlinkingCursorColor(prev => (prev === 'transparent' ? 'black' : 'transparent'));
    }, blinkingCursorAnimationDuration);
  };

  return (
    <View style={[styles.container, { height: numberOfLines * 20 }]}>
      <Text
        style={[styles.text, style]}
        onTextLayout={calculateNumberOfLines}
        numberOfLines={numberOfLines}
      >
        {displayedText}
        <Text style={{ color: blinkingCursorColor }}>|</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    textAlign: 'center'
  }
});

TypeWriterEffect.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.any,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number
};

export default TypeWriterEffect;