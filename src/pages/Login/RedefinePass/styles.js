import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: metrics.basePadding,
  },

  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },

  pass: {
    padding: metrics.basePadding / 2,
    marginBottom: 20,
    color: colors.primary,
    fontSize: 14,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: metrics.baseRadius * 2,
  },

  description: {
    color: colors.white,
    marginBottom: 20,
    lineHeight: 18,
    fontSize: 12,
    textAlign: 'center',
  },

  checkButton: {
    backgroundColor: colors.success,
    paddingVertical: metrics.basePadding / 2,
    paddingHorizontal: metrics.basePadding * 3,
    borderRadius: metrics.baseRadius * 2,
    shadowColor: colors.black,
    marginTop: metrics.baseMargin * 2,
    marginBottom: metrics.baseMargin,
  },

  textBtn: {
    color: colors.white,
  },

  error: {
    color: colors.danger,
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },
});

export default styles;
