import useControls from "r3f-native-orbitcontrols";
import HomeScreen from "../screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/signup";
import LoginScreen from "../screens/login";
import TitleScreen from "../screens/titlescreen";

const Stack = createStackNavigator();

const Home = () => {
  const [OrbitControls, events] = useControls();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="title" component={TitleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;
