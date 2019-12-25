import {StyleSheet} from 'react-native';

import {colors} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    margin: 0,
  },
});

export default styles;
