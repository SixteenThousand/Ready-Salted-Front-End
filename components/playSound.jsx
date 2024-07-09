import { Audio } from 'expo-av';

export async function playSound(url) {
  let sound = new Audio.Sound();
  try {
    console.log('Loading Sound');
    await sound.loadAsync(url);

    console.log('Playing Sound');
    await sound.playAsync();
  } catch (error) {
    console.log('Failed to play the sound', error);
  }
}
