import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class Email extends Component {
  state = {
    email: '',
    error: '',
  };

  navigateToNext = async () => {
    const {email} = this.state;
    await schema
      .validate({userEmail: email.trimStart()})
      .then(async () => {
        await api
          .post('/verify', {
            nome: '',
            username: '',
            email: email,
            password: '',
          })
          .then(response => {
            if (!response.data.exists) {
              AsyncStorage.setItem('@Sign/Email', this.state.email);
              this.props.navigation.navigate('Username');
            }
          })
          .catch(err => {
            if (err.message == 'Request failed with status code 401') {
              this.setState({error: 'Email ja em uso! Tente fazer login'});
            }
          });
      })
      .catch(err => this.setState({error: err.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <View>
          <Text style={styles.title}>Qual seu email?</Text>
          <TextInput
            autoCompleteType="email"
            autoCorrect={false}
            autoCapitalize="sentences"
            autoFocus={true}
            onChangeText={text => this.setState({email: text})}
            placeholder="Exemplo: teste@teste.com"
            style={styles.input}
            textContentType="emailAddress"
          />
          {this.state.error != '' && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
        </View>
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
  userEmail: yup
    .string()
    .required('Informe um email!')
    .email('Informe um email válido!'),
});
