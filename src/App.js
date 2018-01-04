import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Battery from './screens/Battery'
import Device from './screens/Device'
import System from './screens/System'
import Sensors from './screens/Sensors'
import Hardware from './screens/Hardware'

const TabNav = TabNavigator(
  {
    Hardware: { screen: Hardware },
    Sensors: { screen: Sensors },
    System: { screen: System },
    Device: { screen: Device },
    Battery: { screen: Battery },
  },
  {
    // initialRouteName: 'Device',
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
    },
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
