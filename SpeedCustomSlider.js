// CustomSlider.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const SpeedCustomSlider = ({handleThumbMove,setSpeed,speed }) => {
  const [thumbPosition, setThumbPosition] = useState(speed); // Initial position of the sliderThumb
  const pan = useRef(new Animated.ValueXY()).current; // Animation value for thumb movement

  useEffect(() => {
    // Call the onThumbMove callback whenever the thumb position changes
    setSpeed(thumbPosition)
    handleThumbMove(thumbPosition)
  }, [thumbPosition, handleThumbMove]);

  // PanResponder for handling touch gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      // Move the thumb vertically within the sliderTrack boundaries
      const newThumbPosition = Math.min(220, Math.max(0, thumbPosition + gesture.dy));
      setThumbPosition(newThumbPosition);
      pan.setValue({ x: 0, y: newThumbPosition });
    },
  });

  return (
    <View style={styles.container}>
      {/* Slider track */}
      <View style={styles.sliderTrack}>
        {/* Faster label */}
        <Text style={[styles.label, styles.fasterLabel]}>Faster</Text>
        
        {/* Slider thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.sliderThumb, { top: thumbPosition }]}
        ></Animated.View>

        {/* Slower label */}
        <Text style={[styles.label, styles.slowerLabel]}>Slower</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 400, // Adjust height as needed
    position: 'relative',
  },
  sliderTrack: {
    width: 80,
    height: 300,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    position: 'relative', // Needed for positioning labels
  },
  sliderThumb: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    left: 0,
  },
  label: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    wordWrap: 'break-word',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  fasterLabel: {
    top: 20, // Position at the top
  },
  slowerLabel: {
    bottom: 20, // Position at the bottom
  },
});

export default SpeedCustomSlider;