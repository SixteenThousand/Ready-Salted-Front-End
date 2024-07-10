import { Audio } from 'expo-av';

export async function playSound(url) {
  let sound = new Audio.Sound();
  try {
    await sound.loadAsync(url);
    await sound.playAsync();
  } catch (error) {
    console.log('Failed to play the sound', error);
  }
}
