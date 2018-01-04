import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends React.Component {
  render() {
    return (
      <View style={s.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
