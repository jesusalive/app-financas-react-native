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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: metrics.baseMargin,
  },

  input: {
    paddingHorizontal: metrics.basePadding * 3,
    height: metrics.screenHeight / 15,
    maxWidth: metrics.screenWidth / 1.4,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 2,
    marginBottom: metrics.baseMargin / 2,
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    marginBottom: metrics.baseMargin * 3,
  },

  btn: {
    position: 'relative',
    top: 50,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
