import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '~/styles';

import styles from './styles';
import * as yup from 'yup';
import api from '~/services/api';

export default class Forgot extends Component {
  static navigationOptions = {
    title: 'Logar',
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 15,
    },
  };

  state = {
    username: '',
    loading: false,
    error: '',
  };

  validateFieldsAndNextStep = async () => {
    const {username} = this.state;
    this.setState({loading: true});
    await schema
      .validate({username})
      .then(async () => {
        await api
          .post('/verify', {
            nome: '',
            username: username.trimEnd().trimStart(),
            email: '',
            password: '',
          })
          .then(response => {
            if (!response.data.exists) {
              this.setState({
                error: 'Esse usuário não existe, tente novamente',
                loading: false,
              });
            }
          })
          .catch(async err => {
            if (err.message == 'Request failed with status code 401') {
              await api
                .post('/forgot', {
                  username: username.trimStart().trimEnd(),
                })
                .then(response => {
                  AsyncStorage.setItem('@RecoverCode', response.data.code);
                  AsyncStorage.setItem('@RecoverUser', username);
                  this.setState({loading: false});
                  this.props.navigation.navigate('ForgotCode');
                })
                .catch(requestErr => {
                  this.setState({
                    error:
                      'Houve um erro inesperado, por favor tente novamente mais tarde',
                    loading: false,
                  });
                });
            }
          });
      })
      .catch(err => this.setState({error: err.message, loading: false}));
  };

  nextStep = () => {
    this.props.navigation.navigate('ForgotCode');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar minha senha</Text>
        <Text style={styles.description}>
          Quem nunca se esqueceu atire a primeira pedra! {'\n'} Digite abaixo o
          username ultilizado para logar nessa conta
        </Text>
        <TextInput
          autoCompleteType="off"
          autoCapitalize="none"
          autoFocus={false}
          onChangeText={text => this.setState({username: text})}
          style={styles.usernameInput}
          textContentType="username"
          placeholder="Digite o username"
          placeholderTextColor={colors.darkTransparent}
        />
        {this.state.error != '' && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <TouchableOpacity
          onPress={() => this.validateFieldsAndNextStep()}
          style={styles.checkButton}>
          {!this.state.loading ? (
            <Text style={styles.textLogin}>Enviar</Text>
          ) : (
            <ActivityIndicator size="small" color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Os usernames sempre tem mais de 3 caracteres')
    .nullable()
    .required('Informe o usuário!'),
});
