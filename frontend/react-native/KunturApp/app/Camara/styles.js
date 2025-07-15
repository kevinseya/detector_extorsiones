// app/Video/styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../assets/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: width,
    height: (width * 9) / 16,
  },
  recordButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.danger900,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  recording: {
    backgroundColor: Colors.primary500,
  },
  recordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    backgroundColor: 'black',
  },
});
