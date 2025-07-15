import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    height: wp('30%'),
    paddingTop: wp('2%'),
  },
  logo: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  kunturImage: {
    width: wp('40%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  micButton: {
    padding: wp('2%'),
  },
});

export default styles;