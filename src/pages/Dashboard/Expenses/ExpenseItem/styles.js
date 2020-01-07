import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: metrics.basePadding,
    borderColor: colors.danger,
    borderBottomWidth: 1,
    borderRadius: metrics.baseRadius,
    marginVertical: metrics.baseMargin,
  },

  title: {
    color: colors.danger,
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
    color: colors.lighter,
    fontSize: 10,
  },

  pendingExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.pending,
    padding: metrics.basePadding / 2,
  },

  paidExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.success,
    padding: metrics.basePadding / 2,
  },

  expiredExpense: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.danger,
    padding: metrics.basePadding / 2,
  },

  statusText: {
    color: colors.lighter,
    fontSize: 10,
  },
});

export default styles;
