import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {View, Text, StatusBar} from 'react-native';

import styles from './styles';
import {colors} from '~/styles';

export default class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" size={20} color={tintColor} />
    ),
  };

  state = {
    user: '',
    balance: '2.500,25',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const name = await AsyncStorage.getItem('@User');
    this.setState({user: name});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.lightBlue}
          barStyle="light-content"
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>Olá, </Text>
            <Text style={styles.name}>{this.state.user}</Text>
            <Text style={styles.title}> !</Text>
          </View>
        </View>
        <View style={styles.middleBox}>
          <View />
          <View>
            <Text style={styles.boxTitle}>SALDO</Text>
            <Text style={styles.value}>{this.state.balance}</Text>
          </View>
          <View style={styles.informations}>
            <View style={styles.expenses}>
              <Text style={styles.cardText}>Total de entradas:</Text>
              <Text style={styles.cardTextDep}>0.00</Text>
            </View>
            <View style={styles.deposits}>
              <Text style={styles.cardText}>Total de despesas:</Text>
              <Text style={styles.cardTextEx}>0.00</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
