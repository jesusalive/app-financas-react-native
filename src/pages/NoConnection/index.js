import React from 'react';

import {View, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors} from '~/styles';

import styles from './styles';

const NoConnection = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={colors.danger} />
    <Icon name="remove" size={50} color={colors.white} />
    <Text style={styles.title}> Sem conexão!</Text>
    <Text style={styles.description}>
      Tente novamente quando estiver conectado a uma rede!
    </Text>
  </View>
);

export default NoConnection;
