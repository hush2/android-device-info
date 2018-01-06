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
      this.fpInfo = await device.getFingerprintInfo()
      this.displayInfo = await device.getDisplayInfo()
      this.abiInfo = await device.getAbiInfo()
      this.locInfo = await device.getLocationInfo()
      this.nfcInfo = await device.getNfcInfo()
      this.memInfo = await device.getMemoryInfo(unit)

      this.setState({ ready: true })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.ready) {
      return <Loading />
    }

    let total = roundTo(parseFloat(this.memInfo.totalRAM), 2) + ' ' + unit
    let tims = roundTo(parseFloat(this.memInfo.totalInternalMemorySize), 2) + ' ' + unit
    let aims = roundTo(parseFloat(this.memInfo.availableInternalMemorySize), 2) + ' ' + unit
    let tems = roundTo(parseFloat(this.memInfo.totalExternalMemorySize), 2) + ' ' + unit
    let aems = roundTo(parseFloat(this.memInfo.availableExternalMemorySize), 2) + ' ' + unit

    return (
      <RowContainer>
        <Header>DISPLAY</Header>
        <RowItem title="Resolution" value={this.displayInfo.resolution} />
        <RowItem title="Density" value={this.displayInfo.density} />
        <RowItem title="Refresh Rate" value={roundTo(this.displayInfo.refreshRate, 2)} />
        <RowItem title="Pysical Size" value={roundTo(this.displayInfo.physicalSize, 2)} />
        <Header>MEMORY</Header>
        <RowItem title="Total RAM" value={total} />
        <RowItem title="Internal Total" value={tims} />
        <RowItem title="Internal Available " value={aims} />
        <RowItem title="External Total" value={tems} />
        <RowItem title="External Available" value={aems} />
        <Header>FINGERPRINT</Header>
        <RowItem title="is Present?" value={this.fpInfo.isFingerprintSensorPresent} />
        <RowItem title="is Enrolled?" value={this.fpInfo.areFingerprintsEnrolled} />
        <Header>NFC</Header>
        <RowItem title="is Present?" value={this.nfcInfo.isNfcPresent} />
        <RowItem title="is Enabled?" value={this.nfcInfo.isNfcEnabled} />
        <Header>LOCATION</Header>
        <RowItem title="Longitude" value={this.locInfo.long} />
        <RowItem title="Latitude" value={this.locInfo.latt} />
        <Header>ABI</Header>
        <RowItem title="Supported ABIs" value={this.abiInfo.supportedABI} />
      </RowContainer>
    )
  }
}
