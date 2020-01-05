import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

  btn: {
    flexDirection: 'row',
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding / 1.5,
    backgroundColor: colors.transparent,
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: metrics.baseRadius * 2,
    marginTop: metrics.baseMargin * 3,
  },

  btnText: {
    color: colors.success,
    marginLeft: 10,
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
  },

  fixedDepositsList: {
    flex: 1,
    width: metrics.screenWidth / 1.3,
  },
});

export default styles;
