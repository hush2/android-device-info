import React from 'react'
import { Animated, Linking, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ANIM_DURATION = 1000

export default class About extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'About',
    tabBarIcon: () => <Icon name="information-outline" size={25} color="white" />,
  }

  state = {
    animLogo: new Animated.Value(0),
    animAuthor: new Animated.Value(0),
    animSource: new Animated.Value(0),
  }

  componentDidMount() {
    // TODO: only run on tab focus
    this.runAnimation()
  }

  runAnimation() {
    Animated.sequence([
      Animated.timing(this.state.animLogo, {
        toValue: 1,
        duration: ANIM_DURATION,
        delay: 300,
      }),
      Animated.parallel([
        Animated.timing(this.state.animAuthor, {
          toValue: 1,
          duration: ANIM_DURATION,
        }),
        Animated.timing(this.state.animSource, {
          toValue: 1,
          duration: ANIM_DURATION,
          delay: 1000,
        }),
      ]),
    ]).start()
  }

  render() {
    return (
      <View style={s.container}>
        <Animated.Image
          style={[s.hush2, { opacity: this.state.animLogo }]}
          source={require('../assets/hush2.png')}
        />
        <Animated.Text style={[s.author, { opacity: this.state.animAuthor }]}>
          created by hush2
        </Animated.Text>
        <Animated.View style={[s.sourceText, { opacity: this.state.animSource }]}>
          <Animated.Text style={{ color: '#999' }}>Source available on </Animated.Text>
          <Animated.Text
            style={s.url}
            onPress={() => Linking.openURL('https://github.com/hush2/android-device-info')}
          >
            Github
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hush2: {
    width: 150,
    height: 150,
  },
  author: {
    color: '#303f9f',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(204, 204, 204, 0.15)',
    borderBottomColor: 'rgba(204, 204, 204, 0.15)',
  },
  url: {
    color: '#6f6110',
  },
  sourceText: {
    flexDirection: 'row',
    marginTop: 10,
  },
})
