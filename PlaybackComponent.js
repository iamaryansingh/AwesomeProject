import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import player from "./assets/player.jpeg";
import AudioPlayer from './AudioPlayer';

export default function PlaybackComponent({ setFile,audioUri,setAudioUri,setShowPlaybackComponent, showPlaybackComponent }) {
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [addIcon, setAddIcon] = useState('add');
  const [showYouTubeUrlInput, setShowYouTubeUrlInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mediaAvailable, setMediaAvailable] = useState(false);
  const [trackName, setTrackName] = useState('');
  const [trackInfo, setTrackInfo] = useState('');

  const handleAddButtonClick = () => {
    setShowAdditionalButtons(!showAdditionalButtons);
    setAddIcon(showAdditionalButtons ? 'add' : 'close');
    setShowYouTubeUrlInput(false);
  };

  const handleYouTubeUrlButtonClick = () => {
    setShowYouTubeUrlInput(true);
    setShowAdditionalButtons(false);
  };

  const handleSubmit = () => {
    console.log('Submitted YouTube URL:', youtubeUrl);
    setYoutubeUrl('');
  };
  const handleFilePicker = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', // Specify the file type to audio files
      });
  console.log(file)
      // if (file.type === 'success') {
        console.log('Selected audio file:', file);
        setMediaAvailable(true);
        setTrackName(file.name);
        setTrackInfo(file.mimeType);
        setFile(file)
        setAudioUri(file.assets[0].uri);
        console.log("-----file--uri---");
        console.log(file.assets[0].uri);
        console.log(file.assets[0].mimeType);
        console.log(file.assets[0].name);

        // Create form data
        const formData = new FormData();
        formData.append('file', {
          uri: file.assets[0].uri,
          name: file.assets[0].name,
          type: file.assets[0].mimeType,
        });
  
        // Make POST request
        const response = await fetch('http://127.0.0.1:8082/upload', {
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
    } catch (error) {
      console.error('Error picking file:', error);
    }

  };
  

  
  
  return (
    <View style={styles.container}>
      {/* Player UI */}
      {mediaAvailable && (
        <>
          <View style={styles.playerContainer}>
            <Image source={player} style={styles.playerImage} />
          </View>
          <View style={styles.trackInfoContainer}>
            <Text style={styles.trackName}>{trackName}</Text>
            <Text style={styles.trackInfo}>{trackInfo}</Text>
          </View>
          <AudioPlayer audioUri={audioUri} />
        </>
      )}

      <TouchableOpacity style={styles.icon} onPress={handleAddButtonClick}>
        <Icon name={addIcon} size={30} color="black" />
      </TouchableOpacity>

      {/* Additional buttons */}
      {showAdditionalButtons && (
        <View style={styles.additionalButtons}>
          {/* Button for YouTube URL */}
          <TouchableOpacity style={styles.additionalButton} onPress={handleYouTubeUrlButtonClick}>
            <Text style={styles.additionalButtonText}>YouTube URL</Text>
          </TouchableOpacity>
          {/* Button for adding a file */}
          <TouchableOpacity style={styles.additionalButton} onPress={handleFilePicker}>
            <Text style={styles.additionalButtonText}>Add File</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Render YouTube URL input if enabled */}
      {showYouTubeUrlInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter YouTube URL"
            style={styles.input}
            value={youtubeUrl}
            onChangeText={setYoutubeUrl}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.buttonEffect, styles.shadow]}>
            <Text style={styles.buttonText}>Noise Cancellation</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => setShowPlaybackComponent(false)} style={[styles.buttonLightGrey, styles.shadow]}>
            <Text style={styles.buttonText}>Modulation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonLightGrey,
              styles.shadow,
              {
                backgroundColor: !showPlaybackComponent ? 'transparent' : '#808080',
              },
            ]}
          >
            <Text style={styles.buttonText}>Playback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  playerImage: {
    marginTop: '25%',
    width: 200,
    height: 200,
  },
  trackInfoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackInfo: {
    fontSize: 14,
    color: 'grey',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  additionalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  additionalButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  additionalButtonText: {
    color: 'black',
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    borderColor: '#ffffff',
  },
  buttonEffect: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  buttonLightGrey: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
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