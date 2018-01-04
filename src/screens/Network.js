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

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNEasyDeviceInfo
    device
      .getNetworkInfo()
      .then((netInfo) => {
        this.netInfo = netInfo
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    const netInfo = this.netInfo
    return (
      <RowContainer>
        <RowItem title="Network Type" value={netInfo.networkType} />
        <RowItem title="Network Available" value={netInfo.isNetworkAvailable} />
        <RowItem title="WiFi Enabled" value={netInfo.isWifiEnabled} />
        <RowItem title="IPV4 Address" value={netInfo.iPv4Address} />
        <RowItem title="IPV6 Address" value={netInfo.iPv6Address} />
        <RowItem title="WiFi SSID" value={netInfo.wifiSSID} />
        <RowItem title="WiFi BSSID" value={netInfo.wifiBSSID} />
        <RowItem title="WiFi Link Speed" value={netInfo.wifiLinkSpeed} />
        <RowItem title="WiFi MAC Address" value={netInfo.wifiMAC} />
      </RowContainer>
    )
  }
}
