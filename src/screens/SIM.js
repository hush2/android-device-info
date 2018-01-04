import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SIM extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'SIM',
    tabBarIcon: () => <Icon name="sim" size={25} color="white" />,
  }

  state = { loading: true }

  async componentDidMount() {
    const device = NativeModules.RNEasyDeviceInfo
    try {
      this.sim = await device.getSimInfo()
      this.device = await device.getDeviceInfo()
    } catch (err) {
      console.log(err)
    }
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <RowContainer>
        <RowItem title="Phone Number" value={this.device.phoneNo} />
        <RowItem title="IMSI" value={this.sim.imsi} />
        <RowItem title="Serial" value={this.sim.serial} />
        <RowItem title="Country" value={this.sim.country} />
        <RowItem title="SIM Network Locked" value={this.sim.isSimNetworkLocked} />
        <RowItem title="Multi SIM" value={this.sim.isMultiSim} />
        <RowItem title="# of Active SIM" value={this.sim.numberOfActiveSim} />
      </RowContainer>
    )
  }
}
