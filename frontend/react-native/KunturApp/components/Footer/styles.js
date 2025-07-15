import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../assets/colors';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary500,
    paddingVertical: hp('5%'),
    paddingHorizontal: wp('2%'),
  },
  footerButton: {
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    color: Colors.white,
    fontFamily: 'Montserrat-Light',  
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  Button: {
    padding: wp('2%'),
  },
});

export default styles;