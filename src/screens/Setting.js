import React, {Component} from 'react';
import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import NotifService from '../../NotifService';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
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

  copyToken = () => {
    if (this.state.registerToken == undefined) {
      Alert.alert(null, '토큰 얻기 버튼을 탭하세요');
    } else {
      Clipboard.setString(this.state.registerToken);
      Alert.alert(null, '토큰 복사 완료');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>달공 배송 알림앱</Text>
        <Pressable
          style={{width: '70%', marginTop: 20}}
          onPress={this.copyToken}>
          <Text style={styles.textMulti}>{this.state.registerToken}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            this.notif.checkPermission(this.handlePerm.bind(this));
          }}>
          <Text>알림 체크</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            this.notif.requestPermissions();
          }}>
          <Text>Token 얻기</Text>
        </Pressable>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {this.state.fcmRegistered && <Text>FCM 알람 설정 성공 !</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 20,
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
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Setting;
