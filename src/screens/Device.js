import React from 'react'
import { NativeModules } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Header from '../components/Header'
import Loading from '../components/Loading'

export default class Device extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Device',
    tabBarIcon: () => <Icon name="cellphone-android" size={25} color="white" />,
  }

  state = { ready: false }

  componentDidMount() {
    let device = NativeModules.RNAndroidDeviceInfo
    device
      .getDeviceInfo()
      .then((di) => {
        this.di = di
        this.setState({ ready: true })
      })
      .catch((err) => console.log(err))
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }

    let di = this.di
    return (
      <RowContainer>
        <Header>Phone</Header>
        <RowItem title="Device" value={di.device} />
        <RowItem title="Device Type" value={di.deviceType} />
        <RowItem title="Model" value={di.model} />
        <RowItem title="Manufacturer" value={di.manufacturer} />
        <RowItem title="Phone Type" value={di.phoneType} />
        <RowItem title="Radio Version" value={di.radioVer} />
        <RowItem title="Fingerprint" value={di.fingerprint} />
        <RowItem title="Board" value={di.board} />
        <RowItem title="Product" value={di.product} />
        <RowItem title="Hardware" value={di.hardware} />
        <RowItem title="Orientation" value={di.orientation} />
        <RowItem title="Display ID" value={di.screenDisplayID} />
        <RowItem title="Bootloader" value={di.bootloader} />
        <RowItem title="Device Rooted?" value={di.isDeviceRooted} />
        <Header>OS</Header>
        <RowItem title="OS Codename" value={di.osCodeName || '-'} />
        <RowItem title="OS Version" value={di.osVersion} />
        <RowItem title="Build Codename" value={di.buildVersionCodename} />
        <RowItem title="Build Incremental" value={di.buildVersionIncremental} />
        <RowItem title="Build SDK" value={di.buildVersionSDK} />
        <RowItem title="Build Brand" value={di.buildBrand} />
        <RowItem title="Build Host" value={di.buildHost} />
        <RowItem title="Build Tags" value={di.buildTags} />
        <RowItem title="Build Time" value={di.buildTime} />
        <RowItem title="Build User" value={di.buildUser} />
        <RowItem title="Build Ver Release" value={di.buildVersionRelease} />
      </RowContainer>
    )
  }
}
