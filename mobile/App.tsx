import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import AppRoutes from './src/routes/app-routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaProvider>
        <View style={styles.container}>
          <AppRoutes />
        </View>
      </SafeAreaProvider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
