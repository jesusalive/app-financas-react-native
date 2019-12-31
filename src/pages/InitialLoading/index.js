import React from 'react';

import {View, StatusBar, SafeAreaView} from 'react-native';
import {colors} from '~/styles';
import Lottie from 'lottie-react-native';

import styles from './styles';
import animation from '~/styles/animations/loadingMoney.json';

const InitialLoading = () => (
  <View style={styles.container}>
    <StatusBar barStyle={'light-content'} backgroundColor={colors.secondary} />
    <SafeAreaView>
      <Lottie
        speed={2}
        autoPlay
        autoSize
        resizeMode="contain"
        loop
        source={animation}
      />
    </SafeAreaView>
  </View>
);
export default InitialLoading;
