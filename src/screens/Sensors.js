import React from 'react'
import { StyleSheet, NativeModules, View } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'

export default class Sensors extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Sensors',
  }

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNEasyDeviceInfo
    device
      .getSensorInfo()
      .then((sensorInfo) => {
        this.sensorsInfo = sensorInfo
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <View />
    }

    let sensors = this.sensorsInfo.map((sensor, index) => {
      return (
        <View key={index} style={s.rows}>
          <RowItem title="Name" value={sensor.name} />
          <RowItem title="Vendor" value={sensor.vendor} />
          <RowItem title="Version" value={sensor.version} />
          <RowItem title="Power" value={sensor.power} />
          <RowItem title="Max Range" value={sensor.maximumRange} />
          <RowItem title="Resolution" value={sensor.resolution} />
        </View>
      )
    })
    return <RowContainer>{sensors}</RowContainer>
  }
}

const s = StyleSheet.create({
  rows: {
    paddingVertical: 10,
    borderBottomColor: 'rgba(204,204,204,0.25)',
    borderBottomWidth: 1,
  },
})
