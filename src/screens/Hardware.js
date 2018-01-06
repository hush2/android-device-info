import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Header from '../components/Header'
import Loading from '../components/Loading'
import roundTo from 'round-to'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const unit = 'GB'

export default class Hardware extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Hardware',
    tabBarIcon: () => <Icon name="chip" size={25} color="white" />,
  }

  state = { ready: false }

  async componentDidMount() {
    const device = NativeModules.RNAndroidDeviceInfo
    try {
      this.fp = await device.getFingerprintInfo()
      this.di = await device.getDisplayInfo()
      this.abi = await device.getAbiInfo()
      this.loc = await device.getLocationInfo()
      this.nfc = await device.getNfcInfo()
      this.mem = await device.getMemoryInfo(unit)

      this.setState({ ready: true })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }

    let total = roundTo(parseFloat(this.mem.totalRAM), 2) + ' ' + unit
    let tims = roundTo(parseFloat(this.mem.totalInternalMemorySize), 2) + ' ' + unit
    let aims = roundTo(parseFloat(this.mem.availableInternalMemorySize), 2) + ' ' + unit
    let tems = roundTo(parseFloat(this.mem.totalExternalMemorySize), 2) + ' ' + unit
    let aems = roundTo(parseFloat(this.mem.availableExternalMemorySize), 2) + ' ' + unit

    return (
      <RowContainer>
        <Header>DISPLAY</Header>
        <RowItem title="Resolution" value={this.di.resolution} />
        <RowItem title="Density" value={this.di.density} />
        <RowItem title="Refresh Rate" value={roundTo(this.di.refreshRate, 2)} />
        <RowItem title="Pysical Size" value={roundTo(this.di.physicalSize, 2)} />
        <Header>MEMORY</Header>
        <RowItem title="Total RAM" value={total} />
        <RowItem title="Internal Total" value={tims} />
        <RowItem title="Internal Available " value={aims} />
        <RowItem title="External Total" value={tems} />
        <RowItem title="External Available" value={aems} />
        <Header>FINGERPRINT</Header>
        <RowItem title="is Present?" value={this.fp.isFingerprintSensorPresent} />
        <RowItem title="is Enrolled?" value={this.fp.areFingerprintsEnrolled} />
        <Header>NFC</Header>
        <RowItem title="is Present?" value={this.nfc.isNfcPresent} />
        <RowItem title="is Enabled?" value={this.nfc.isNfcEnabled} />
        <Header>LOCATION</Header>
        <RowItem title="Longitude" value={this.loc.long} />
        <RowItem title="Latitude" value={this.loc.latt} />
        <Header>ABI</Header>
        <RowItem title="Supported ABIs" value={this.abi.supportedABI} />
      </RowContainer>
    )
  }
}
