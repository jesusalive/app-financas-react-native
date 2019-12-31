import {StyleSheet} from 'react-native';

import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    height: metrics.screenHeight,
  },

  inputScroll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },

  input: {
    margin: metrics.baseMargin,
    paddingBottom: metrics.basePadding / 3,
    width: metrics.screenWidth / 1.5,
    borderColor: colors.white,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },

  icon: {
    position: 'absolute',
    top: 35,
  },

  dateBtn: {
    padding: metrics.basePadding,
    margin: metrics.baseMargin,
    borderRadius: metrics.baseRadius,
    width: metrics.screenWidth / 1.5,
    borderColor: colors.white,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtn: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 20,
    lineHeight: 20,
  },

  textDate: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  checkView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fixedText: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  fixedDescription: {
    color: colors.whiteTransparent,
    fontSize: 11,
    textAlign: 'center',
  },

  saveBtn: {
    padding: metrics.basePadding,
    backgroundColor: colors.white,
    margin: metrics.baseMargin,
    marginTop: metrics.baseMargin * 3,
    borderRadius: metrics.baseRadius,
    width: metrics.screenWidth / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: colors.darker,
  },
});

export default styles;
