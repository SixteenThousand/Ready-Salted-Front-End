import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { Suspense } from 'react';
import Crisp from '../components/3dModel/Crisp';
import HomeScreen from '../screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/signup';
import LoginScreen from '../screens/login';


const Stack = createStackNavigator()

const Home = () => {
  const [OrbitControls, events] = useControls();
  return (
   <NavigationContainer independent={true} >

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='signup' component={SignupScreen} options={{ headerShown: true }}/>
        <Stack.Screen name='login' component={LoginScreen}/>
      </Stack.Navigator>
   </NavigationContainer>
  );
};

export default Home;