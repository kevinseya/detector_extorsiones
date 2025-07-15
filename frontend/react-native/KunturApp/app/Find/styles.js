// app/Find/styles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';

export default StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
    marginBottom: 12,
  },
  error: {
    color: '#ff5555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.primary500,
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
});
