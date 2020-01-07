import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  depositsCard: {
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.screenHeight / 1.5,
    width: metrics.screenWidth,
    padding: 10,
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
  },

  fixedExpensesList: {
    flex: 1,
    marginTop: 0,
    width: metrics.screenWidth / 1.1,
  },
});

export default styles;
