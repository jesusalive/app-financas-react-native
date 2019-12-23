import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: metrics.basePadding,
  },

  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: metrics.baseRadius * 2,
  },

  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },

  title: {
    fontSize: 23,
    color: colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: metrics.baseMargin,
  },

  usernameInput: {
    paddingHorizontal: metrics.basePadding * 3,
    height: metrics.screenHeight / 15,
    minWidth: metrics.screenWidth / 1.4,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 2,
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },

  passwordInput: {
    paddingHorizontal: metrics.basePadding * 3,
    height: metrics.screenHeight / 15,
    minWidth: metrics.screenWidth / 1.4,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 2,
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },

  loginButton: {
    backgroundColor: colors.success,
    paddingVertical: metrics.basePadding / 2,
    paddingHorizontal: metrics.basePadding * 3,
    borderRadius: metrics.baseRadius * 2,
    shadowColor: colors.black,
    marginTop: metrics.baseMargin * 2,
    marginBottom: metrics.baseMargin,
  },

  textLogin: {
    color: colors.light,
  },

  forgotButton: {
    paddingVertical: metrics.basePadding / 2,
    paddingHorizontal: metrics.basePadding,
    borderRadius: metrics.baseRadius * 2,
    shadowColor: colors.black,
  },

  textForgot: {
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default styles;
