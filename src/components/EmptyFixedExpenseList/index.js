import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import animation from '~/styles/animations/empty.json';
import {colors} from '~/styles';
import {withNavigation} from 'react-navigation';

class EmptyFixedExpenseList extends Component {
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
          onPress={() => this.props.navigation.navigate('AddFixedExpense')}
          style={styles.btn}>
          <Icon name="do-not-disturb-on" size={20} color={colors.danger} />
          <Text style={styles.btnText}>Adicione uma despesa</Text>
        </TouchableOpacity>
        <Text style={styles.sugestion}>Ou</Text>
        <Text style={styles.sugestion}>
          Experimente atualizar a página {'\n'} Arraste para baixo!
        </Text>
      </View>
    );
  }
}

export default withNavigation(EmptyFixedExpenseList);
