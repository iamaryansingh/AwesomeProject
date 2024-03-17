import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import * as FileSystem from 'expo-file-system';

const PitchCustomSlider = ({ file, onThumbMove, onChange, audioUri }) => {
  const [thumbPosition, setThumbPosition] = useState(110); // Initial position of the sliderThumb
  const [isDragging, setIsDragging] = useState(false); // State to track whether thumb is being dragged
  const pan = useRef(new Animated.ValueXY()).current; // Animation value for thumb movement

  useEffect(() => {
    // Call the onThumbMove callback whenever the thumb position changes
    onThumbMove(thumbPosition);
  }, [thumbPosition, onThumbMove]);

  const handlePanResponderMove = (event, gesture) => {
    // Move the thumb vertically within the sliderTrack boundaries
    const newThumbPosition = Math.min(220, Math.max(0, thumbPosition + gesture.dy));
    setThumbPosition(newThumbPosition);
    onChange(newThumbPosition); // Call the onChange function with the new pitch value
    pan.setValue({ x: 0, y: newThumbPosition });
  };

  const handlePanResponderStart = () => {
    console.log("handlePanResponderStart")
    setIsDragging(true); // Thumb dragging started
  };

  const handlePanResponderEnd = async () => {
    setIsDragging(false); // Thumb dragging ended

    console.log("----pitch---uri---");
    console.log(file);

    const rate = thumbPosition / 110; // Calculate rate value
    const formData = new FormData();
    formData.append('file', {
      uri: file.assets[0].uri,
      name: file.assets[0].name,
      type: file.assets[0].mimeType,
    });

    // Append other parameters if needed
    formData.append('n_steps', 2);

    // Make API call
    const response = await fetch('http://127.0.0.1:8082/pitch_shift', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type
      },
    });
    console.log(response, "respsonse"); // Check the response data        saveAudioFile(response);
    saveAudioFile(response)
  };
  const saveAudioFile = async (response) => {
    try {
      // Extracting necessary information from the response
      const fileName = "sample.mp3"; // Ensure the file extension matches the actual file type
      const blob = await response.blob();
      console.log(blob, "blob")
      // Check if the folder exists, if not, create it
      const folderName = FileSystem.documentDirectory + 'upload'; // Use documentDirectory for writable directory
      const folderInfo = await FileSystem.getInfoAsync(folderName);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderName);
      }

      // Convert binary blob to base64 string
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Save the file in the specified folder with the extracted name
      const filePath = `${folderName}/${fileName}`;
      await FileSystem.writeAsStringAsync(filePath, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      handleFilePicker(filePath)
      console.log('File saved successfully:', filePath);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const handleFilePicker = async (filePath) => {
    const formData = new FormData();
    formData.append('file', {
      uri: filePath,
      name: "sample-15s.mp3",
      type: "audio/mpeg",
    });
    formData.append('rate', 2);

    // Make POST request
    const response = await fetch('http://127.0.0.1:8082/time_stretch', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct content type
      },
    });
    const responseData = await response.json(); // Parse JSON response
    console.log(responseData); // Check the response data        saveAudioFile(response);

    if (!response.ok) {
      throw new Error('Failed to upload audio file');
    }

    // Assuming the response contains the audio data directly
    const audioData = await response.blob();

    // Update audioUri with the audio data
    // setAudioUri(URL.createObjectURL(audioData));
    // }

  };




  // PanResponder for handling touch gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderStart: handlePanResponderStart,
    onPanResponderEnd: handlePanResponderEnd,
  });

  return (
    <View style={styles.container}>
      {/* Slider track */}
      <View style={styles.sliderTrack}>
        {/* Higher label */}
        <Text style={[styles.label, styles.higherLabel]}>Higher</Text>

        {/* Slider thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.sliderThumb, { top: thumbPosition }]}
        ></Animated.View>

        {/* Lower label */}
        <Text style={[styles.label, styles.lowerLabel]}>Lower</Text>
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
  higherLabel: {
    top: 20, // Position at the top
  },
  lowerLabel: {
    bottom: 20, // Position at the bottom
  },
});

export default PitchCustomSlider;
