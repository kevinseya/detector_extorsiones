import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../assets/colors';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './styles'; // Importamos los estilos
import { BellAlertIcon, ChartBarIcon, ShieldCheckIcon, ExclamationCircleIcon, PowerIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Home = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  return (
    <View style={styles.mainContainer}>     
      {/* El LinearGradient solo envuelve la parte central */}
      <LinearGradient
        colors={[Colors.secondary500, Colors.primary500]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer} // Estilo específico para el gradiente
      >
        <Header />
        
        {/* Ubicación */}
        <View style={styles.locationContainer}>
          <MapPinIcon size={wp(10)} color="white" />
          <Text style={styles.locationText}>Av. Principal 123, Centro</Text>
        </View>
        
        <View style={styles.container_sup}>
          <View style={styles.roundedBox}>
            <View
              style={[
                styles.circleContainer,
                isActive ? styles.activeCircle : styles.inactiveCircle, // Cambiar el color dependiendo del estado
              ]}
            >
              {/* Ícono que cambia según el estado */}
              {isActive ? (
                <ShieldCheckIcon size={wp(25)} color="white" />
              ) : (
                <ExclamationCircleIcon size={wp(25)} color="white" />
              )}
            </View>
            {/* Título y Subtítulo */}
            <Text style={[styles.boxTitle, isActive ? styles.boxTitle_active : styles.boxTitle_inactive]}>
              Kuntur
            </Text>
            <Text style={[styles.boxSubTitle, isActive ? styles.subTitleText_active : styles.subTitleText_inactive]}>
              {isActive ? 'a la Escucha' : 'Apagado'}
            </Text>

            {/* Botón */}
            <TouchableOpacity
              style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]} // Cambiar el borde del botón
              onPress={toggleStatus}
            >
              {/* Ícono que cambia de color dependiendo del estado */}
              <PowerIcon
                color={isActive ? Colors.success900 : Colors.danger900} // Cambiar el color directamente
                size={wp(6)}
              />
              <Text style={[styles.buttonText, isActive ? styles.activeButtonText : styles.inactiveButtonText]}>
                {isActive ? '  Apagar' : '  Activar'} Kuntur
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container_inf}>
          <View style={styles.row}>
            <View style={styles.square}>
              <BellAlertIcon size={wp(15)} color="white" />
              <Text style={styles.squareText}>Última Alerta</Text>
              <Text style={styles.squareSubText}>21:39</Text>
            </View>
            <View style={styles.square}>
              <ChartBarIcon size={wp(15)} color="white" />
              <Text style={styles.squareText}>Tipos de Incidencias</Text>
              <Text style={styles.squareSubText}>20</Text>
            </View>
          </View>
        </View>

      </LinearGradient>
      <Footer />
    </View>
  );
};

export default Home;
