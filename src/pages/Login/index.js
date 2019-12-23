import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import styles from './styles';
import {colors} from '~/styles';
import whiteLogo from '~/styles/img/logo/logoBranco.png';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.loginBox}>
          <Image source={whiteLogo} style={styles.logo} />
          <TextInput
            autoCompleteType="off"
            autoCapitalize="none"
            autoFocus={false}
            onChangeText={text => this.setState({username: text})}
            style={styles.usernameInput}
            textContentType="username"
            placeholder="Digite seu username"
            placeholderTextColor={colors.darkTransparent}
          />
          <TextInput
            autoCompleteType="off"
            autoCapitalize="none"
            autoFocus={false}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
            style={styles.passwordInput}
            textContentType="password"
            placeholder="Digite sua senha"
            placeholderTextColor={colors.darkTransparent}
          />
          <View>
            <TouchableOpacity onPress={() => {}} style={styles.loginButton}>
              <Text style={styles.textLogin}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.forgotButton}>
              <Text style={styles.textForgot}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
