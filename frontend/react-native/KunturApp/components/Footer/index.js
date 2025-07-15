import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Bars4Icon, ShieldCheckIcon, UserGroupIcon, MapIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <Bars4Icon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Historial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <ShieldCheckIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Monitor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <UserGroupIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Contactos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <MapIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Encontrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;