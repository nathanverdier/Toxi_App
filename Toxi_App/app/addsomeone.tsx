import React, { useState } from 'react';
import { Button, Text, Modal, Image, StyleSheet, TextInput, View, TouchableHighlight, Animated, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImagePickerResult, ImagePickerSuccessResult } from 'expo-image-picker';

export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));  

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const pickImageFromGallery = async () => {
    let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const successResult = result as ImagePickerSuccessResult;
      setImage(successResult.assets[0].uri);
      closeModal();
    }
  };

  const takePhoto = async () => {
    let result: ImagePickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const successResult = result as ImagePickerSuccessResult;
      setImage(successResult.assets[0].uri);
      closeModal();
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/Black-Mirror-Chute-Libre.png')}
            style={styles.reactLogo}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add someone</ThemedText>
      </ThemedView>

      <View style={styles.container}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={openModal}>
          <Text style={styles.textStyle}>Select a picture</Text>
        </TouchableHighlight>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
              <Text style={styles.modalText}>Choose an option</Text>
              <TouchableOpacity style={styles.openButton} onPress={takePhoto}>
                <Text style={styles.textStyle}>Take a photo of the person</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.openButton} onPress={pickImageFromGallery}>
                <Text style={styles.textStyle}>Select a photo from gallery</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.openButton}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </Animated.View>
          </View>
        </Modal>
      </View>

      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter their name"
        placeholderTextColor={'#888'}
      />
      <Button
        title="Validé"
        color="#A1CEDC"
        disabled={!image || !name}
        onPress={() => {
          // Action to perform when the button is pressed
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#A1CEDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,  
    backgroundColor: '#fff',  
    paddingHorizontal: 15,  
    color: '#333',  
    shadowColor: '#000',  
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,  
    shadowRadius: 3.84,  
    elevation: 5, 
    width: '80%',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
