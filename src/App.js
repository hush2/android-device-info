import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Battery from './screens/Battery'
import Device from './screens/Device'
import Sensors from './screens/Sensors'
import Hardware from './screens/Hardware'
import Network from './screens/Network'
import SIM from './screens/SIM'
import About from './screens/About'

const TabNav = TabNavigator(
  {
    Device: { screen: Device },
    Hardware: { screen: Hardware },
    Sensors: { screen: Sensors },
    Battery: { screen: Battery },
    Network: { screen: Network },
    SIM: { screen: SIM },
    About: { screen: About },
  },
  {
    initialRouteName: 'Device',
    lazy: true, // Note: lazy is dropped in beta.23
    tabBarOptions: {
      scrollEnabled: true,
      showIcon: true,
      style: {
        backgroundColor: '#2770e2',
      },
    },
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#335385" />
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
