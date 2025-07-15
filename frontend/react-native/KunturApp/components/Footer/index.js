// src/components/Footer.js
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './styles'
import {
  Bars4Icon,
  ShieldCheckIcon,
  UserGroupIcon,
  MapIcon
} from 'react-native-heroicons/solid'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function Footer() {
  const router = useRouter()

  return (
    <View style={styles.footer}>
      {/* Ruta: app/Historial/index.js */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('Historial')}
      >
        <Bars4Icon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Historial</Text>
      </TouchableOpacity>

      {/* Ruta: app/Monitor/index.js */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/')}
      >
        <ShieldCheckIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Monitor</Text>
      </TouchableOpacity>

      {/* Ruta: app/Contacts/index.js */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('Camara')}
      >
        <UserGroupIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Camara</Text>
      </TouchableOpacity>

      {/* Ruta: app/Find/index.js */}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('Find')}
      >
        <MapIcon size={wp(5)} color="white" />
        <Text style={styles.footerText}>Encontrar</Text>
      </TouchableOpacity>
    </View>
  )
}
