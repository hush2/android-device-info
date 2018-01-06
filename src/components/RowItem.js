import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class RowItem extends React.Component {
  render() {
    let value = this.props.value
    if (typeof value === 'boolean') {
      value = value ? 'Yes' : 'No'
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  title: {
    flex: 1,
    color: '#676767',
    fontSize: 16,
    textAlign: 'right',
    marginRight: 5,
  },
  value: {
    marginLeft: 5,
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    color: '#112233',
  },
})
