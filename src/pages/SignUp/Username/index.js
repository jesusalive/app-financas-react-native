import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class Username extends Component {
  state = {
    loading: false,
    username: '',
    err: '',
  };

  navigateToNext = async () => {
    this.setState({loading: true});
    const {username} = this.state;
    await schema
      .validate({nickUser: username.trimStart().trimEnd()})
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
              AsyncStorage.setItem(
                '@Sign/Nickname',
                this.state.username.trimStart().trimEnd(),
              );
              this.props.navigation.navigate('Password');
              this.setState({loading: false});
            }
          })
          .catch(err => {
            if (err.message == 'Request failed with status code 401') {
              this.setState({
                err: 'Usuario ja em uso! Tente outro',
                loading: false,
              });
            }
          });
      })
      .catch(error => this.setState({err: error.message, loading: false}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <View style={styles.inputBlock}>
          <Text style={styles.title}>Escolha um nome de usuário</Text>
          <Text style={styles.description}>
            Ele será usado quando você for entrar na sua conta
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
        {!this.state.loading ? (
          <TouchableOpacity
            onPress={() => this.navigateToNext()}
            style={styles.btn}>
            <Icon name="arrow-circle-right" size={45} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={styles.btn}
          />
        )}
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
