import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MicrophoneIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      
      <Image
        source={require('../../assets/kuntur_image.png')}
        style={styles.kunturImage}
      />
      
      <View style={styles.micButton}>
        <MicrophoneIcon size={wp(5)} color="white" />
      </View>
    </View>
  );
};

export default Header;