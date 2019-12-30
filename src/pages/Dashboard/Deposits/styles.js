import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  depositsCard: {
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.screenHeight / 2,
    width: metrics.screenWidth / 1.2,
    borderRadius: metrics.baseRadius,
    padding: 10,
  },

  btn: {
    position: 'absolute',
    bottom: 30,
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
});

export default styles;
