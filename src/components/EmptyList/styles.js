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

  btn: {
    flexDirection: 'row',
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding / 1.5,
    backgroundColor: colors.transparent,
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: metrics.baseRadius * 2,
    marginTop: metrics.baseMargin * 2,
    marginBottom: metrics.baseMargin,
  },

  btnText: {
    textAlign: 'center',
    color: colors.success,
    marginLeft: 10,
  },

  animation: {height: metrics.screenHeight / 2.5},
  animationText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },
});

export default styles;
