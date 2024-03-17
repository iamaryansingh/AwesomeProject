// App.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Slider, Switch, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlaybackComponent from "./PlaybackComponent"
import SpeedCustomSlider from './SpeedCustomSlider'; // Import the CustomSlider component
import PitchCustomSlider from './PitchCustomSlider'; // Import the CustomSlider component

export default function App() {
  const [speed, setSpeed] = useState(110); // Default speed
  const [pitch, setPitch] = useState(110); // Default pitch
  const [pairButtonColor, setPairButtonColor] = useState('#F5F5F5'); // Default button color
  const [paired, setPaired] = useState(false); // Pairing state
  const [showPlaybackComponent, setShowPlaybackComponent] = useState(false); // State to toggle visibility
  const [colorBox1, setColorBox1] = useState('rgb(255, 0, 255)'); // Default color for colorBox 1
  const [colorBox2, setColorBox2] = useState('rgb(0, 255, 255)'); // Default color for colorBox 2
  const [audioUri, setAudioUri] = useState(null);
  const [file, setFile] = useState(null);

  const handlePairButtonClick = () => {
    setPaired(!paired);
    setPairButtonColor(paired ? 'transparent' : '#808080');
    if (paired) {
      // Reset pitch to speed value if unpaired
      setPitch(speed);
    }
  };
  // console.log(paired)

  const handlePlaybackButtonClick = () => {
    setShowPlaybackComponent(true); // Toggle visibility
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (paired) {
      setPitch(value);
    }
  };

  const handlePitchChange = (value) => {
    setPitch(value);
    if (paired) {
      setSpeed(value);
    }
  };
// console.log(speed,"speed")
// console.log(pitch,"pitch")

  const handleThumbMove = (position) => {
    // Update colorBox based on thumb position
    const blue = Math.min(255, Math.max(0, 255 - (position - 50) * 2.55));
    const red = Math.min(255, Math.max(0, (position - 50) * 2.55));
    setColorBox1(`rgb(${blue}, 0, ${red})`);
  };
  const handlePitchMove = (position) => {
    // Update colorBox based on thumb position
    const blue = Math.min(255, Math.max(0, 255 - (position - 50) * 2.55));
    const red = Math.min(255, Math.max(0, (position - 50) * 2.55));
    setColorBox2(`rgb(${blue}, 0, ${red})`);
  };
  return (
    <>
      {showPlaybackComponent ? (
        <PlaybackComponent setFile={setFile} setAudioUri ={setAudioUri} audioUri={audioUri} setShowPlaybackComponent={setShowPlaybackComponent} showPlaybackComponent={showPlaybackComponent} />
      ) : (
        <View style={styles.container}>
          {/* Controls for speed and pitch */}
          <View style={styles.textContainer}>
            <Text style={styles.sliderLabel}>Speed</Text>
            <Text style={styles.sliderLabel}>Pitch</Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderWithText}>
              <SpeedCustomSlider speed={speed} handleThumbMove={handleThumbMove} setSpeed={setSpeed} onChange={handleSpeedChange} />
              <PitchCustomSlider file={file} audioUri={audioUri} onChange={handlePitchChange} pitch={pitch} setPitch={setPitch} onThumbMove={handlePitchMove}/>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderWithText}>
              <View style={[styles.colorBox, { backgroundColor: colorBox1 }]}></View>
              <View style={[styles.colorBox, { backgroundColor: colorBox2 }]}></View>
            </View>
          </View>

          {/* Icon */}
          <Icon name="info" size={30} color="grey" style={styles.icon} />

          {/* Additional features and controls */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.buttonPair, styles.shadow, { backgroundColor: pairButtonColor }]}
                onPress={handlePairButtonClick}
              >
                <Text style={styles.buttonText}>Pair</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonEffect, styles.shadow]}>
                <Text style={styles.buttonText}>Reverb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonEffect, styles.shadow]}>
                <Text style={styles.buttonText}>Noise Cancellation</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.buttonLightGrey,
                  styles.shadow,
                  { backgroundColor: showPlaybackComponent ? 'transparent' : '#808080' }
                ]}
              >
                <Text style={styles.buttonText}>Modulation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlaybackButtonClick} style={[styles.buttonLightGrey, styles.shadow]}>
                <Text style={styles.buttonText}>Playback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    marginTop: 20,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sliderWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  colorBox: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginBottom: 10
  },
  sliderLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonPair: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff', // Set border color here
  },
  buttonEffect: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff', // Set border color here
  },
  buttonLightGrey: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffffff', // Set border color here
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});