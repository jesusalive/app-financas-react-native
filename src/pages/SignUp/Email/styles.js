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

  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: metrics.baseMargin * 2,
  },

  input: {
    paddingHorizontal: metrics.basePadding * 3,
    height: metrics.screenHeight / 15,
    minWidth: metrics.screenWidth / 1.4,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 2,
    marginBottom: metrics.baseMargin,
    textAlign: 'center',
  },

  btn: {
    position: 'relative',
    top: 50,
  },

  error: {
    color: colors.white,
    textAlign: 'center',
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
