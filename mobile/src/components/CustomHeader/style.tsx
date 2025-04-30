import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
