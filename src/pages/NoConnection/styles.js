import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    padding: metrics.basePadding,
  },

  title: {
    color: colors.white,
    margin: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },

  description: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
