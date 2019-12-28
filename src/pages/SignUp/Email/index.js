import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '~/styles';
import api from '~/services/api';

export default class Email extends Component {
  state = {
    loading: false,
    email: '',
    error: '',
  };

  navigateToNext = async () => {
    this.setState({loading: true});
    const {email} = this.state;
    await schema
      .validate({userEmail: email.trimStart().trimEnd()})
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
              AsyncStorage.setItem(
                '@Sign/Email',
                this.state.email.trimStart().trimEnd(),
              );
              this.props.navigation.navigate('Username');
              this.setState({loading: false});
            }
          })
          .catch(err => {
            if (err.message == 'Request failed with status code 401') {
              this.setState({
                error: 'Email ja em uso! Tente fazer login',
                loading: false,
              });
            }
          });
      })
      .catch(err => this.setState({error: err.message, loading: false}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <View>
          <Text style={styles.title}>Qual seu email?</Text>
          <TextInput
            autoCompleteType="email"
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={text => this.setState({email: text})}
            placeholder="Exemplo: teste@teste.com"
            style={styles.input}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {this.state.error != '' && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
        </View>
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
  userEmail: yup
    .string()
    .required('Informe um email!')
    .email('Informe um email válido!'),
});
