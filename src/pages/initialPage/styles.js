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

  welcome: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.baseMargin * 5,
  },

  title: {
    fontSize: 20,
    color: colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
  },

  description: {
    fontSize: 12,
    color: colors.lighter,
    textAlign: 'center',
  },

  btnSignin: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: metrics.basePadding,
    borderRadius: metrics.baseRadius * 2,
    width: metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: metrics.baseMargin,
  },

  btnSigninText: {
    color: colors.primary,
  },

  btnSignup: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: metrics.basePadding,
    borderRadius: metrics.baseRadius * 2,
    width: metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: metrics.baseMargin,
  },

  btnSignupText: {
    color: colors.primary,
  },

  or: {
    fontSize: 12,
    color: colors.lighter,
    textAlign: 'center',
  },
});

export default styles;
