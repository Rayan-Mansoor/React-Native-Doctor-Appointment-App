import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const AnimationTypingText = ({
  text = "Default Typing Animated Text.",
  color = "rgb( 77, 192, 103 )",
  textSize = 30,
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

AnimationTypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textSize: PropTypes.number,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number
};

export default AnimationTypingText;
