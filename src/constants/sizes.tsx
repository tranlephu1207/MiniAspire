import {StyleSheet} from 'react-native';

export const TextTheme = StyleSheet.create({
  largeTitle: {
    fontSize: 33,
  },
  title1: {
    fontSize: 27,
  },
  title2: {
    fontSize: 21,
  },
  title3: {
    fontSize: 19,
    fontWeight: 'normal',
  },
  headline: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  callout: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  subHead: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  footNote: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  caption1: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  caption2: {
    fontSize: 11,
    fontWeight: '300',
  },
});

export const ViewTheme = StyleSheet.create({
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
