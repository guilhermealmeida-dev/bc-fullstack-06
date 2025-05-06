import React from 'react';
import {StatusBar} from 'react-native';
import AppRoutes from './src/routes/app-routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaProvider>
        <AppRoutes />
      </SafeAreaProvider>
    </>
  );
}

export default App;
