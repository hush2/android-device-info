import React from 'react'
import { Text, NativeModules, StyleSheet } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Battery extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Battery',
    tabBarIcon: () => <Icon name="battery-30" size={25} color="white" />,
  }

  state = { ready: false }

  componentDidMount() {
    let device = NativeModules.RNAndroidDeviceInfo
    device
      .getBatteryInfo()
      .then((battery) => {
        this.battery = battery
        this.setState({ ready: true })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }

    let batt = this.battery
    let battPct = batt.batteryPercentage
    let color = '#008800'
    if (battPct < 25) {
      color = '#ca2818'
    } else if (battPct < 50) {
      color = '#d89e25'
    }
    return (
      <RowContainer>
        <Text style={[s.batteryPct, { color }]}>{battPct}%</Text>
        <RowItem title="Health" value={batt.batteryHealth} />
        <RowItem title="Temperature" value={batt.batteryTemperature} />
        <RowItem title="Technology" value={batt.batteryTechnology} />
        <RowItem title="Voltage" value={batt.batteryVoltage} />
        <RowItem title="Battery Present?" value={batt.isBatteryPresent} />
        <RowItem title="Battery Charging?" value={batt.isDeviceCharging} />
        <RowItem title="Charging Source" value={batt.chargingSource} />
      </RowContainer>
    )
  }
}

const s = StyleSheet.create({
  batteryPct: {
    textAlign: 'center',
    fontSize: 100,
  },
})
