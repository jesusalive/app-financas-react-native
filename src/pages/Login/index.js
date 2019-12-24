import React, {Component} from 'react';
import * as yup from 'yup';
import NetInfo from '@react-native-community/netinfo';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import {colors} from '~/styles';
import whiteLogo from '~/styles/img/logo/logoBranco.png';

import api from '~/services/api';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    loginError: '',
  };

  validateFields = async () => {
    const {username, password} = this.state;
    this.setState({loading: true});
    await schema
      .validate({username, password})
      .then(() => this.signIn())
      .catch(err => this.setState({loginError: err.message, loading: false}));
  };

  signIn = async () => {
    const {username, password} = this.state;
    await api
      .post('/login', {
        username,
        password,
      })
      .then(() => this.setState({loading: false}))
      .catch(err => {
        NetInfo.fetch().then(response => {
          if (!response.isConnected) {
            this.setState({
              loading: false,
              loginError:
                'Sem conexão com a internet! \n Não foi possível logar!',
            });
          }
        });
        if (err.message == 'Request failed with status code 401') {
          this.setState({
            loading: false,
            loginError: 'Usuário ou senha incorretos',
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
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
          {this.state.loginError != '' && (
            <Text style={styles.error}>{this.state.loginError}</Text>
          )}
          <View>
            <TouchableOpacity
              onPress={() => this.validateFields()}
              style={styles.loginButton}>
              {!this.state.loading ? (
                <Text style={styles.textLogin}>Entrar</Text>
              ) : (
                <ActivityIndicator size="small" color={colors.white} />
              )}
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

const schema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .required('Informe seu usuário!'),
  password: yup.string().required('Informe sua senha!'),
});
