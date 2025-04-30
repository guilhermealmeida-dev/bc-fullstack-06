import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../pages/login/login-page';
import HomePage from '../pages/home/home-page';
import {NavigationContainer} from '@react-navigation/native';
import CriatePage from '../pages/register/register-page';
import { AppProvider } from '../context/AppContext';

export type RootStackParamList = {
  LoginPage: undefined;
  HomePage: undefined;
  RegisterPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00BC7D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 30,
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: 'Sig-in',
          headerShown: false,
        }}
      />
      <Stack.Screen name="RegisterPage" component={CriatePage} />
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <AppProvider>
        <RootStack />
      </AppProvider>
    </NavigationContainer>
  );
}
