import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import animation from '~/styles/animations/empty.json';
import {colors} from '~/styles';
import {withNavigation} from 'react-navigation';

class EmptyList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Lottie
          source={animation}
          autoPlay
          autoSize
          style={styles.animation}
          resizeMode="contain"
        />
        <Text style={styles.animationText}>Nenhum item encontrado!</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddDeposit')}
          style={styles.btn}>
          <Icon name="plus-circle" size={20} color={colors.success} />
          <Text style={styles.btnText}>Adicione uma entrada</Text>
        </TouchableOpacity>
        <Text style={styles.btnText}>Ou</Text>
        <Text style={styles.btnText}>
          Experimente atualizar a página {'\n'} Arraste para baixo!
        </Text>
      </View>
    );
  }
}

export default withNavigation(EmptyList);
