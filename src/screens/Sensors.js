import React from 'react'
import { StyleSheet, NativeModules, View } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Sensors extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Sensors',
    tabBarIcon: () => <Icon name="eye-outline" size={25} color="white" />,
  }

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNAndroidDeviceInfo
    device
      .getSensorInfo()
      .then((sensor) => {
        this.sensors = sensor
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    let sensors = this.sensors.map((sensor, index) => {
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
