import useControls from 'r3f-native-orbitcontrols';
import HomeScreen from '../screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/signup';
import LoginScreen from '../screens/login';
import TitleScreen from '../screens/titlescreen';
import InstructionsScreen from '../screens/instructions';
import { Game } from '../components/Game';
import UserScreen from '../screens/userprofile';
import ScoreScreen from '../screens/highscores';


const Stack = createStackNavigator();

const headerStyles = {
  headerStyle: {
    height: 0,
  },
  headerTitleStyle: {
    fontSize: 18,
  },
};


const Home = () => {
  const [OrbitControls, events] = useControls();
  return (

   <NavigationContainer independent={true} >

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='signup' component={SignupScreen} options={{ ...headerStyles }}/>
        <Stack.Screen name='login' component={LoginScreen} options={{ ...headerStyles }}/>
        <Stack.Screen name='title' component={TitleScreen} options={{ ...headerStyles }}/>
        <Stack.Screen name='how-to-play' component={InstructionsScreen}/>
        <Stack.Screen name='game' component={Game} />
        <Stack.Screen name="profile" component={UserScreen} />
        <Stack.Screen name="scores" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
