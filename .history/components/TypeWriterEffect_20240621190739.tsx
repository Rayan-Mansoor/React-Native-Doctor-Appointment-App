import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TypeWriterEffect = ({
  text = "Remember! A health life is a blessed life",
  color = "#000000",
  textSize = 16,
  typingAnimationDuration = 50,
  blinkingCursorAnimationDuration = 190
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [blinkingCursorColor, setBlinkingCursorColor] = useState('transparent');
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
      setBlinkingCursorColor(prev => (prev === 'transparent' ? color : 'transparent'));
    }, blinkingCursorAnimationDuration);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color, fontSize: textSize, textAlign: 'center' }}>
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
  }
});

TypeWriterEffect.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textSize: PropTypes.number,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number
};

export default TypeWriterEffect;
