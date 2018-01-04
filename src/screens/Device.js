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

    let di = this.deviceInfo

    return (
      <RowContainer>
        <RowItem title="Device" value={di.device} />
        <RowItem title="Device Type" value={di.deviceType} />
        <RowItem title="Model" value={di.model} />
        <RowItem title="Manufacturer" value={di.manufacturer} />
        <RowItem title="Phone Type" value={di.phoneType} />
        <RowItem title="board" value={di.board} />
        <RowItem title="product" value={di.product} />
        <RowItem title="Hardware" value={di.hardware} />
        <RowItem title="Orientation" value={di.orientation} />
        <RowItem title="Display ID" value={di.screenDisplayID} />
        <RowItem title="Bootloader" value={di.bootloader} />
        <RowItem title="Device Rooted" value={di.isDeviceRooted} />
        <RowItem title="Build Codename" value={di.buildVersionCodename} />
        <RowItem title="Build Incremental" value={di.buildVersionIncremental} />
        <RowItem title="Build SDK" value={di.buildVersionSDK} />
        <RowItem title="OS Codename" value={di.osCodeName} />
        <RowItem title="OS Version" value={di.osVersion} />
        <RowItem title="Build Brand" value={di.buildBrand} />
        <RowItem title="Build Host" value={di.buildHost} />
        <RowItem title="Build Tags" value={di.buildTags} />
        <RowItem title="Build Time" value={di.buildTime} />
        <RowItem title="Build User" value={di.buildUser} />
        <RowItem title="Build Ver Release" value={di.buildVersionRelease} />
        <RowItem title="Phone Number" value={di.phoneNo} />
        <RowItem title="Radio Version" value={di.radioVer} />
        <RowItem title="Fingerprint" value={di.fingerprint} />
      </RowContainer>
    )
  }
}
