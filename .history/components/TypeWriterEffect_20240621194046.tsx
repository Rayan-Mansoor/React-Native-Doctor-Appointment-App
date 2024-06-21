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
  text = "Remember! A health life is a blessed life",
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
    width: 0,
    height: 0,
  },
});

TypeWriterEffect.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.any,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
};

export default TypeWriterEffect;
