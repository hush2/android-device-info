import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'

export default class Device extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Device',
  }

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNEasyDeviceInfo
    device
      .getDeviceInfo()
      .then((deviceInfo) => {
        this.deviceInfo = deviceInfo
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    let deviceInfo = this.deviceInfo

    return (
      <RowContainer>
        <RowItem title="Device" value={deviceInfo.device} />
        <RowItem title="Device Type" value={deviceInfo.deviceType} />
        <RowItem title="Model" value={deviceInfo.model} />
        <RowItem title="Manufacturer" value={deviceInfo.manufacturer} />
        <RowItem title="Phone Type" value={deviceInfo.phoneType} />
        <RowItem title="board" value={deviceInfo.board} />
        <RowItem title="product" value={deviceInfo.product} />
        <RowItem title="Hardware" value={deviceInfo.hardware} />
        <RowItem title="Orientation" value={deviceInfo.orientation} />
        <RowItem title="Display ID" value={deviceInfo.screenDisplayID} />
        <RowItem title="Bootloader" value={deviceInfo.bootloader} />
        <RowItem title="Device Rooted" value={deviceInfo.isDeviceRooted} />
      </RowContainer>
    )
  }
}
