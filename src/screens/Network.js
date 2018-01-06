import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Network extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Network',
    tabBarIcon: () => <Icon name="access-point-network" size={25} color="white" />,
  }

  state = { ready: false }

  componentDidMount() {
    let device = NativeModules.RNAndroidDeviceInfo
    device
      .getNetworkInfo()
      .then((net) => {
        this.net = net
        this.setState({ ready: true })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }
    const net = this.net
    return (
      <RowContainer>
        <RowItem title="Network Type" value={net.networkType} />
        <RowItem title="Network Available?" value={net.isNetworkAvailable} />
        <RowItem title="WiFi Enabled" value={net.isWifiEnabled} />
        <RowItem title="IPV4 Address" value={net.iPv4Address} />
        <RowItem title="IPV6 Address" value={net.iPv6Address} />
        <RowItem title="WiFi SSID" value={net.wifiSSID} />
        <RowItem title="WiFi BSSID" value={net.wifiBSSID} />
        <RowItem title="WiFi Link Speed" value={net.wifiLinkSpeed} />
        <RowItem title="WiFi MAC Address" value={net.wifiMAC} />
      </RowContainer>
    )
  }
}
