import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: metrics.basePadding,
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    marginVertical: metrics.baseMargin,
  },

  title: {
    color: colors.success,
  },

  blockItem: {
    width: metrics.screenWidth / 1.5,
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
  },

  blockDescription: {
    width: metrics.screenWidth / 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  descriptionItem: {
    justifyContent: 'center',
    marginRight: metrics.baseMargin,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    flexDirection: 'row',
  },

  descriptionText: {
    color: colors.white,
    fontSize: 10,
  },
});

export default styles;
