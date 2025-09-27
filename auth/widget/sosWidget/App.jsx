import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import axios from 'axios';

export default function SOSWidget() {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await camera.current.startRecording({
        flash: 'off',
        onRecordingFinished: async (video) => {
          setIsRecording(false);
          await uploadVideo(video.path);
        },
        onRecordingError: (error) => {
          Alert.alert('Recording error', error.message);
          setIsRecording(false);
        },
      });
    } catch (e) {
      Alert.alert('Camera error', e.message);
      setIsRecording(false);
    }
  };

  const uploadVideo = async (videoPath) => {
    const formData = new FormData();
    formData.append('video', {
      uri: videoPath,
      type: 'video/mp4',
      name: 'sos_video.mp4',
    });

    try {
      await axios.post('https://your-server.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Upload successful', 'SOS video sent to server!');
    } catch (error) {
      Alert.alert('Upload failed', error.message || 'Unknown error');
    }
  };

  if (!device) {
    return <View><Text>Loading Camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={isRecording}
        video={true}
        audio={true}
      />
      <TouchableOpacity 
        style={[styles.sosButton, isRecording ? styles.recording : null]}
        onPress={startRecording}
        disabled={isRecording}
      >
        <Text style={styles.buttonText}>{isRecording ? 'Recording...' : 'SOS'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  sosButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  recording: {
    backgroundColor: 'darkred'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
