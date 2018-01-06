import React from 'react'
import { NativeModules, View } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Sensors extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Sensors',
    tabBarIcon: () => <Icon name="eye-outline" size={25} color="white" />,
  }

  state = { ready: false }

  componentDidMount() {
    let device = NativeModules.RNAndroidDeviceInfo
    device
      .getSensorInfo()
      .then((sensor) => {
        this.sensors = sensor
        this.setState({ ready: true })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }

    let sensors = this.sensors.map((sensor, index) => {
      return (
        <View key={index}>
          <Header>Sensor {index} </Header>
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
