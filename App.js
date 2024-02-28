import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Slider,
  Switch,
  Button,
  TouchableOpacity,
  
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header section with labels and image */}


      {/* Controls for speed and pitch */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Speed</Text>
        <View style={styles.sliderWithText}>
          <Slider style={styles.slider} />
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderText}>150%</Text>
            <Text style={styles.sliderText}>125%</Text>
            <Text style={styles.sliderText}>100%</Text>
            <Text style={styles.sliderText}>75%</Text>
            <Text style={styles.sliderText}>50%</Text>
          </View>
          <Slider style={styles.slider} />
        </View>
      </View>


      {/* Additional features and controls */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPair}>
          <Text style={styles.buttonText}>Pair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEffect}>
          <Text style={styles.buttonText}>Effect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonLightGrey}>
          <Text style={styles.buttonText}>Noise Cancellation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLightGrey}>
          <Text style={styles.buttonText}>Modulation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLightGrey}>
          <Text style={styles.buttonText}>Playback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  controls: {
    flexDirection: 'row', // Align sliders horizontally
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    height: 400, // Adjust height to make vertical
    width: 40, // Adjust width to make vertical
    marginBottom: 10,
    transform: [{ rotate: '-90deg' }], // Rotate slider vertically
  },
  sliderLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderTextContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    height: 200, // Match slider height
  },
  sliderText: {
    fontSize: 10,
  },
  features: {
    // Add styles for the features section based on your design
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 14,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonPair: {
    width:"50%",
    padding: 10, // Adjust padding values as needed
    height:"100%",
    backgroundColor: '#808080', /* Adjust for desired grey shade */
    
    // ...other styling for spacing, padding, etc.
  },
  buttonEffect: {
    width:"50%",
    padding: 10, // Adjust padding values as needed

    backgroundColor: '#F5F5F5', /* Light grey */
    // ...other styling for spacing, padding, etc.
  },
  buttonLightGrey: {
    width:"33.3%",
    backgroundColor: '#F5F5F5',
        padding: 10, // Adjust padding values as needed

    // ...other styling for spacing, padding, etc.
  },
  buttonText: {
    color: '#000',
    textAlign: 'center', // Align text horizontally
    textAlignVertical: 'center', // Align text vertically
  },
});
