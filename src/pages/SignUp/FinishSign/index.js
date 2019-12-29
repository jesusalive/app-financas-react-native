import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import Lottie from 'lottie-react-native';
import finish from '~/styles/animations/972-done.json';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import api from '~/services/api';

import {colors} from '~/styles';
export default class FinishSign extends Component {
  state = {
    userCredentials: {},
    err: '',
    loading: false,
    connected: true,
  };

  componentDidMount() {
    this.mountJSON();
  }

  mountJSON = async () => {
    const name = await AsyncStorage.getItem('@Sign/Name');
    const surname = await AsyncStorage.getItem('@Sign/Surname');
    const email = await AsyncStorage.getItem('@Sign/Email');
    const username = await AsyncStorage.getItem('@Sign/Nickname');
    const password = await AsyncStorage.getItem('@Sign/Password');

    const user = {
      nome: name + ' ' + surname,
      username,
      email,
      password,
    };

    this.setState({userCredentials: user});
  };

  signUp = async () => {
    this.setState({loading: true});
    NetInfo.fetch().then(async conectionResponse => {
      if (!conectionResponse.isConnected) {
        this.setState({
          err: 'Sem conexão, tente novamente quando estiver conectado',
          loading: false,
        });
      } else {
        await api
          .post('/users', this.state.userCredentials)
          .then(() => {
            AsyncStorage.clear();
            this.setState({loading: false});
            this.props.navigation.navigate('Login');
          })
          .catch(error => {
            this.setState({err: error.message});
          });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.secondary} />
        <SafeAreaView>
          <Lottie
            autoSize
            resizeMode="contain"
            source={finish}
            autoPlay
            loop={false}
          />
        </SafeAreaView>

        <Text style={styles.title}>Cadastro finalizado!</Text>
        <Text style={styles.welcome}>
          Seja bem vindo, {this.state.userCredentials.nome}!
        </Text>
        <Text style={styles.description}>
          Obrigado por nos escolher, clique no botão abaixo para finalizar!
        </Text>
        <TouchableOpacity onPress={() => this.signUp()} style={styles.btn}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Finalizar!</Text>
          )}
        </TouchableOpacity>
        {this.state.err != '' && (
          <Text style={styles.error}>{this.state.err}</Text>
        )}
      </View>
    );
  }
}
