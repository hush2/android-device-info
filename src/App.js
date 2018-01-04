import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Battery from './screens/Battery'
import Device from './screens/Device'
import Sensors from './screens/Sensors'
import Hardware from './screens/Hardware'
import Network from './screens/Network'
import SIM from './screens/SIM'

const TabNav = TabNavigator(
  {
    Device: { screen: Device },
    Hardware: { screen: Hardware },
    Sensors: { screen: Sensors },
    Battery: { screen: Battery },
    Network: { screen: Network },
    SIM: { screen: SIM },
  },
  {
    initialRouteName: 'Device',
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      showIcon: true,
      style: {
        backgroundColor: '#1976d2',
      },
    },
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1976d2" />
        <TabNav />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
