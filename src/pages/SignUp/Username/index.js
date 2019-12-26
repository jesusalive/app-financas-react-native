import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class Username extends Component {
  state = {
    username: '',
    err: '',
  };

  navigateToNext = async () => {
    const {username} = this.state;
    await schema
      .validate({nickUser: username.trimStart()})
      .then(async () => {
        await api
          .post('/verify', {
            nome: '',
            username,
            email: '',
            password: '',
          })
          .then(response => {
            if (!response.data.exists) {
              AsyncStorage.setItem('@Sign/Nickname', this.state.username);
              this.props.navigation.navigate('Password');
            }
          })
          .catch(err => {
            if (err.message == 'Request failed with status code 401') {
              this.setState({err: 'Usuario ja em uso! Tente outro'});
            }
          });
      })
      .catch(error => this.setState({err: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <View>
          <Text style={styles.title}>Escolha um nome de usuário</Text>
          <Text style={styles.description}>
            (Ele será usado quando você for entrar na sua conta)
          </Text>
          <TextInput
            autoCompleteType="username"
            autoCorrect={false}
            autoCapitalize="sentences"
            autoFocus={true}
            onChangeText={text => this.setState({username: text})}
            placeholder="Exemplo: seunome123"
            style={styles.input}
            textContentType="nickname"
          />
        </View>
        {this.state.err != '' && (
          <Text style={styles.error}>{this.state.err}</Text>
        )}
        <TouchableOpacity
          onPress={() => this.navigateToNext()}
          style={styles.btn}>
          <Icon name="arrow-circle-right" size={45} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const schema = yup.object().shape({
  nickUser: yup
    .string()
    .required('Escolha um username!')
    .min(3, 'O username deve ter no mínimo 3 letras')
    .notOneOf(
      ['admin', 'administrador', 'administrator'],
      'Esse username não é permitido',
    )
    .max(20, 'Seu username deve ter no maximo 20 letras'),
});
