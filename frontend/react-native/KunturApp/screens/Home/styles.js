import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../assets/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  
  },
  gradientContainer: {
    flex: 1,  
  },
  locationContainer: {
  width: '100%',
  paddingHorizontal: wp('5%'),
  paddingVertical: wp('2%'),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
locationIcon: {
  fontSize: wp('5%'),
  marginRight: wp('2%'),
},
locationText: {
  fontSize: wp('4%'),
  fontFamily: 'Montserrat-Regular',
  color: 'white',
  fontWeight: '500',
},
  container_sup: {
    flex: wp('60'),
    justifyContent: 'center',  
    alignItems: 'center',
  },
  container_inf: {
    flex: wp('40'),
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  roundedBox: {
    width: wp('90%'), 
    height: wp('75%'),  
    borderRadius: wp('5%'),  
    backgroundColor: Colors.primary700.slice(0, -2) + '66', 
    alignItems: 'center',  
    justifyContent: 'center',  
    margin: wp('5%'),  
  },
  circleContainer: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: Colors.success900, // Color verde cuando está activo
  },
  inactiveCircle: {
    backgroundColor: Colors.danger900, // Color rojo cuando está inactivo
  },
   boxTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    marginTop: wp('2%'),
  },
  boxTitle_active: {
    color: Colors.success900,  // Texto verde cuando está activo
  },
  boxTitle_inactive: {
    color: Colors.danger900,  // Texto rojo cuando está inactivo
  },
  boxSubTitle: {
    fontSize: wp('3.5%'),
    fontFamily: 'Montserrat-Light',
    fontWeight: '400',
    color: 'white',
    marginTop: wp('1%'),
  },
  subTitleText_active: {
    color: Colors.success900,  // Texto verde cuando está activo
  },
  subTitleText_inactive: {
    color: Colors.danger900,  // Texto rojo cuando está inactivo
  },
  button: {
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('5%'),
    marginTop: wp('5%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth:2
  },
  buttonIcon_active:{
    color: Colors.success900,
  },
  buttonIcon_inactive:{
    color: Colors.danger900,
  },
  activeButton: {
    borderColor: Colors.success900,  // Activo
  },
  inactiveButton: {
    borderColor: Colors.danger900,  // Inactivo
  },
  buttonText: {
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: 'green',  // Texto verde cuando está activo
    fontFamily: 'Montserrat-Light',
  },
  inactiveButtonText: {
    color: 'red',  // Texto rojo cuando está inactivo
    fontFamily: 'Montserrat-Light',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: wp('5%'), 
    paddingHorizontal: wp('5%'), 
  },
  square: {
    flex: 1,  
    height: wp('40%'),  
    marginHorizontal: wp('2%'),  
    borderRadius: wp('5%'),  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: Colors.primary700.slice(0, -2) + '70', 
  },
  squareText: {
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Light',  
    fontWeight: '600',
    color: 'white',
    marginTop: wp('2%'),  
  },
  squareSubText: {
    fontSize: wp('2%'), 
    fontFamily: 'Montserrat-Bold', 
    fontWeight: '400',
    color: 'white',
    marginTop: wp('1%'),  
  },
});

export default styles;
