import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    // Quitamos backgroundColor para que el gradiente sea visible
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'white', // Texto sobre el gradiente
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playButton: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: 'white', // Texto sobre el gradiente
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: 'rgba(255,255,255,0.7)',
  },
});
