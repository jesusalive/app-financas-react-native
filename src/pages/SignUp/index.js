import React, {Component} from 'react';

import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {colors} from '~/styles';

export default class Login extends Component {
  navigateToNext = () => {
    this.props.navigation.navigate('Name');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.secondary}
        />
        <View style={styles.containerIcon}>
          <Icon
            color={colors.white}
            name="users"
            size={100}
            style={styles.icon}
          />
          <Text style={styles.title}>Registro</Text>
        </View>
        <Text style={styles.talk}>
          Vamos precisar de alguns dados seus! Clique no botão abaixo para
          começar!
        </Text>

        <TouchableOpacity
          onPress={() => {
            this.navigateToNext();
          }}>
          <Icon name="arrow-circle-right" size={45} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}
