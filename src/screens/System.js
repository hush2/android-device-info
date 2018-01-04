import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'

export default class System extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'System',
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
        <RowItem title="OS Version" value={deviceInfo.osVersion} />
        <RowItem title="OS Codename" value={deviceInfo.osCodename} />
        <RowItem title="Fingerprint" value={deviceInfo.fingerprint} />
        <RowItem title="Build ID" value={deviceInfo.buildID} />
        <RowItem title="Build Release" value={deviceInfo.buildVersionRelease} />
        <RowItem title="Build Codename" value={deviceInfo.buildVersionCodename} />
        <RowItem title="Build Tags" value={deviceInfo.buildTags} />
        <RowItem title="Build Incremental" value={deviceInfo.buildVersionIncremental} />
        <RowItem title="Build Host" value={deviceInfo.buildVersionSDK} />
        <RowItem title="Build User" value={deviceInfo.buildUser} />
        <RowItem title="Build Time" value={deviceInfo.buildTime} />
        <RowItem title="Build Brand" value={deviceInfo.buildBrand} />
      </RowContainer>
    )
  }
}
