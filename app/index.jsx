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
import { UserProvider } from '../context/userProvider';
import CreditsScreen from '../screens/credits';



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
    <UserProvider>
      <NavigationContainer independent={true} >
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='signup' component={SignupScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name='login' component={LoginScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name='title' component={TitleScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name='how-to-play' component={InstructionsScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name='game' component={Game} options={{ ...headerStyles }}/>
          <Stack.Screen name="profile" component={UserScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name="scores" component={ScoreScreen} options={{ ...headerStyles }}/>
          <Stack.Screen name="credits" component={CreditsScreen} options={{ ...headerStyles }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default Home;
