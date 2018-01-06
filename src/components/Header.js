import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Header extends React.Component {
  render() {
    return <Text style={s.header}>{this.props.children}</Text>
  }
}

const s = StyleSheet.create({
  header: {
    backgroundColor: '#d4eaf5',
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#222',
    textAlign: 'center',
    marginVertical: 3,
  },
})
