import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Battery from './screens/Battery'

const TabNav = TabNavigator(
  {
    Battery: { screen: Battery },
  },
  {
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
