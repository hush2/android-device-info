import React from 'react'
import { Text, NativeModules, StyleSheet } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import roundTo from 'round-to'

const unit = 'GB'

class Header extends React.Component {
  render() {
    return <Text style={s.header}>{this.props.children}</Text>
  }
}

export default class Hardware extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Hardware',
  }

  state = {
    ready: false,
  }

  async componentDidMount() {
    const device = NativeModules.RNEasyDeviceInfo
    try {
      this.fpInfo = await device.getFingerprintInfo()
      this.displayInfo = await device.getDisplayInfo()
      this.abiInfo = await device.getAbiInfo()
      this.locInfo = await device.getLocationInfo()
      this.nfcInfo = await device.getNfcInfo()
      this.memInfo = await device.getMemoryInfo(unit)

      console.log(this.memInfo)
    } catch (err) {
      console.log(err)
    }
    this.setState({ ready: true })
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
        <RowItem title="Display Resolution" value={this.displayInfo.resolution} />
        <RowItem title="Display Density" value={this.displayInfo.density} />
        <RowItem title="Display Refresh Rate" value={roundTo(this.displayInfo.refreshRate, 2)} />
        <RowItem title="Display Pysical Size" value={roundTo(this.displayInfo.physicalSize, 2)} />
        <RowItem title="" />
        <Header>MEMORY</Header>
        <RowItem title="Total RAM" value={total} />
        <RowItem title="Internal Total" value={tims} />
        <RowItem title="Internal Available " value={aims} />
        <RowItem title="External Total" value={tems} />
        <RowItem title="External Available" value={aems} />
        <RowItem title="" />
        <Header>FINGERPRINT</Header>
        <RowItem title="Fingerprint Present" value={this.fpInfo.isFingerprintSensorPresent} />
        <RowItem title="Fingerprints Enrolled" value={this.fpInfo.areFingerprintsEnrolled} />
        <RowItem title="" />
        <Header>NFC</Header>
        <RowItem title="NFC Present" value={this.nfcInfo.isNfcPresent} />
        <RowItem title="NFC Enabled" value={this.nfcInfo.isNfcEnabled} />
        <RowItem title="" />
        <Header>LOCATION</Header>
        <RowItem title="Longitute" value={this.locInfo.long} />
        <RowItem title="Lattitude" value={this.locInfo.latt} />
        <RowItem title="" />
        <Header>ABI</Header>
        <RowItem title="Supported ABIs" value={this.abiInfo.supportedABI} />
      </RowContainer>
    )
  }
}

const s = StyleSheet.create({
  header: {
    // fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#222',
  },
})
