import React, { useState } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImagePickerResult, ImagePickerSuccessResult } from 'expo-image-picker';

export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if ('cancelled' in result && !result.cancelled && 'uri' in result) {
      setImage(result.uri as string);
    }
  };
  
  const takePhoto = async () => {
    let result: ImagePickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if ('cancelled' in result && !result.cancelled && 'uri' in result) {
      setImage(result.uri as string);
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
      <ThemedView style={ styles.titleContainer}>
        <ThemedText type="title">Add someone</ThemedText>
      </ThemedView>
      <Button title="Take a photo of the person" onPress={takePhoto} />
      <Button title="Select a photo from gallery" onPress={pickImageFromGallery} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter their name"
          placeholderTextColor={'white'}
        />
        <Button
          title="Validé"
          color="#A1CEDC"
          //onPress={() => navigation.navigate('explore')}
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
    //backgroundColor: { light: '#A1CEDC', dark: '#1D3D47' },
    color: 'white',
  },
});