import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.basePadding,
  },

  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },

  welcome: {
    color: colors.success,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  btn: {
    backgroundColor: colors.success,
    paddingVertical: metrics.basePadding / 2,
    paddingHorizontal: metrics.basePadding * 3,
    borderRadius: metrics.baseRadius * 2,
    shadowColor: colors.black,
    marginTop: metrics.baseMargin * 2,
    marginBottom: metrics.baseMargin,
  },

  buttonText: {
    color: colors.white,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
  },
});

export default styles;
