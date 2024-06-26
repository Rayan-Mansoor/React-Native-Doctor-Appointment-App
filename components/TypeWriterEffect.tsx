import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import PropTypes from 'prop-types';

interface TypeWriterEffectProps {
  text: string;
  style?: StyleProp<TextStyle>;
  typingAnimationDuration?: number;
  blinkingCursorAnimationDuration?: number;
}

const TypeWriterEffect: React.FC<TypeWriterEffectProps> = ({
  text = "Remember! A healthy life is a blessed life",
  style,
  typingAnimationDuration = 50,
  blinkingCursorAnimationDuration = 300
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [blinkingCursorColor, setBlinkingCursorColor] = useState('transparent');
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const index = useRef(0);
  const typingTimer = useRef<number | undefined>(undefined);
  const blinkingCursorTimer = useRef<number | undefined>(undefined);
  const displayedTextRef = useRef('');

  useEffect(() => {
    resetTypingAnimation();
    return () => {
      clearTimeout(typingTimer.current);
      clearInterval(blinkingCursorTimer.current);
    };
  }, [text]);

  const resetTypingAnimation = () => {
    setDisplayedText('');
    displayedTextRef.current = '';
    index.current = 0;
    clearTimeout(typingTimer.current);
    clearInterval(blinkingCursorTimer.current);
    typingAnimation();
    blinkingCursorAnimation();
  };

  const typingAnimation = () => {
    clearTimeout(typingTimer.current);
    if (index.current < text.length) {
      displayedTextRef.current += text.charAt(index.current);
      setDisplayedText(displayedTextRef.current);
      index.current++;
      typingTimer.current = window.setTimeout(typingAnimation, typingAnimationDuration);
    }
  };

  const blinkingCursorAnimation = () => {
    clearInterval(blinkingCursorTimer.current);
    blinkingCursorTimer.current = window.setInterval(() => {
      setBlinkingCursorColor(prev => (prev === 'transparent' ? 'black' : 'transparent'));
    }, blinkingCursorAnimationDuration);
  };

  const onTextLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  return (
    <>
      <Text
        style={[styles.hiddenText, style]}
        onLayout={onTextLayout}
      >
        {text}
      </Text>
      <View style={[styles.container, containerHeight ? { height: containerHeight } : {}]}>
        <Text style={[styles.text, style]}>
          {displayedText}
          <Text style={{ color: blinkingCursorColor }}>|</Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: 'center',
  },
  hiddenText: {
    position: 'absolute',
    top: 10000,
    opacity: 0,
  },
});


TypeWriterEffect.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.any,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

export default TypeWriterEffect;
