import React from 'react'
import { NativeModules } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import roundTo from 'round-to'

const unit = 'GB'

export default class Memory extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Memory',
  }

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNEasyDeviceInfo
    device
      .getMemoryInfo(unit)
      .then((memInfo) => {
        this.memInfo = memInfo
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    let memInfo = this.memInfo

    let total = roundTo(parseFloat(memInfo.totalRAM), 2) + ' ' + unit
    let tims = roundTo(parseFloat(memInfo.totalInternalMemorySize), 2) + ' ' + unit
    let aims = roundTo(parseFloat(memInfo.availableInternalMemorySize), 2) + ' ' + unit
    let tems = roundTo(parseFloat(memInfo.totalExternalMemorySize), 2) + ' ' + unit
    let aems = roundTo(parseFloat(memInfo.availableExternalMemorySize), 2) + ' ' + unit

    return (
      <RowContainer>
        <RowItem title="Total RAM" value={total} />
        <RowItem title="Internal Total" value={tims} />
        <RowItem title="Internal Available " value={aims} />
        <RowItem title="External Total" value={tems} />
        <RowItem title="External Available" value={aems} />
      </RowContainer>
    )
  }
}
