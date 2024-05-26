import { Image, StyleSheet, Platform, View } from 'react-native';
import { Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
        <ThemedText type="title">Welcome on Toxi_App!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Button
        title="Add someone"
        color="#A1CEDC"
        //onPress={() => navigation.navigate('explore')}
      />
      <Button
        title="See everyone"
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
});
