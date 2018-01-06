import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

export default class RowContainer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>{this.props.children}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})
