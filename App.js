/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import NotifService from './NotifService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  copyToken = () => {
    if (this.state.registerToken == undefined) {
      alert('토큰 얻기 버튼을 탭하세요');
    } else {
      Clipboard.setString(this.state.registerToken);
      alert('토큰 복사 완료');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>달공 배송 알림앱</Text>
        <View style={styles.spacer}></View>
        <TouchableOpacity style={{width: '70%'}} onPress={this.copyToken}>
          <Text style={styles.textMulti}>{this.state.registerToken}</Text>
        </TouchableOpacity>
        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.checkPermission(this.handlePerm.bind(this));
          }}>
          <Text>알림 체크</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.requestPermissions();
          }}>
          <Text>Token 얻기</Text>
        </TouchableOpacity>
        <View style={styles.spacer}></View>

        {this.state.fcmRegistered && <Text>FCM 알람 설정 성공 !</Text>}

        <View style={styles.spacer}></View>
      </View>
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(JSON.stringify(notif.title), JSON.stringify(notif.message));
  }

  handlePerm(perms) {
    Alert.alert('알림 허용', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    color: 'red',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  textMulti: {
    color: 'red',
    margin: 5,
    padding: 5,
    width: '100%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
