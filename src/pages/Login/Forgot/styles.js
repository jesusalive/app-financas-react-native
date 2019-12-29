import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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

  description: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },

  usernameInput: {
    paddingHorizontal: metrics.basePadding * 3,
    height: metrics.screenHeight / 15,
    minWidth: metrics.screenWidth / 1.4,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 2,
    marginVertical: metrics.baseMargin * 3,
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

  textLogin: {
    color: colors.white,
  },
  error: {
    color: colors.danger,
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },
});

export default styles;
