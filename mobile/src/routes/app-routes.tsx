import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../pages/login/login-page';
import HomePage from '../pages/home/home-page';
import {NavigationContainer} from '@react-navigation/native';
import RegisterPage from '../pages/register/register-page';
import {AppProvider} from '../context/AppContext';
import ActivityPage from '../pages/activity/activity-page';
import Fonts from '../theme/fonts';
import {Category} from '../types/category';
import {useCallback} from 'react';
import PerfilPage from '../pages/perfil/perfil-page';
import BackButton from '../components/BackButton/BackButton';

export type RootStackParamList = {
  LoginPage: undefined;
  HomePage: undefined;
  RegisterPage: undefined;
  ActivityPage: {
    preferences?: string[];
    categories: Category[];
  };
  PerfilPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


function RootStack() {
  const headerLeft = useCallback(() => <BackButton />, []);

  return (
    <Stack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#171717',
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: Fonts.BebasNeue,
          fontWeight: 400,
        },
        headerTitleAlign: 'center',
        headerShown: false,
        headerLeft: headerLeft,
      }}>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: 'Sig-in',
        }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{
          title: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="PerfilPage"
        component={PerfilPage}
        options={{
          title: 'Perfil',
        }}
      />
      <Stack.Screen
        name="ActivityPage"
        component={ActivityPage}
        options={{
          title: 'Atividades',
          headerShown: true,
        }}
      />
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
