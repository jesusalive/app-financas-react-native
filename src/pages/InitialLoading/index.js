import React from 'react';

import {View, Image, StatusBar, ActivityIndicator} from 'react-native';
import {colors} from '~/styles';

import styles from './styles';

const InitialLoading = () => (
  <View style={styles.container}>
    <StatusBar barStyle={'light-content'} backgroundColor={colors.secondary} />
    <ActivityIndicator color={colors.white} size="large" />
  </View>
);
export default InitialLoading;
